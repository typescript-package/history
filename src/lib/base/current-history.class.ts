// Data.
import { Data, DataCore } from '@typescript-package/data';
// Abstract.
import { HistoryCurrent } from '../core';
// Type.
import { DataConstructor } from '../type';
/**
 * @description 
 * @export
 * @class CurrentHistory
 * @template Value 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryStorage<Value, DataType>}
 */
export class CurrentHistory<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryCurrent<Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `CurrentHistory` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return CurrentHistory.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Value}
   */
  public get value(): Value {
    return Array.isArray(super.data.value) ? super.data.value[0] : undefined as Value;
  }

  /**
   * Creates an instance of `CurrentHistory`.
   * @constructor
   * @param {{value?: Value}} [param0={}] 
   * @param {Value} param0.value 
   * @param {?DataConstructor<Value, DataType>} [data] 
   */
  constructor(
    {value}: {value?: Value} = {},
    data?: DataConstructor<Value, DataType>
  ) {
    super(arguments[0], data);
  }

  /**
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The current instance.
   */
  public override destroy(): this {
    super.clear();
    super.destroy();
    return this;
  }

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} 
   */
  public has() {
    return Array.isArray(super.data.value) && super.data.value.length > 0;
  }

  /**
   * @description Updates a current value.
   * @public
   * @param {Value} value 
   * @returns {this} 
   */
  public update(value: Value): this {
    super.set([value]);
    return this;
  }
}
