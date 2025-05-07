import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput,
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
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryCore<Value, Size, DataType>}
 */
export abstract class HistoryAppend<
  Value,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends HistoryCore<Value, Size, DataType> {
  /**
   * @description The default value of maximum history size.
   * @public
   * @static
   * @type {number}
   */
  public static size: number = 10;

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
   * @param {Size} [size=HistoryAppend.size as Size] The maximum history size.
   * @param {?readonly Value[]} [initialValue] Initial value to add.
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] Custom data holder.
   */
  constructor(
    size: Size = HistoryAppend.size as Size,
    initialValue?: readonly Value[],
    data?: DataConstructorInput<readonly Value[], DataType>,
  ) {
    super(size, data);
    Array.isArray(initialValue) && initialValue.forEach(value => this.add(value));
  }

  /**
   * @description Adds the value to the history.
   * - FIFO unshift/queue style
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The `this` current instance.
   */
  public add(value: Value): this {
    if (super.size > 0) {
      super.push(value);
      super.trim('shift');
    }
    return this;
  }

  /**
   * @description Returns the most recent (last index added) value in the history without modifying it. 
   * @public
   * @returns {(Value | undefined)} 
   */
  public newest(): Value | undefined {
    return super.last();
  }

  /**
   * @description Returns the next value that would be removed (the most recent one) without modifying history.
   * - LIFO behavior
   * @public
   * @returns {(Value | undefined)} The next value in the append manner.
   */
  public next(): Value | undefined {
    return super.last();
  }

  /**
   * @description Returns the first(index 0 the oldest) value in the history without modifying it.
   * @public
   * @returns {(Value | undefined)} 
   */
  public oldest(): Value | undefined {
    return super.first();
  }

  /**
   * @description Removes and returns the last value in the history.
   * - LIFO behavior
   * @public
   * @returns {(Value | undefined)} 
   */
  public take(): Value | undefined {
    return super.pop();
  }
}
