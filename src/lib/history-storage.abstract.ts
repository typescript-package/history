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
 * @template Type 
 * @template {DataCore<Type[]>} [Storage=Data<Type[]>] 
 * @extends {DataCore<Type[]>}
 */
export abstract class HistoryStorage<
  Type,
  Storage extends DataCore<Type[]> = Data<Type[]>
> extends DataCore<Type[]> {
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
   * @type {Type[]}
   */
  public get value(): Type[] {
    return this.#data.value;
  }

  /**
   * @description
   * @type {Storage}
   */
  #data: Storage;

  /**
   * Creates an instance of `HistoryStorage` child class.
   * @constructor
   * @param {Type[]} value The initial value.
   * @param {new(value: Type[]) => Storage} [storage=Data as any] 
   */
  constructor(
    value: Type[],
    storage: new(value: Type[]) => Storage = Data as any
  ) {
    super();
    this.#data = new storage(value);
  }

  /**
   * @description Destroys the `Value` object by setting it to `null`.
   * @public
   * @returns {this} Returns the current instance.
   */
  public destroy(): this {
    this.#data.destroy();
    return this;
  }

  /**
   * @description Sets the data value.
   * @public
   * @param {Type[]} value The data of `Type[]` to set.
   * @returns {this} Returns `this` current instance.
   */
  public set(value: Type[]) {
    this.#data.set(value);
    return this;
  }

  /**
   * @description Gets the readonly history.
   * @public
   * @returns {Readonly<Type[]>} 
   */
  public get(): Readonly<Type[]> {
    return this.#data.value;
  }
}
