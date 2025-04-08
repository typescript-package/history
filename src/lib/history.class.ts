import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Class.
import { CurrentHistory, RedoHistory, UndoHistory } from './base';
import { HistoryPeek } from './peek';
/**
 * @description The class to manage the value changes.
 * @export
 * @class History
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 */
export class History<
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
   * @description Returns the `string` tag representation of the `History` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return History.name;
  }

  /**
   * @description Gets the current value stored in history.
   * @public
   * @readonly
   * @type {Value}
   */
  public get current(): Value {
    return this.#current.value ? this.#current.value[0] : undefined as Value;
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
   * @description
   * @public
   * @readonly
   * @type {HistoryPeek<Value>}
   */
  public get peek() {
    return this.#peek;
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
   * @description 
   * @type {boolean}
   */
  #hasSetBeenCalled = false;

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
   * @description
   * @type {HistoryPeek}
   */
  #peek;

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

  /**
   * Creates an instance of `History` child class. 
   * @constructor
   * @param {{value?: Value, size?: Size}} param0 
   * @param {Value} param0.value 
   * @param {Size} param0.size 
   */
  constructor(
    {value, size}: {value?: Value, size?: Size} = {},
    data: new (value: Value[]) => DataType = Data as any
  ) {
    this.#peek = new HistoryPeek(this as any);
    this.#current = new CurrentHistory(Object.hasOwn(arguments[0] || {}, 'value') ? {value} : {}, data);
    this.#redo = new RedoHistory<Value, number, DataType>(Infinity, data);
    this.#undo = new UndoHistory<Value, Size, DataType>(size || History.size as Size, data);
    this.#current.has() && (this.#hasSetBeenCalled = true);
  }

  /**
   * @description Clears the `undo` and `redo` history, removes the current value, and resets the `hasSetBeenCalled`.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    this.#hasSetBeenCalled = false;
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

  /**
   * @description Gets the undo and redo history.
   * @public
   * @returns {{ undo: Readonly<Value[]>; redo: Readonly<Value[]> }} 
   */
  public get(): { undo: Readonly<Value[]>; redo: Readonly<Value[]> } {
    return {
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
    return (this.undoHistory.size > 0 ? true : false) === true;
  }

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


  public onSet(value: Value): this { return this; };

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

  /**
   * @description Returns the specified by index value from redo history.
   * @public
   * @param {number} [index=0] 
   * @returns {(Value | undefined)} 
   */
  public peekRedo(index: number = 0): Value | undefined {
    return this.#redo.peek(index);
  }

  /**
   * @description Returns the specified by index value from undo history.
   * @public
   * @param {number} [index=this.#undo.length - 1] 
   * @returns {(Value | undefined)} 
   */
  public peekUndo(index: number = this.#undo.length - 1): Value | undefined {
    return this.#undo.peek(index);
  }

  /**
   * @description Returns the last value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The last redo value.
   */
  public peekLastRedo(): Value | undefined {
    return this.#redo.peekLast();
  }

  /**
   * @description Returns the last value that would be undone without modifying history.
   * @public
   * @returns {Value | undefined} The last undo value.
   */
  public peekLastUndo(): Value | undefined {
    return this.#undo.peekLast();
  }

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @returns {Value | undefined} The next redo value.
   */
  public peekNextRedo(): Value | undefined {
    return this.#redo.peekNext();
  }

  /**
   * @description Returns the next value that would be undone without modifying history.
   * @public
   * @returns {Value | undefined} The next undo value.
   */
  public peekNextUndo(): Value | undefined {
    return this.#undo.peekNext();
  }

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
      this.#undo.add(this.#current.value[0]);
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
    this.#hasSetBeenCalled === true && this.#undo.add(this.#current.value[0]);
    this.#current.update(value);
    this.#redo.clear();
    this.#hasSetBeenCalled === false && (this.#hasSetBeenCalled = true);
    return this;
  }

  /**
   * @description Sets the size of undo history.
   * @public
   * @param {Size} size The maximum size for undo history.
   */
  public setSize(size: Size): this {
    this.undoHistory.setSize(size);
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
      this.#redo.add(this.#current.value[0]);
      this.#current.update(value as Value);
      this.#onUndoCallback?.(value as Value);
    }
    return this;
  }
}
