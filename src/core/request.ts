import { log } from "../util/logging.ts"

export function sendRequest(data: any): Promise<any> {
    const callID = Math.random().toString().substring(2, 9)
    console.log(`[41worker:work] (${callID}) Sent Request`, data);
        return new Promise((resolve, reject) => {
            if (!data) reject("No data provided")
            self.onmessage = (event: MessageEvent) => {
                // 0: data, 1: callID
                if (event.data[1] === callID) {
                    console.log(`[41worker:work] (${callID}) Received Response`, event.data[0]);
                    resolve(event.data[0])
                } else {
                    self.postMessage(["Received " + event.data[0], event.data[1]]);
                }
            }
            self.postMessage([data, callID])
        });
    }