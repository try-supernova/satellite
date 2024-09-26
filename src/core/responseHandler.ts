import {EventEmitter} from "./eventEmitter.js"

export class StreamHandler extends EventEmitter {
	constructor() {
		self.onmessage = (event: MessageEvent) => {
            if (!event.data[1]) { //if the first index of the array exists, this originated from request-response based
            	//zeroth index: data
            	//first index: req-res callID (ignore)

                log.debug(`[41worker:work] Received Streamed Event`, event.data[0]);
                this.emit("stream", event.data[0])
            }
        }
	}
}