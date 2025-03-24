// Abstract.
import { History } from '../history.class';
/**
 * @description The class 
 * @export
 * @class UndoHistoryPeek
 * @template Type 
 */
export class UndoHistoryPeek<Type> {
  /**
   * Creates an instance of `UndoHistoryPeek` child class.
   * @constructor
   * @param {History<Type>} history 
   */
  constructor(private readonly history: History<Type>) {}

  /**
   * @description
   * @public
   * @param {number} [index=this.history.undoHistory.length - 1] 
   * @returns {(Type | undefined)} 
   */
  public index(index: number = this.history.undoHistory.length - 1): Type | undefined {
    return this.history.undoHistory.peek(index);
  }

  /**
   * @description
   * @public
   * @returns {(Type | undefined)} 
   */
  public last(): Type | undefined {
    return this.history.undoHistory.peekLast();
  }

  /**
   * @description
   * @public
   * @returns {(Type | undefined)} 
   */
  public next(): Type | undefined {
    return this.history.undoHistory.peekNext();
  }
}
