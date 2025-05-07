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
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @extends {HistoryCore<Value, Size, DataType>}
 */
export abstract class HistoryPrepend<
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
   * @param {Size} [size=HistoryPrepend.size as Size] The maximum history size.
   * @param {?readonly Value[]} [initialValue] Initial value to add.
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] Custom data holder.
   */
  constructor(
    size: Size = HistoryPrepend.size as Size,
    initialValue?: readonly Value[],
    data?: DataConstructorInput<readonly Value[], DataType>,
  ) {
    super(size, data);
    Array.isArray(initialValue) && initialValue.forEach(value => this.add(value));
  }

  /**
   * @description Adds the value to the history in a backward manner.
   * @public
   * @param {Value} value The value to store.
   * @returns {this} The `this` current instance.
   */
  public add(value: Value): this {
    if (super.size > 0) {
      super.unshift(value);
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
    return super.first();
  }

  /**
   * @description Returns the most recent(first index 0) value in the history without modifying it. 
   * @public
   * @returns {(Value | undefined)} 
   */
  public newest(): Value | undefined {
    return super.first();
  }

  /**
   * @description Returns the last value in the history, the oldest value without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public oldest(): Value | undefined {
    return super.last();
  }

  /**
   * @description Removes and returns the first value in the history.
   * @public
   * @returns {(Value | undefined)} 
   */
  public take(): Value | undefined {
    return super.shift();
  }
}
