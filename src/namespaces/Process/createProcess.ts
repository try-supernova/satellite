import {sendRequest} from "../../core/request.ts";
import {log} from "../../util/logging.ts";

//for creating subprocesses
export async function CreateProcess(path: string, args?: string[], env?: string[], CWD?: string): Promise<void> {
    log.debug(`[41worker:work] Creating Process`);
    const kernelResponse = await sendRequest({
        op: 10,
        1: path,
        2: args.join(" ") || [],
        3: {
            env: env ?? [],
            CWD: CWD ?? ""
        }
    });
}