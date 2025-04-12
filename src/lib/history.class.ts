import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryBase } from './base/history-base.abstract';
/**
 * @description The class to manage the value changes.
 * @export
 * @class History
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 */
export class History<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryBase<Value, Size, DataType> {
  /**
   * @description The max size for undo history.
   * @public
   * @static
   * @type {number}
   */
  public static override size = Infinity;

  /**
   * @description Returns the `string` tag representation of the `History` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return History.name;
  }
}
