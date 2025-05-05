import {
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput,
  ImmutableArray,
} from '@typescript-package/data';
// Abstract.
import { HistoryCore, HistoryCurrent } from '../core';
// Type.
import { HistoryCurrentConstructor, HistoryCoreConstructor } from '../type';
/**
 * @description The base abstract class to manage history.
 * @export
 * @abstract
 * @class HistoryBase
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 */
export abstract class HistoryBase<
  Value,
  Size extends number,
  DataType extends DataCore<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, DataType>,
  RedoType extends HistoryCore<Value, Size, DataType>,
  UndoType extends HistoryCore<Value, Size, DataType>,
> {
  /**
   * @description The max size for undo history.
   * @public
   * @static
   * @type {number}
   */
  public static size: number = Infinity;

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
   * @type {CurrentType}
   */
  public get currentHistory(): CurrentType {
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
  public get data(): {
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
   * @type {RedoType}
   */
  public get redoHistory(): RedoType {
    return this.#redo;
  }
  
  /**
   * @description Returns the undo history.
   * @public
   * @readonly
   * @type {UndoType}
   */
  public get undoHistory(): UndoType {
    return this.#undo;
  }

  /**
   * @description A private field to store the current value.
   * @type {CurrentType}
   */
  #current: CurrentType;

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
   * @type {RedoType}
   */
  #redo: RedoType;

  /**
   * @description The class to manage the undo history.
   * @type {UndoType}
   */
  #undo: UndoType;

  /**
   * Creates an instance of `HistoryBase` child class.
   * @constructor
   * @param {{ value?: Value, size?: Size}} [param0={}] 
   * @param {Value} param0.value 
   * @param {Size} param0.size 
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] 
   * @param {{
   *       current?: HistoryCurrentConstructor<Value, DataType, CurrentType>,
   *       redo?: HistoryCoreConstructor<Value, Size, DataType, RedoType>,
   *       undo?: HistoryCoreConstructor<Value, Size, DataType, UndoType>,
   *     }} [param1={}] 
   * @param {HistoryCurrentConstructor<Value, DataType, CurrentType>} param1.current 
   * @param {HistoryCoreConstructor<Value, Size, DataType, RedoType>} param1.redo 
   * @param {HistoryCoreConstructor<Value, Size, DataType, UndoType>} param1.undo 
   */
  constructor(
    {value, size}: { value?: Value, size?: Size} = {},
    data?: DataConstructorInput<readonly Value[], DataType>,
    {current, redo, undo}: {
      current?: HistoryCurrentConstructor<Value, DataType, CurrentType>,
      redo?: HistoryCoreConstructor<Value, Size, DataType, RedoType>,
      undo?: HistoryCoreConstructor<Value, Size, DataType, UndoType>,
    } = {},
  ) {
    this.#current = new (current!)(arguments[0], data);
    this.#redo = new (redo!)(size || Infinity as Size, undefined, data);
    this.#undo = new (undo!)(size, undefined, data);
  }

  /**
   * @description Clears the `current`, `undo` and `redo` history.
   * @public
   * @returns {this} The `this` current instance.
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
   * @returns {this} The `this` current instance.
   */
  public destroy(): this {
    this.clear();
    this.#current.destroy();
    this.#redo.destroy();
    this.#undo.destroy();
    return this;
  }

  //#region get
  /**
   * @description Gets the current, undo and redo history.
   * @public
   * @returns {{ current: Readonly<Value>, undo: ImmutableArray<Value>; redo: ImmutableArray<Value> }} 
   */
  public get(): { current: Readonly<Value>, undo: ImmutableArray<Value>; redo: ImmutableArray<Value> } {
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
   * @returns {(ImmutableArray<Value>)} 
   */
  public getRedo(): ImmutableArray<Value> {
    return this.#redo.get();
  }

  /**
   * @description The instance method returns read-only undo history.
   * @public
   * @template Type 
   * @returns {(ImmutableArray<Value>)} 
   */
  public getUndo(): ImmutableArray<Value> {
    return this.#undo.get();
  }
  //#endregion

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} 
   */
  public hasCurrent(): boolean {
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
   * @description Pick the current, redo or undo history.
   * @public
   * @param {('current' | 'redo' | 'undo')} type 
   * @returns {ImmutableArray<Value>} 
   */
  public pick(type: 'current' | 'redo' | 'undo'): ImmutableArray<Value> {
    switch(type) {
      case 'current': return this.#current.get();
      case 'redo': return this.#redo.get();
      case 'undo': return this.#undo.get();
      default: throw new Error(`Invalid type: ${type}. Expected 'current', 'redo', or 'undo'.`);
    }
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
   * @returns {this} The `this` current instance.
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
