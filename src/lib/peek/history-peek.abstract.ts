// Abstract.
import { History } from "../history.abstract";
import { RedoHistoryPeek as AbstractRedoHistoryPeek } from "./redo-history-peek.abstract";
import { UndoHistoryPeek as AbstractUndoHistoryPeek } from "./undo-history-peek.abstract";
/**
 * @description
 * @export
 * @class HistoryPeek
 * @template Type 
 */
export class HistoryPeek<Type> {
  /**
   * @description
   * @public
   * @readonly
   * @type {*}
   */
  public get redo() {
    return this.#redo;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {*}
   */
  public get undo() {
    return this.#undo;
  }

  /**
   * @description
   * @readonly
   * @type {*}
   */
  readonly #undo;

  /**
   * @description
   * @readonly
   * @type {*}
   */
  readonly #redo;

  /**
   * Creates an instance of `HistoryPeek`.
   * @constructor
   * @param {History<Type>} history 
   */
  constructor(history: History<Type>) {
    this.#redo = new class RedoHistoryPeek<Type> extends AbstractRedoHistoryPeek<Type>{}(history);
    this.#undo = new class UndoHistoryPeek<Type> extends AbstractUndoHistoryPeek<Type>{}(history);
  }
}
