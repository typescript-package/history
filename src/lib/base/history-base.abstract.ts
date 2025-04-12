import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Class.
import { CurrentHistory, RedoHistory, UndoHistory } from '.';
// Type.
import { HistoryCurrentConstructor, DataConstructor, HistoryCoreConstructor } from '../type';
/**
 * @description
 * @export
 * @abstract
 * @class HistoryBase
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 */
export abstract class HistoryBase<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> {
  /**
   * @description The max size for undo history.
   * @public
   * @static
   * @type {number}
   */
  public static size = Infinity;

  /**
   * @description Returns the `string` tag representation of the `HistoryBase` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return HistoryBase.name;
  }

  /**
   * @description Gets the current value stored in history.
   * @public
   * @readonly
   * @type {Value}
   */
  public get current(): Value {
    return this.#current.value;
  }

  /**
   * @description Returns the current history of `CurrentHistory`.
   * @public
   * @readonly
   * @type {CurrentHistory<Value, DataType>}
   */
  public get currentHistory() {
    return this.#current;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {{
   *     current: DataType,
   *     redo: DataType,
   *     undo: DataType
   *   }}
   */
  public get data() : {
    current: DataType,
    redo: DataType,
    undo: DataType
  } {
    return {
      current: this.#current.data,
      redo: this.#redo.data,
      undo: this.#undo.data,
    }
  }

  /**
   * @description Returns the redo history.
   * @public
   * @readonly
   * @type {RedoHistory<any, number>}
   */
  public get redoHistory() {
    return this.#redo;
  }

  /**
   * @description Returns the undo history.
   * @public
   * @readonly
   * @type {UndoHistory<any, number>}
   */
  public get undoHistory() {
    return this.#undo;
  }

  /**
   * @description A private field to store the current value.
   * @type {CurrentHistory<Value, DataType>}
   */
  #current: CurrentHistory<Value, DataType>;

  /**
   * @description Privately stored callback function invoked on redo.
   * @type {(value: Value) => void}
   */
  #onRedoCallback?: (value: Value) => void;

  /**
   * @description Privately stored callback function invoked on undo.
   * @type {(value: Value) => void}
   */
  #onUndoCallback?: (value: Value) => void;

  /**
   * @description The class to manage the redo history.
   * @type {RedoHistory}
   */
  #redo;

  /**
   * @description The class to manage the undo history.
   * @type {UndoHistory}
   */
  #undo

  constructor(
    {value, size}: { value?: Value, size?: Size} = {},
    data?: DataConstructor<Value, DataType>,
    {current, redo, undo}: {
      current?: HistoryCurrentConstructor<Value, DataType>,
      redo?: HistoryCoreConstructor<Value, Size, DataType>,
      undo?: HistoryCoreConstructor<Value, Size, DataType>,
    } = {},
  ) {
    this.#current = new (current || CurrentHistory)(arguments[0], data);
    this.#redo = new (redo || RedoHistory)(size || Infinity as Size, data);
    this.#undo = new (undo || UndoHistory)(size, data);
  }

  /**
   * @description Clears the `current`, `undo` and `redo` history.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    this.#current.clear();
    this.#redo.clear();
    this.#undo.clear();
    return this;
  }

  /**
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The current instance.
   */
  public destroy(): this {
    this.clear();
    this.#current.destroy();
    this.#undo.destroy();
    this.#redo.destroy();
    return this;
  }

  //#region get
  /**
   * @description Gets the current, undo and redo history.
   * @public
   * @returns {{ current: Readonly<Value>, undo: Readonly<Value[]>; redo: Readonly<Value[]> }} 
   */
  public get(): { current: Readonly<Value>, undo: Readonly<Value[]>; redo: Readonly<Value[]> } {
    return {
      current: this.#current.value,
      undo: this.#undo.get(),
      redo: this.#redo.get(),
    };
  }
  
  /**
   * @description The instance method returns read-only redo history.
   * @public
   * @template Type
   * @returns {(Readonly<Value[]> | undefined)} 
   */
  public getRedo(): Readonly<Value[]> | undefined {
    return this.#redo.get();
  }

  /**
   * @description The instance method returns read-only undo history.
   * @public
   * @template Type 
   * @returns {(Readonly<Value[]> | undefined)} 
   */
  public getUndo(): Readonly<Value[]> | undefined {
    return this.#undo.get();
  }
  //#endregion

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} 
   */
  public hasCurrent() {
    return this.#current.has();
  }

  /**
   * @description Checks whether the history is enabled by checking undo size.
   * @public
   * @returns {boolean} 
   */
  public isEnabled(): boolean {
    return this.#undo.size > 0 === true;
  }

  //#region on
  /**
   * @description Sets the callback function invoked on redo.
   * @public
   * @param {(value: Value) => void} callbackFn The callback function to invoke.
   * @returns {this} 
   */
  public onRedo(callbackFn: (value: Value) => void): this {
    this.#onRedoCallback = callbackFn;
    return this;
  }

  /**
   * @description Sets the callback function invoked on undo.
   * @public
   * @param {(value: Value) => void} callbackFn The callback function to invoke.
   * @returns {this} 
   */
  public onUndo(callbackFn: (value: Value) => void): this {
    this.#onUndoCallback = callbackFn;
    return this;
  }
  //#endregion

  /**
   * @description Returns the specified by index value from redo history.
   * @public
   * @param {number} [index=0] 
   * @returns {(Value | undefined)} 
   */
  public redoAt(index: number = 0): Value | undefined {
    return this.#redo.at(index);
  }

  /**
   * @description Returns the specified by index value from undo history.
   * @public
   * @param {number} [index=this.#undo.length - 1] 
   * @returns {(Value | undefined)} 
   */
  public undoAt(index: number = this.#undo.length - 1): Value | undefined {
    return this.#undo.at(index);
  }

  //#region first
  /**
   * @description Returns the first value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The first redo value.
   */
  public firstRedo(): Value | undefined {
    return this.#redo.first();
  }

  /**
   * @description Returns the first value that would be undone without modifying history.
   * @public
   * @returns {Value | undefined} The first undo value.
   */
  public firstUndo(): Value | undefined {
    return this.#undo.first();
  }
  //#endregion

  //#region last
  /**
   * @description Returns the last value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The last redo value.
   */
  public lastRedo(): Value | undefined {
    return this.#redo.last();
  }

  /**
   * @description Returns the last value that would be undone without modifying history.
   * @public
   * @returns {Value | undefined} The last undo value.
   */
  public lastUndo(): Value | undefined {
    return this.#undo.last();
  }
  //#endregion

  //#region next
  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public nextRedo(): Value | undefined {
    return this.#redo.next();
  }

  /**
   * @description Returns the next value that would be undone without modifying history.
   * @public
   * @returns {Value | undefined} The next undo value.
   */
  public nextUndo(): Value | undefined {
    return this.#undo.next();
  }
  //#endregion

  /**
   * @description Pick the undo or redo history.
   * @public
   * @param {('undo' | 'redo')} type 
   * @returns {Readonly<Value[]>} 
   */
  public pick(type: 'undo' | 'redo'): Readonly<Value[]> {
    return (type === 'undo' ? this.#undo : this.#redo).get();
  }

  /**
   * @description Redoes the last undone action.
   * @public
   * @returns {this} The current instance.
   */
  public redo(): this {
    const redo = this.#redo;
    if (redo.get()?.length) {
      const value = redo.take();
      this.#undo.add(this.#current.value);
      this.#current.update(value as Value);
      this.#onRedoCallback?.(value as Value);
    }
    return this;
  }

  /**
   * @description Sets a new value and updates the undo history.
   * @public
   * @param {Value} value 
   * @returns {this} The current instance.
   */
  public set(value: Value): this {
    this.#current.has() && this.#undo.add(this.#current.value);
    this.#current.update(value);
    this.#redo.clear();
    return this;
  }

  /**
   * @description Sets the size of undo history.
   * @public
   * @param {Size} size The maximum size for undo history.
   */
  public setSize(size: Size): this {
    this.#undo.setSize(size);
    return this;
  }

  /**
   * @description Undoes the last action and moves it to redo history.
   * @public
   * @returns {this} The current instance.
   */
  public undo(): this {
    const undo = this.#undo;
    if (undo.get()?.length) {
      const value = undo.take();
      this.#redo.add(this.#current.value);
      this.#current.update(value as Value);
      this.#onUndoCallback?.(value as Value);
    }
    return this;
  }
}
