/**
 * @description The core class for history append and prepend.
 * @export
 * @abstract
 * @class HistoryCore
 * @template Type 
 * @template {number} [Size=number] 
 */
export abstract class HistoryCore<Type, Size extends number = number> {
  /**
   * @description A private property for history of `WeakMap` type.
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #history = new WeakMap<any, any[]>();

  /**
   * @description Returns the `string` tag representation of the `HistoryCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return HistoryCore.name;
  }
  
  /**
   * @description Gets the history.
   * @protected
   * @readonly
   * @type {Type[]}
   */
  protected get history(): Type[] {
    return HistoryCore.#history.get(this) as Type[];
  }

  /**
   * @description The length of the history.
   * @public
   * @readonly
   * @type {number}
   */
  public get length(): number {
    return this.history.length;
  }

  /**
   * @description The maximum size of the history.
   * @public
   * @readonly
   * @type {Size}
   */
  public get size(): Size {
    return this.#size;
  }

  /**
   * @description The maximum size of the history.
   * @type {number}
   */
  #size

  /**
   * Creates an instance of `HistoryCore` child class.
   * @constructor
   * @param {Size} size 
   */
  constructor(size: Size) {
    this.#initialize();
    this.#size = size;
  }

  /**
   * @description Adds the value to the history.
   * @public
   * @param {Type} value The value to store.
   * @returns {this} The current instance.
   */
  public abstract add(value: Type): this;

  /**
   * @description Clears the history.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    const history = this.history;
    history.length = 0;
    return this;
  }

  /**
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The current instance.
   */
  public destroy(): this {
    HistoryCore.#history.delete(this);
    return this;
  }

  /**
   * @description Gets the history.
   * @public
   * @returns {Readonly<Type[]>} 
   */
  public get(): Readonly<Type[]> {
    return this.history;
  }

  /**
   * @description Returns the value at the specified index in the history.
   * @public
   * @param {number} index The position in the history (0-based index).
   * @returns {Type | undefined} The value at the specified position.
   */
  public peek(index: number): Type | undefined {
    return this.history[index];
  }

  /**
   * @description Returns the next value that would be undone without modifying history.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract peekLast(): Type | undefined;

  /**
   * @description Returns the next value that would be redone without modifying history.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract peekNext(): Type | undefined;

  /**
   * @description Takes the first value.
   * @public
   * @abstract
   * @returns {(Type | undefined)} 
   */
  public abstract take(): Type | undefined;

  /**
   * @description Initializes the history by setting an empty `Array`.
   * @private
   * @returns {this} The current instance.
   */
  #initialize(): this {
    HistoryCore.#history.set(this, []);
    return this;
  }
}
