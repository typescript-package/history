// Abstract.
import { History } from '../history.class';
/**
 * @description 
 * @export
 * @class RedoHistoryPeek
 * @template Type 
 */
export class RedoHistoryPeek<Type> {
  /**
   * Creates an instance of `RedoHistoryPeek` child class.
   * @constructor
   * @param {History<Type>} history 
   */
  constructor(private readonly history: History<Type>) {}

  /**
   * @description
   * @public
   * @param {number} [index=0] 
   * @returns {(Type | undefined)} 
   */
  public index(index: number = 0): Type | undefined {
    return this.history.redoHistory.peek(index);
  }

  /**
   * @description
   * @public
   * @returns {(Type | undefined)} 
   */
  public last(): Type | undefined {
    return this.history.redoHistory.peekLast();
  }

  /**
   * @description
   * @public
   * @returns {(Type | undefined)} 
   */
  public next(): Type | undefined {
    return this.history.redoHistory.peekNext();
  }
}
