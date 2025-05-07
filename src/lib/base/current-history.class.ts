// Data.
import { Data, DataCore, DataConstructorInput } from '@typescript-package/data';
// Abstract.
import { HistoryCurrent } from '../core';
/**
 * @description
 * @export
 * @class CurrentHistory
 * @template Value 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryCurrent<Value, DataType>}
 */
export class CurrentHistory<
  Value,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
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
   * @description The current history value.
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
   * @param {{value?: Value}} [param0={}] THe object with current `value`.
   * @param {Value} param0.value The current value inside the object.
   * @param {?DataConstructorInput<Value, DataType>} [data] Custom data holder.
   */
  constructor(
    {value}: {value?: Value} = {},
    data?: DataConstructorInput<readonly Value[], DataType>
  ) {
    super(arguments[0], data);
  }

  /**
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The `this` current instance.
   */
  public override destroy(): this {
    super.clear();
    super.destroy();
    return this;
  }

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} Indicates whether instance has set the current value.
   */
  public has(): boolean {
    return Array.isArray(super.data.value) && super.data.value.length > 0;
  }

  /**
   * @description Updates a current value.
   * @public
   * @param {Value} value The current value.
   * @returns {this} The `this` current instance.
   */
  public update(value: Value): this {
    super.set([value]);
    return this;
  }
}
