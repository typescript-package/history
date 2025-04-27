import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Type.
import { DataConstructor } from '../type';
/**
 * @description The history storage of specified data.
 * @export
 * @abstract
 * @class HistoryStorage
 * @template Value 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 */
export abstract class HistoryStorage<
  Value,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> {
  /**
   * @description Returns the `string` tag representation of the `HistoryStorage` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return HistoryStorage.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data(): DataType {
    return this.#data;
  }

  /**
   * @description The length of the history.
   * @public
   * @readonly
   * @type {number}
   */
  public get length(): number {
    return this.#data.value.length;
  }

  /**
   * @description The data type to store the value.
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `HistoryStorage` child class.
   * @constructor
   * @param {readonly Value[]} value 
   * @param {?DataConstructor<Value, DataType>} [data] 
   */
  constructor(
    value: readonly Value[],
    data?: DataConstructor<Value, DataType>
  ) {
    this.#data = data ? new data(value) : new (Data as unknown as DataConstructor<Value, DataType>)(value);
  }

  /**
   * @description Destroys the storage data by setting it to `null`.
   * @public
   * @returns {this} Returns the current instance.
   */
  public destroy(): this {
    this.#data.destroy();
    return this;
  }

  /**
   * @description Gets the readonly history.
   * @public
   * @returns {readonly Value[]} 
   */
  public get(): readonly Value[] {
    return this.#data.value;
  }

  /**
   * @description Checks whether the storage is empty.
   * @public
   * @returns {boolean} 
   */
  public isEmpty(): boolean {
    return this.#data.value.length === 0;
  }

  /**
   * @description Sets the data value.
   * @protected
   * @param {readonly Value[]} value The data of `readonly Value[]` to set.
   * @returns {this} Returns `this` current instance.
   */
  protected set(value: readonly Value[]) {
    this.#data.set(value);
    return this;
  }
}
