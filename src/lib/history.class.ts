import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput
} from '@typescript-package/data';
// Abstract.
import { CurrentHistory, HistoryBase, RedoHistory, UndoHistory } from './base';
/**
 * @description The class to manage the value changes.
 * @export
 * @class History
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 */
export class History<
  Value,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryBase<
  Value,
  Size,
  DataType,
  CurrentHistory<Value, DataType>,
  RedoHistory<Value, Size, DataType>,
  UndoHistory<Value, Size, DataType>
> {
  /**
   * @description The max size for undo history.
   * @public
   * @static
   * @type {number}
   */
  public static override size: number = Infinity;

  /**
   * @description Returns the `string` tag representation of the `History` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return History.name;
  }

  constructor(
    {value, size}: { value?: Value, size?: Size} = {},
    data?: DataConstructorInput<readonly Value[], DataType>,
  ) {
    super(arguments[0], data, { current: CurrentHistory, redo: RedoHistory, undo: UndoHistory });
  }
}
