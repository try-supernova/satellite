export class CommsHandler {
    private static instance: CommsHandler;
    private pendingCalls: Map<number, { resolve: (value: any) => void, reject: (reason: any) => void }>;
    private streamEventListeners: Map<string, ((data: any) => void)[]>;

    constructor() {
        this.pendingCalls = new Map();
        this.streamEventListeners = new Map()

        self.onmessage = this.handleKernelMessage.bind(this);
    }

    public static getInstance(): CommsHandler {
        if (!CommsHandler.instance) {
            CommsHandler.instance = new CommsHandler()
        }
        return CommsHandler.instance
    }

    private handleKernelMessage(event: MessageEvent): void {
        const [data, callID] = event.data;

        if (callID) {
            // Handle request-response calls
            const pendingCall = this.pendingCalls.get(Number(callID));
            if (pendingCall) {
                // It's a response to a worker-initiated request
                this.pendingCalls.delete(callID);
                console.log(`[Satellite] (${callID}) Received Response:`, data);
                pendingCall.resolve(data);
            } else {
                // It's a request from the kernel
                try {
                    const response = this.handleKernelRequest(data);
                    self.postMessage([response, callID]);
                } catch (e) {
                    console.error(`[Satellite] Error handling kernel request: ${e}`);
                    self.postMessage([{ error: String(e) }, callID]);
                }
            }
        } else {
            // Handle streamed events
            this.handleStreamEvent(data);
        }
    }

    private handleKernelRequest(data: any): any {
        // Handle kernel requests here
        // This should be implemented based on the specific needs of your application
        console.log(`[Satellite] Received kernel request:`, data);
        return { status: "received" };
    }

    private handleStreamEvent(data: any): void {
        if (data && typeof data === "object" && "op" in data) {
            const eventName = data.op;
            const listeners = this.streamEventListeners.get(eventName);
            if (listeners) {
                listeners.forEach(callback => callback(data));
            }
        } else {
            console.error(`[Satellite] Received malformed Streamed Event:`, data);
        }
    }

    public async call(operation: string, params: any = {}): Promise<any> {
        const callID = Math.random().toString().substring(2, 9);
        const message = { op: operation, ...params };

        return new Promise((resolve, reject) => {
            this.pendingCalls.set(Number(callID), { resolve, reject });
            console.log(`[Satellite] (${callID}) Sending Request:`, message);
            self.postMessage([message, callID]);
        });
    }

    public sendStreamEvent(eventName: string, data: any): void {
        const message = { op: eventName, ...data };
        console.log(`[Satellite] Sending Stream Event:`, message);
        self.postMessage([message]);
    }

    public addStreamEventListener(eventName: string, callback: (data: any) => void): void {
        if (!this.streamEventListeners.has(eventName)) {
            this.streamEventListeners.set(eventName, []);
        }
        this.streamEventListeners.get(eventName)!.push(callback);
    }

    public removeStreamEventListener(eventName: string, callback: (data: any) => void): void {
        const listeners = this.streamEventListeners.get(eventName);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
}