import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryCore } from './history-core.abstract';
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
   * @param {new (value: Value[]) => DataType} [data=Data as any] 
   */
  constructor(
    size: Size = HistoryPrepend.size as Size,
    data: new (value: Value[]) => DataType = Data as any
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
    const history = super.history;
    history.length >= super.size && history.pop();
    super.size > 0 && history.unshift(value);
    return this;
  }

  /**
   * @description Returns the first value in the history, the newest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekFirst(): Value | undefined {
    return super.history[0];
  }

  /**
   * @description Returns the last value in the history, the oldest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekLast(): Value | undefined {
    return super.history.at(-1);
  }

  /**
   * @description Returns the next value in the history, the newest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekNext(): Value | undefined {
    return super.history[0];
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
