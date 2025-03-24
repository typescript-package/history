import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryAppend } from './history-append.abstract';
/**
 * @description Manages the undo history with append mechanism.
 * @export
 * @class UndoHistory
 * @template [Type=any] The type of elements stored in the history.
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<Type[]>} [Storage=Data<Type[]>] 
 * @extends {HistoryAppend<Type, Size, Storage>}
 */
export class UndoHistory<
  Type = any,
  Size extends number = number,
  Storage extends DataCore<Type[]> = Data<Type[]>
> extends HistoryAppend<Type, Size, Storage>{};