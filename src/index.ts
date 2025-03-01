import {Process} from "./namespaces/Process/index.ts";
import {UI} from "./namespaces/UI/index.ts";
import {CommsHandler} from "./core/commsHandler.js";

export const Supernova = {
    Process,
    UI,
    _core: {CommsHandler},
}