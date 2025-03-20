// Abstract.
import { HistoryPeek } from './peek';
import { RedoHistory } from './redo-history.class';
import { UndoHistory } from './undo-history.class';
/**
 * @description The class to manage the value changes.
 * @export
 * @abstract
 * @class History
 * @template Type 
 * @template {number} [Size=number] 
 */
export abstract class History<Type, Size extends number = number> {
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
   * @type {Type}
   */
  public get current(): Type {
    return this.#current.value as Type;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {HistoryPeek<Type>}
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
   * @type {{ value?: Type }}
   */
  #current: { value?: Type } = {};

  /**
   * @description 
   * @type {boolean}
   */
  #hasSetBeenCalled = false;

  /**
   * @description Privately stored callback function invoked on redo.
   * @type {(value: Type) => void}
   */
  #onRedoCallback?: (value: Type) => void;

  /**
   * @description Privately stored callback function invoked on undo.
   * @type {(value: Type) => void}
   */
  #onUndoCallback?: (value: Type) => void;

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
   * @param {{value?: Type, size?: Size}} param0 
   * @param {Type} param0.value 
   * @param {Size} param0.size 
   */
  constructor({value, size}: {value?: Type, size?: Size} = {}) {
    this.#peek = new HistoryPeek<Type>(this);
    this.#redo = new RedoHistory<Type>(Infinity);
    this.#undo = new UndoHistory<Type, Size>(size || History.size as Size);
    Object.hasOwn(arguments[0] || {}, 'value') && ((this.#hasSetBeenCalled = true), (this.#current = {value}));
  }

  /**
   * @description Clears the `undo` and `redo` history, removes the current value, and resets the `hasSetBeenCalled`.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    delete this.#current.value;
    this.#hasSetBeenCalled = false;
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
    this.#undo.destroy();
    this.#redo.destroy();
    return this;
  }

  /**
   * @description Gets the undo and redo history.
   * @public
   * @returns {{ undo: Readonly<Type[]>; redo: Readonly<Type[]> }} 
   */
  public get(): { undo: Readonly<Type[]>; redo: Readonly<Type[]> } {
    return {
      undo: this.#undo.get(),
      redo: this.#redo.get(),
    };
  }
  
  /**
   * @description The instance method returns read-only redo history.
   * @public
   * @template Type
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public getRedo(): Readonly<Type[]> | undefined {
    return this.#redo.get();
  }

  /**
   * @description The instance method returns read-only undo history.
   * @public
   * @template Type 
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public getUndo(): Readonly<Type[]> | undefined {
    return this.#undo.get();
  }

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} 
   */
  public hasCurrent() {
    return Object.hasOwn(this.#current, 'value');
  }

  /**
   * @description Sets the callback function invoked on redo.
   * @public
   * @param {(value: Type) => void} callbackFn The callback function to invoke.
   * @returns {this} 
   */
  public onRedo(callbackFn: (value: Type) => void): this {
    this.#onRedoCallback = callbackFn;
    return this;
  }

  /**
   * @description Sets the callback function invoked on undo.
   * @public
   * @param {(value: Type) => void} callbackFn The callback function to invoke.
   * @returns {this} 
   */
  public onUndo(callbackFn: (value: Type) => void): this {
    this.#onUndoCallback = callbackFn;
    return this;
  }

  /**
   * @description Returns the specified by index value from redo history.
   * @public
   * @param {number} [index=0] 
   * @returns {(Type | undefined)} 
   */
  public peekRedo(index: number = 0): Type | undefined {
    return this.#redo.peek(index);
  }

  /**
   * @description Returns the specified by index value from undo history.
   * @public
   * @param {number} [index=this.#undo.length - 1] 
   * @returns {(Type | undefined)} 
   */
  public peekUndo(index: number = this.#undo.length - 1): Type | undefined {
    return this.#undo.peek(index);
  }

  /**
   * @description Returns the last value that would be redone without modifying history.
   * @public
   * @returns {Type | undefined} The last redo value.
   */
  public peekLastRedo(): Type | undefined {
    return this.#redo.peekLast();
  }

  /**
   * @description Returns the last value that would be undone without modifying history.
   * @public
   * @returns {Type | undefined} The last undo value.
   */
  public peekLastUndo(): Type | undefined {
    return this.#undo.peekLast();
  }

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @returns {Type | undefined} The next redo value.
   */
  public peekNextRedo(): Type | undefined {
    return this.#redo.peekNext();
  }

  /**
   * @description Returns the next value that would be undone without modifying history.
   * @public
   * @returns {Type | undefined} The next undo value.
   */
  public peekNextUndo(): Type | undefined {
    return this.#undo.peekNext();
  }

  /**
   * @description Pick the undo or redo history.
   * @public
   * @param {('undo' | 'redo')} type 
   * @returns {Readonly<Type[]>} 
   */
  public pick(type: 'undo' | 'redo'): Readonly<Type[]> {
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
      this.#undo.add(this.#current.value as Type);
      this.#current = {value};
      this.#onRedoCallback?.(value as Type);
    }
    return this;
  }

  /**
   * @description Sets a new value and updates the undo history.
   * @public
   * @param {Type} value 
   * @returns {this} The current instance.
   */
  public set(value: Type): this {
    this.#hasSetBeenCalled === true && this.#undo.add(this.#current.value as Type);
    this.#current = {value};
    this.#redo.clear();
    this.#hasSetBeenCalled === false && (this.#hasSetBeenCalled = true);
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
      this.#redo.add(this.#current.value as Type);
      this.#current = {value};
      this.#onUndoCallback?.(value as Type);
    }
    return this;
  }
}
