// Abstract.
import { HistoryAppend } from "./history-append.abstract";
/**
 * @description Manages the undo history with append mechanism.
 * @export
 * @class UndoHistory
 * @template [Type=any] The type of elements stored in the history
 * @template {number} [Size=number] The maximum size of the history.
 * @extends {HistoryAppend<Type, Size>}
 */
export class UndoHistory<Type = any, Size extends number = number> extends HistoryAppend<Type, Size>{};