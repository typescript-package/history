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
 * @template Type 
 * @template {number} [Size=number] 
 * @template {DataCore<Type[]>} [Storage=Data<Type[]>] 
 * @extends {HistoryCore<Type, Size, Storage>}
 */
export abstract class HistoryPrepend<
  Type,
  Size extends number = number,
  Storage extends DataCore<Type[]> = Data<Type[]>
> extends HistoryCore<Type, Size, Storage> {
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
   * @param {new (value: Type[]) => Storage} [storage=Data as Storage] 
   */
  constructor(
    size: Size = HistoryPrepend.size as Size,
    storage: new (value: Type[]) => Storage = Data as any
  ) {
    super(size, storage);
  }

  /**
   * @description Adds the value to the history in a backward manner.
   * @public
   * @param {Type} value The value to store.
   * @returns {this} The current instance.
   */
  public add(value: Type): this {
    const history = super.history;
    history.length >= super.size && history.pop();
    super.size > 0 && history.unshift(value);
    return this;
  }

  /**
   * @description Returns the last value that would be redone without modifying history.
   * @public
   * @returns {Type | undefined} The next redo value.
   */
  public peekLast(): Type | undefined {
    return super.history[super.history.length - 1];
  }

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @returns {Type | undefined} The next redo value.
   */
  public peekNext(): Type | undefined {
    return super.history[0];
  }

  /**
   * @description Takes the first value.
   * @public
   * @returns {(Type | undefined)} 
   */
  public take(): Type | undefined {
    return super.history.shift();
  }
}
