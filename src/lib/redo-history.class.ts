// Abstract.
import { HistoryPrepend } from "./history-prepend.abstract";
/**
 * @description Manages the redo history with prepend mechanism.
 * @export
 * @class RedoHistory
 * @template [Type=any] The type of elements stored in the history
 * @template {number} [Size=number] The maximum size of the history.
 * @extends {HistoryPrepend<Type, Size>}
 */
export class RedoHistory<Type = any, Size extends number = number> extends HistoryPrepend<Type, Size>{};