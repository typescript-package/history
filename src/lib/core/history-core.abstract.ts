import {
// Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryStorage } from './history-storage.abstract';
/**
 * @description The core class for history append and prepend.
 * @export
 * @abstract
 * @class HistoryCore
 * @template Type 
 * @template {number} [Size=number] 
 * @template {DataCore<Type[]>} [DataType=Data<Type[]>] 
 * @extends {HistoryStorage<Type, DataType>}
 */
export abstract class HistoryCore<
  Type,
  Size extends number = number,
  DataType extends DataCore<Type[]> = Data<Type[]>
> extends HistoryStorage<Type, DataType> {
  /**
   * @description Returns the `string` tag representation of the `HistoryCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryCore.name;
  }
  
  /**
   * @description Gets the history.
   * @protected
   * @readonly
   * @type {Type[]}
   */
  protected get history(): Type[] {
    return super.value;
  }

  /**
   * @description The maximum size of the history.
   * @public
   * @readonly
   * @type {Size}
   */
  public get size(): Size {
    return this.#size;
  }

  /**
   * @description The maximum size of the history.
   * @type {number}
   */
  #size

  /**
   * Creates an instance of `HistoryCore` child class.
   * @constructor
   * @param {Size} size 
   */
  constructor(
    size: Size,
    data: new (value: Type[]) => DataType
  ) {
    super([], data);
    this.#size = size;
  }

  /**
   * @description Adds the value to the history.
   * @public
   * @param {Type} value The value to store.
   * @returns {this} The current instance.
   */
  public abstract add(value: Type): this;

  /**
   * @description Clears the history.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    const history = this.history;
    history.length = 0;
    return this;
  }

  /**
   * @description Returns the value at the specified index in the history.
   * @public
   * @param {number} index The position in the history (0-based index).
   * @returns {Type | undefined} The value at the specified position.
   */
  public peek(index: number): Type | undefined {
    return this.history[index];
  }

  /**
   * @description Returns the next value that would be undone without modifying history.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract peekLast(): Type | undefined;

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract peekNext(): Type | undefined;

  /**
   * @description Sets the size for history.
   * @public
   * @param {Size} size 
   * @returns {this} 
   */
  public setSize(size: Size): this {
    this.#size = size;
    return this;
  }

  /**
   * @description Takes the first value.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract take(): Type | undefined;
}
