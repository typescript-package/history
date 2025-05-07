/*
 * Public API Surface of history
 */
// Main.
export {
  History
} from './lib';
// Core.
export {
  // Abstract.
  HistoryAppend,
  HistoryCore,
  HistoryCurrent,
  HistoryPrepend,
  HistoryStorage,
} from './lib';
// Base.
export {
  CurrentHistory,
  HistoryBase,
  RedoHistory,
  UndoHistory,
} from './lib/base';
// Type.
export type {
  HistoryCoreConstructor,
  HistoryCurrentConstructor,
} from './lib/type';