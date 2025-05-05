import {
// Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput,
} from '@typescript-package/data';
// Abstract.
import { HistoryStorage } from './history-storage.abstract';
/**
 * @description The core class for history append and prepend.
 * @export
 * @abstract
 * @class HistoryCore
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryStorage<Value, DataType>}
 */
export abstract class HistoryCore<
  Value,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryStorage<Value, DataType> {
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
   * @type {readonly Value[]}
   */
  protected get history(): readonly Value[] {
    return super.data.value;
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
   * @type {Size}
   */
  #size: Size;

  /**
   * Creates an instance of `HistoryCore` child class.
   * @constructor
   * @param {Size} size The maximum undo history size.
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] Custom data holder.
   */
  constructor(
    size: Size,
    data?: DataConstructorInput<readonly Value[], DataType>
  ) {
    super([], data);
    this.#size = size;
  }

  //#region public method
  /**
   * @description Adds the value to the history.
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The `this` current instance.
   */
  public abstract add(value: Value): this;

  /**
   * @description Returns the value at the specified index in the history.
   * @public
   * @param {number} index The position in the history (0-based index).
   * @returns {Value | undefined} The value at the specified position.
   */
  public at(index: number): Value | undefined {
    return this.history[index];
  }

  /**
   * @description Clears the history.
   * @public
   * @returns {this} The `this` current instance.
   */
  public clear(): this {
    super.set([] as readonly Value[]);
    return this;
  }

  /**
   * @description Returns the first value without modifying history.
   * @public
   * @abstract
   * @returns {(Value | undefined)} 
   */
  public first(): Value | undefined {
    return this.history[0];
  }

  /**
   * @description Returns the last value without modifying history.
   * @public
   * @abstract
   * @returns {(Value | undefined)} 
   */
  public last(): Value | undefined {
    return this.history.at(-1);
  }

  /**
   * @description Returns the next value without modifying history.
   * @public
   * @abstract
   * @returns {(Value | undefined)} 
   */
  public abstract next(): Value | undefined;

  /**
   * @description Sets the size for history.
   * @public
   * @param {Size} size The maximum size of `Size`.
   * @returns {this} The `this` current instance.
   */
  public setSize(size: Size): this {
    this.#size = size;
    return this;
  }

  /**
   * @description Takes the first value.
   * @public
   * @abstract
   * @returns {(Value | undefined)} 
   */
  public abstract take(): Value | undefined;
  //#endregion

  //#region protected method
  /**
   * @description "Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified."
   * @protected
   * @returns {this} The `this` current instance.
   */
  protected pop(): Value | undefined {
    const history = [...this.history];
    if (Array.isArray(history) && history.length > 0) {
      const last = history.pop();
      this.set(history);
      return last;
    }
    return undefined;
  }

  /**
   * @description "Appends new elements to the end of an array, and returns the new length of the array."
   * @protected
   * @param {...readonly Value[]} items  The items to append.
   * @returns {number} The new length.
   */
  protected push(...items: readonly Value[]): number {
    const history = [...this.history];
    const length = history.push(...items);
    return (this.set(history), length);
  }

  /**
   * @description "Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified."
   * @protected
   * @returns {this} The `this` current instance.
   */
  protected shift(): Value | undefined {
    const history = [...this.history];
    if (Array.isArray(history) && history.length > 0) {
      const first = history.shift();
      this.set(history);
      return first;
    }
    return undefined;
  }

  /**
   * @description The method to trim the history.
   * @protected
   * @param {('pop' | 'shift')} method The method `pop` or `shift` to trim the history.
   * @returns {this} The `this` current instance.
   */
  protected trim(method: 'pop' | 'shift'): this {
    if (this.#size > 0) {
      while (this.history.length > this.size) {
        method === 'pop' ? this.pop() : method === 'shift' && this.shift();
      }  
    }
    return this;
  }

  /**
   * @description "Inserts new elements at the start of an array, and returns the new length of the array."
   * @protected
   * @param {...readonly Value[]} items The items to insert.
   * @returns {number} The new length.
   */
  protected unshift(...items: readonly Value[]): number {
    const history = [...this.history];
    const length = history.unshift(...items);
    return (this.set(history), length);
  }
  //#endregion
}
