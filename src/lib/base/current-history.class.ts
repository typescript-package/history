import { Data, DataCore } from '@typescript-package/data';
import { HistoryStorage } from '../history-storage.abstract';

export class CurrentHistory<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryStorage<Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `CurrentHistory` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return CurrentHistory.name;
  }

  constructor(
    {value}: {value?: Value} = {},
    data: new (value: Value[]) => DataType = Data as any
  ) {
    super(Object.hasOwn(arguments[0] || {}, 'value') ? [value] as Value[] : [], data);
  }

  /**
   * @description Clears the `undo` and `redo` history, removes the current value, and resets the `hasSetBeenCalled`.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    super.set([]);
    return this;
  }

  /**s
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The current instance.
   */
  public override destroy(): this {
    this.clear();
    super.destroy();
    return this;
  }

  /**
   * @description Checks whether the current value is set.
   * @public
   * @returns {boolean} 
   */
  public has() {
    return super.data.value ? super.data.value.length > 0 : false;
  }


  public onSet(value: Value): this { return this; };

  /**
   * @description Updates a current value.
   * @public
   * @param {Value} value 
   * @returns {this} 
   */
  public update(value: Value): this {
    super.set([value]);
    return this;
  }
}
