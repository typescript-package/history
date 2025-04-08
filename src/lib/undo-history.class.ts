import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryAppend } from './history-append.abstract';
/**
 * @description Manages the undo history with append mechanism.
 * @export
 * @class UndoHistory
 * @template [Value=any] The type of elements stored in the history.
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryAppend<Value, Size, DataType>}
 */
export class UndoHistory<
  Value = any,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryAppend<Value, Size, DataType>{};