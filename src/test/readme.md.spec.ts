// Class.
import { Data, DataCore } from "@typescript-package/data";
import {
  History as AbstractHistory,
  HistoryBase as AbstractHistoryBase,
  HistoryCurrent as AbstractHistoryCurrent,
  HistoryAppend as AbstractHistoryAppend,
  HistoryPrepend as AbstractHistoryPrepend,
  HistoryStorage as AbstractHistoryStorage,
} from "../lib";

// History

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

// HistoryAppend

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

// historyPrepend

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

// HistoryStorage
export class HistoryStorage<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryStorage<Value, DataType> {
  public override set(value: Value[]) {
    super.set(value);
    return this;
  }
}

console.group(`HistoryStorage README.md`);
const historyStorage = new HistoryStorage(['a']);
console.log(historyStorage.get()); // ['a']
console.log(historyStorage.length); // 1
console.log(historyStorage.isEmpty()); // false
console.log(historyStorage.data.value); // ['a']
historyStorage.set(['b']);
console.log(historyStorage.get()); // ['b']
historyStorage.set(['b', 'c', 'd']);
console.log(historyStorage.get()); // ['b', 'c', 'd']
console.log(historyStorage.length); // 3
historyStorage.destroy();
console.log(Object.hasOwn(historyStorage.data, 'value')); // false
console.groupEnd();


// HistoryCurrent

export class HistoryCurrent<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryCurrent<Value, DataType> {

  public override get value() {
    return super.data.value[0]
  }

  public has() {
    return super.data.value.length > 0;
  }

  public override set(value: Value[]) {
    super.set(value);
    return this;
  }

  public update(value: Value) {
    super.set([value]);
    return this;
  }
}

console.group(`HistoryCurrent README.md`);
const historyCurrent = new HistoryCurrent({value: 'a'});
console.log(`get()`, historyCurrent.get()); // ['a']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
console.log(`data.value`, historyCurrent.data.value); // ['a']
historyCurrent.set(['b']);
console.log(`get()`, historyCurrent.get()); // ['b']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.set(['b', 'c', 'd']);
console.log(`get()`, historyCurrent.get()); // ['b', 'c', 'd']
console.log(`length`, historyCurrent.length); // 3
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.update('e');
console.log(`get()`, historyCurrent.get()); // ['e']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.destroy();


// HistoryBase

export class HistoryBase<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryBase<Value, Size, DataType> {}

console.group(`HistoryBase README.md`);
const historyBase = new HistoryBase({value: 'a', size: 5});
console.log(`HistoryBase`, historyBase);
console.log(`get()`, historyBase.get()); // ['a']
console.groupEnd();
