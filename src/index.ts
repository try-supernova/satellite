import {sendRequest} from "./core/request.ts";

class Process extends EventTarget {
    constructor() {
        super()
        this.addEventListener('message', (e: MessageEvent) => {
            this.dispatchEvent(new MessageEvent('message', { data: e.data }))
        })
    }

    public async send(data: any) {
        await sendRequest(data)
    }
}

export const process = new Process()