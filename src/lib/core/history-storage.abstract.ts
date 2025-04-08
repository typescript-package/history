import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
/**
 * @description The history storage of specified data.
 * @export
 * @abstract
 * @class HistoryStorage
 * @template Value 
 * @template {DataCore<Value[]>} [Type=Data<Value[]>] 
 * @extends {DataCore<Value[]>}
 */
export abstract class HistoryStorage<
  Value,
  Type extends DataCore<Value[]> = Data<Value[]>
> extends DataCore<Value[]> {
  /**
   * @description Returns the `string` tag representation of the `HistoryStorage` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryStorage.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Type}
   */
  public get data() {
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
   * @description
   * @public
   * @readonly
   * @type {Value[]}
   */
  public get value(): Value[] {
    return this.#data.value;
  }

  /**
   * @description The data type to store the value.
   * @type {Type}
   */
  #data: Type;

  /**
   * Creates an instance of `HistoryStorage` child class.
   * @constructor
   * @param {Value[]} value The initial value.
   * @param {new(value: Value[]) => Type} [data=Data as any] 
   */
  constructor(
    value: Value[],
    data: new (value: Value[]) => Type = Data as any
  ) {
    super();
    this.#data = new data(value);
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
   * @returns {Readonly<Value[]>} 
   */
  public get(): Readonly<Value[]> {
    return this.#data.value;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Value[]} value The data of `Type[]` to set.
   * @returns {this} Returns `this` current instance.
   */
  public set(value: Value[]) {
    this.#data.set(value);
    return this;
  }
}
