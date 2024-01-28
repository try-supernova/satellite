import { log } from "./util/logging.ts"

export function sendRequest(data: any): Promise<any> {
    const callID = Math.random().toString().substring(2, 9)
    log.debug(`[41worker:work] (\${callID}) Sent Request\n`, data);
    return new Promise((resolve, reject) => {
        if (!data) reject("No data provided")
        self.onmessage = (event: MessageEvent) => {
            // 0: data, 1: callID
            if (event.data[1] === callID) {
                resolve("received" + event.data)
                log.debug(`[41worker:work] (\${callID}) Received Response\n`, event.data[0]);
            } else {
                log.debug(`[41worker:work] (\${event.data[1]}) Responding to\n`, event.data[0]);
                self.postMessage(["received" + event.data[0], event.data[1]]);
            }
        }
        self.postMessage([data, callID])
    });
}