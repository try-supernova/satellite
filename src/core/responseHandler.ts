import {EventEmitter} from "../util/eventEmitter.js"
import {log} from "../util/logging.js";

export class StreamHandler extends EventEmitter {
	constructor() {
        super()
		self.onmessage = (event: MessageEvent) => {
            if (!event.data[1]) { //if the first index of the array exists, this originated from request-response based
            	//zeroth index: data
            	//first index: req-res callID (ignore)

                log.debug(`[41worker:work] Received Streamed Event`, event.data[0]);
                super.emit("stream", event.data[0])
            } else { //idea: we need to have a global registry of call ids awaiting a response as to determine whether the message is a request or a response

            }
        }
	}
}