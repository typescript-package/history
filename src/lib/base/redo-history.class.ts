import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryPrepend } from '../core';
/**
 * @description Manages the redo history with prepend mechanism.
 * @export
 * @class RedoHistory
 * @template [Value=any] The type of elements stored in the history
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryPrepend<Value, Size, DataType>}
 */
export class RedoHistory<
  Value = any,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryPrepend<Value, Size, DataType>{};
