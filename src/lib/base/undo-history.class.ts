import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput
} from '@typescript-package/data';
// Abstract.
import { HistoryAppend } from '../core';
/**
 * @description Manages the undo history with append mechanism.
 * @export
 * @class UndoHistory
 * @template [Value=any] The type of elements stored in the history.
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryAppend<Value, Size, DataType>}
 */
export class UndoHistory<
  Value = any,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryAppend<Value, Size, DataType>{
  /**
   * Creates an instance of `UndoHistory`.
   * @constructor
   * @param {Size} [size=HistoryAppend.size as Size] 
   * @param {?readonly [Value]} [initialValue] 
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] 
   */
  constructor(
    size: Size = HistoryAppend.size as Size,
    initialValue?: readonly Value[],
    data?: DataConstructorInput<readonly Value[], DataType>,
  ) {
    super(size, initialValue, data);
  }
}
