// Class.
import { History as AbstractHistory } from "../lib";

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
