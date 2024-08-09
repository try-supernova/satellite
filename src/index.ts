import {Process} from "./namespaces/Process/index.ts";
import {UI} from "./namespaces/UI/index.ts";
import {sendRequest} from "./core/request.js";

export const Pluto = {
    Process,
    UI,
    _core: {sendRequest},
}