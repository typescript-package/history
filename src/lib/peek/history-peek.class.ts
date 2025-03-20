// Abstract.
import { History } from "../history.abstract";
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
    this.#redo = new RedoHistoryPeek(history);
    this.#undo = new UndoHistoryPeek(history);
  }
}
