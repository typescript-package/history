import {
  // Class.
  Data,
  // Abstract.
  DataCore,
  // Type.
  DataConstructorInput
} from '@typescript-package/data';
// Abstract.
import { CurrentHistory, HistoryBase, RedoHistory, UndoHistory } from './base';
import { HistoryCore, HistoryCurrent } from './core';
// Type.
import { HistoryCoreConstructor, HistoryCurrentConstructor } from './type';
/**
 * @description The class to manage the value changes.
 * @export
 * @class History
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 */
export class History<
  Value,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, DataType> = CurrentHistory<Value, DataType>,
  RedoType extends HistoryCore<Value, Size, DataType> = RedoHistory<Value, Size, DataType>,
  UndoType extends HistoryCore<Value, Size, DataType> = UndoHistory<Value, Size, DataType>,
> extends HistoryBase<Value, Size, DataType, CurrentType, RedoType, UndoType> {
  /**
   * @description The max size for undo history.
   * @public
   * @static
   * @type {number}
   */
  public static override size: number = Infinity;

  /**
   * @description Returns the `string` tag representation of the `History` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return History.name;
  }

  /**
   * Creates an instance of `History`.
   * @constructor
   * @param {{ value?: Value, size?: Size}} [param0={}] The optional `value` and maximum undo history `size`.
   * @param {Value} param0.value The initial value.
   * @param {Size} param0.size  The maximum undo history size.
   * @param {?DataConstructorInput<readonly Value[], DataType>} [data] The custom data holder for history, current, undo and redo.
   * @param {{
   *       current?: HistoryCurrentConstructor<Value, DataType, CurrentType>,
   *       redo?: HistoryCoreConstructor<Value, Size, DataType, RedoType>,
   *       undo?: HistoryCoreConstructor<Value, Size, DataType, UndoType>,
   *     }} [param1={}] 
   * @param {HistoryCurrentConstructor<Value, DataType, CurrentType>} param1.current Custom current history class of `HistoryCurrent`.
   * @param {HistoryCoreConstructor<Value, Size, DataType, RedoType>} param1.redo Custom redo history class of `HistoryCore`.
   * @param {HistoryCoreConstructor<Value, Size, DataType, UndoType>} param1.undo Custom undo history class of `HistoryCore`.
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
    super(arguments[0], data, {
      current: current ?? CurrentHistory as HistoryCurrentConstructor<Value, DataType, CurrentType>,
      redo: redo ?? RedoHistory as unknown as HistoryCoreConstructor<Value, Size, DataType, RedoType>,
      undo: undo ?? UndoHistory as unknown as HistoryCoreConstructor<Value, Size, DataType, UndoType>
    });
  }
}
