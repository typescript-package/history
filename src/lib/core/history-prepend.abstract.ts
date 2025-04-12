import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryCore } from './history-core.abstract';
// Type.
import { DataConstructor } from '../type';
/**
 * @description Class extends the `HistoryCore` class to maintain a history of values in a prepend manner.
 * This means that new entries are added to the beginning of the history, and older entries are shifted out as the history size exceeds its limit.
 * LIFO(Last in, First out): The last value that was added (the most recent one) will be the first one to be removed.
 * Add: Add to the beginning of the array (unshift).
 * Take: Remove from the beginning of the array (shift), which is the most recent item.
 * PeekFirst: Look at the first item in the history (newest).
 * PeekLast: Look at the last item in the history (oldest).
 * @export
 * @abstract
 * @class HistoryPrepend
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryCore<Value, Size, DataType>}
 */
export abstract class HistoryPrepend<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryCore<Value, Size, DataType> {
  /**
   * @description The default value of maximum history size.
   * @public
   * @static
   * @type {number}
   */
  public static size = 10;

  /**
   * @description Returns the `string` tag representation of the `HistoryPrepend` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryPrepend.name;
  }

  /**
   * Creates an instance of `HistoryPrepend` child class.
   * @constructor
   * @param {Size} [size=HistoryPrepend.size as Size] 
   * @param {?DataConstructor<Value, DataType>} [data] 
   */
  constructor(
    size: Size = HistoryPrepend.size as Size,
    data?: DataConstructor<Value, DataType>
  ) {
    super(size, data);
  }

  /**
   * @description Adds the value to the history in a backward manner.
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The current instance.
   */
  public add(value: Value): this {
    if (super.size > 0) {
      super.history.unshift(value);
      super.trim('pop');
    }
    return this;
  }

  /**
   * @description Returns the next(index 0) value in the history, the newest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public next(): Value | undefined {
    return this.first();
  }

  /**
   * @description Returns the most recent(first index 0) value in the history without modifying it. 
   * @public
   * @returns {(Value | undefined)} 
   */
  public newest(): Value | undefined {
    return this.first();
  }

  /**
   * @description Returns the last value in the history, the oldest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public oldest(): Value | undefined {
    return this.last();
  }

  /**
   * @description Removes and returns the first value in the history.
   * @public
   * @returns {(Value | undefined)} 
   */
  public take(): Value | undefined {
    return super.history.shift();
  }
}
