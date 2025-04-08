// Abstract.
import { History } from "../history.class";
import { RedoHistoryPeek } from "./redo-history-peek.class";
import { UndoHistoryPeek } from "./undo-history-peek.class";
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
   * @type {RedoHistoryPeek<Type>}
   */
  public get redo() {
    return this.#redo;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {UndoHistoryPeek<Type>}
   */
  public get undo() {
    return this.#undo;
  }

  /**
   * @description
   * @readonly
   * @type {RedoHistoryPeek<Type}
   */
  readonly #redo;

  /**
   * @description
   * @readonly
   * @type {UndoHistoryPeek<Type}
   */
  readonly #undo;

  /**
   * Creates an instance of `HistoryPeek`.
   * @constructor
   * @param {History<Type>} history 
   */
  constructor(history: History<Type>) {
    this.#redo = new RedoHistoryPeek(history);
    this.#undo = new UndoHistoryPeek(history);
  }
}
