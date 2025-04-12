import {
// Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryStorage } from './history-storage.abstract';
// Type.
import { DataConstructor } from '../type';
/**
 * @description The core class for history append and prepend.
 * @export
 * @abstract
 * @class HistoryCore
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryStorage<Value, DataType>}
 */
export abstract class HistoryCore<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
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
   * @type {Value[]}
   */
  protected get history(): Value[] {
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
   * @type {number}
   */
  #size

  /**
   * Creates an instance of `HistoryCore` child class.
   * @constructor
   * @param {Size} size 
   * @param {?DataConstructor<Value, DataType>} [data] 
   */
  constructor(
    size: Size,
    data?: DataConstructor<Value, DataType>
  ) {
    super([], data);
    this.#size = size;
  }

  /**
   * @description Adds the value to the history.
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The current instance.
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
   * @returns {this} The current instance.
   */
  public clear(): this {
    const history = this.history;
    history.length = 0;
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
   * @param {Size} size 
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

  /**
   * @description The method to trim the history.
   * @protected
   * @param {('pop' | 'shift')} method The method `pop` or `shift` to trim the history.
   * @returns {this} 
   */
  protected trim(method: 'pop' | 'shift'): this {
    if (this.#size > 0) {
      while (this.history.length > this.size) {
        method === 'pop' ? this.history.pop() : method === 'shift' && this.history.shift();
      }  
    }
    return this;
  }
}
