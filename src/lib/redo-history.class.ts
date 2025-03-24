import {
  // Class.
  Data,
  // Abstract.
  DataCore
} from '@typescript-package/data';
// Abstract.
import { HistoryPrepend } from './history-prepend.abstract';
/**
 * @description Manages the redo history with prepend mechanism.
 * @export
 * @class RedoHistory
 * @template [Type=any] The type of elements stored in the history
 * @template {number} [Size=number] The maximum size of the history.
 * @template {DataCore<Type[]>} [Storage=Data<Type[]>] 
 * @extends {HistoryPrepend<Type, Size, Storage>}
 */
export class RedoHistory<
  Type = any,
  Size extends number = number,
  Storage extends DataCore<Type[]> = Data<Type[]>
> extends HistoryPrepend<Type, Size, Storage>{};
