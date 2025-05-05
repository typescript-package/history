import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput
} from '@typescript-package/data';
// Abstract.
import { HistoryPrepend } from '../core';
/**
 * @description Manages the redo history with prepend mechanism.
 * @export
 * @class RedoHistory
 * @template [Value=any] The type of elements stored in the history
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryPrepend<Value, Size, DataType>}
 */
export class RedoHistory<
  Value = any,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryPrepend<Value, Size, DataType> {
  /**
   * Creates an instance of `RedoHistory`.
   * @constructor
   * @param {Size} [size=RedoHistory.size as Size] 
   * @param {?readonly [Value]} [initialValue] 
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] 
   */
  constructor(
    size: Size = RedoHistory.size as Size,
    initialValue?: readonly [Value],
    data?: DataConstructorInput<readonly Value[], DataType>,
  ) {
    super(size, initialValue, data);
  }
}
