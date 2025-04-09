import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryCore } from './history-core.abstract';
/**
 * @description Class extends the `HistoryCore` class to maintain a history of values in a append manner.
 * This means that new entries are added to the end of the history, and as the history exceeds its size limit, entries from the beginning are removed.
 * LIFO(Last in, First out): The last value that was added (the most recent one) will be the first one to be removed.
 * Add: Add to the end of the array (push).
 * Take: Remove from the end of the array (pop), which is the most recent item.
 * PeekFirst: Look at the first item in the history (oldest).
 * PeekLast: Look at the last item in the history (newest).
 * @export
 * @abstract
 * @class HistoryAppend
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryCore<Value, Size, DataType>}
 */
export abstract class HistoryAppend<
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
   * @description Returns the `string` tag representation of the `HistoryAppend` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryAppend.name;
  }

  /**
   * Creates an instance of `HistoryAppend` child class.
   * @constructor
   * @param {Size} [size=HistoryAppend.size as Size] 
   * @param {new (value: Value[]) => DataType} [data=Data as any] 
   */
  constructor(
    size: Size = HistoryAppend.size as Size,
    data: new (value: Value[]) => DataType = Data as any
  ) {
    super(size, data);
  }

  /**
   * @description Adds the value to the history.
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The current instance.
   */
  public add(value: Value): this {
    const history = super.history;
    history.length >= super.size && history.shift();
    super.size > 0 && history.push(value);
    return this;
  }

  /**
   * @description Returns the first (oldest) value in the history without modifying it.
   * @public
   * @returns {(Value | undefined)} The first value.
   */
  public peekFirst(): Value | undefined {
    return super.history[0];
  }

  /**
   * @description Returns the most recent (last added) value in the history without modifying it.
   * @public
   * @returns {(Value | undefined)} The last added value.
   */
  public peekLast(): Value | undefined {
    return super.history.at(-1);
  }

  /**
   * @description Returns the next value that would be removed (the most recent one) without modifying history.
   * - LIFO behavior
   * @public
   * @returns {(Value | undefined)} The next value in the append manner.
   */
  public peekNext(): Value | undefined {
    return super.history.at(-1);
  }

  /**
   * @description Removes and returns the last value in the history.
   * - LIFO behavior
   * @public
   * @returns {(Value | undefined)} 
   */
  public take(): Value | undefined {
    return super.history.pop();
  }
}
