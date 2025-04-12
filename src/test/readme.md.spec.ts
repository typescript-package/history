// Class.
import {
  History as AbstractHistory,
  HistoryAppend as AbstractHistoryAppend,
  HistoryPrepend as AbstractHistoryPrepend
} from "../lib";

// Initialize.
const history = new class History<Type, Size extends number = number> extends AbstractHistory<Type, Size>{}({value: 5, size: 5});

console.group(`History README.md`);

console.log(`set 10 - 35`);
history.set(10).set(15).set(20).set(25).set(30).set(35);

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10, 15, 20, 25, 30], 35, []

// undo 35
console.log(`undo`, 35);
history.undo();

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10, 15, 20, 25], 30, [35]

// undo 30
console.log(`undo`, 30);
history.undo();

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10, 15, 20], 25, [30, 35]

// undo 25
console.log(`undo`, 25);
history.undo();

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10, 15], 20, [25, 30, 35]

// undo 20
console.log(`undo`, 20);
history.undo();

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10], 15, [20, 25, 30, 35]

// redo 20
console.log(`redo`, 20);
history.redo();

console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); // [10, 15], 20, [25, 30, 35]

console.groupEnd();



console.group(`HistoryAppend README.md`);

export const historyAppend = new class HistoryAppend<Type = number, Size extends number = number>
  extends AbstractHistoryAppend<Type, Size>{}();

// Add to the history.
console.log(`add`, 127, 227);
historyAppend.add(127).add(227);
console.log(historyAppend.get()); // [127, 227]

// Peek.
console.log(`peekLast()`, historyAppend.last()); // Outputs: 127
console.log(`peekNext()`, historyAppend.first()); // Outputs: 227

// Take from the history.
console.log(historyAppend.take()); // 227
console.log(historyAppend.get()); // [127]

console.groupEnd();



console.group(`HistoryPrepend README.md`);

export const historyPrepend = new class HistoryPrepend<Type = number, Size extends number = number>
  extends AbstractHistoryPrepend<Type, Size>{}();

// Add to the history.
console.log(`add`, 127, 327, 227);
historyPrepend.add(127).add(327).add(227);
console.log(historyPrepend.get()); // [227, 327, 127]

// Peek.
console.log(`peekLast()`, historyPrepend.last()); // Outputs: 127
console.log(`peekNext()`, historyPrepend.first()); // Outputs: 227

// Take from the history.
console.log(historyPrepend.take()); // 227
console.log(historyPrepend.get()); // [327, 127]

console.groupEnd();
