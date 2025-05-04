// Data.
import { Data, DataCore, DataConstructorInput } from '@typescript-package/data';
// Abstract.
import { HistoryStorage } from './history-storage.abstract';
/**
 * @description The class represents the current value of the history.
 * The class is used to:
 * - store the current value of the history,
 * - check whether the current value is set,
 * - update the current value of the history,
 * - clear the current value of the history,
 * - get the current value of the history.
 * @export
 * @abstract
 * @class HistoryCurrent
 * @template Value 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryStorage<Value, DataType>}
 */
export abstract class HistoryCurrent<
  Value,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryStorage<Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `HistoryCurrent` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryCurrent.name;
  }

  /**
   * @description
   * @public
   * @abstract
   * @readonly
   * @type {Value}
   */
  public abstract get value(): Value;

  /**
   * Creates an instance of `HistoryCurrent` child class.
   * @constructor
   * @param {{value?: Value}} [param0={}] 
   * @param {Value} param0.value 
   * @param {?DataConstructor<readonly Value[], DataType>} [data] 
   */
  constructor(
    {value}: {value?: Value} = {},
    data?: DataConstructorInput<readonly Value[], DataType>
  ) {
    super(Object.hasOwn(arguments[0] || {}, 'value') ? [value] as [Value] : [], data);
  }

  /**
   * @description Clears the `current` history.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    super.set([]);
    return this;
  }

  /**
   * @description Checks whether the current value is set.
   * @public
   * @abstract
   * @returns {boolean} 
   */
  public abstract has(): boolean;

  /**
   * @description Updates a current value.
   * @public
   * @abstract
   * @param {Value} value 
   * @returns {this} 
   */
  public abstract update(value: Value): this;
}
