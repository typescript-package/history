import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput,
} from '@typescript-package/data';
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
   * @description Returns the data holder of `DataType`.
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
   * @param {readonly Value[]} value The initial array.
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] Custom data holder, optionally with params.
   */ 
  constructor(
    value: readonly Value[],
    data?: DataConstructorInput<readonly Value[], DataType>
  ) {
    this.#data = new (Array.isArray(data) ? data[0] : data ?? Data)(value, ...Array.isArray(data) ? data.slice(1) : []) as DataType;
  }

  /**
   * @description Destroys the storage data, by default setting it to `null`.
   * @public
   * @returns {this} The `this` current instance.
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
   * @param {readonly Value[]} value The data value of `Value[]` to set.
   * @returns {this} The `this` current instance.
   */
  protected set(value: readonly Value[]): this {
    this.#data.set(value);
    return this;
  }
}
