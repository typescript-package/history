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
   * @description Returns the last value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekLast(): Value | undefined {
    return super.history[super.history.length - 1];
  }

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekNext(): Value | undefined {
    return super.history[0];
  }

  /**
   * @description Takes the first value.
   * @public
   * @returns {(Value | undefined)} 
   */
  public take(): Value | undefined {
    return super.history.shift();
  }
}
