import { History as AbstractHistory } from "../lib";
import { WeakData } from '@typescript-package/data';

let history = new class History<Type, Size extends number = number> extends AbstractHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5}, WeakData);

describe(`History`, () => {
  beforeEach(() => {
    history = new class History<Type, Size extends number = number> extends AbstractHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5}, WeakData);
  });

  it(`set()`, () => {
    history.set(10);
    history.set(15);
    history.set(20);

    expect(history.undoHistory.get()).toEqual([5, 10, 15]);
    expect(history.current).toEqual(20);
  });

  it(`initial`, () => {
    expect(new class History<Type, Size extends number = number> extends AbstractHistory<Type, Size>{}().hasCurrent()).toBeFalse();

    expect(history.undoHistory.get()).toEqual([]);
    expect(history.current).toEqual(5);
  });

  it(`size`, () => {
    expect(history.undoHistory.size).toEqual(5);
  });

  it(`undo and redo with limit size`, () => {
    console.group(`History`);

    console.log(`set 10 - 35`);
    history.set(10).set(15).set(20).set(25).set(30).set(35);

    expect(history.current).toEqual(35);
    expect(history.peek.undo.last()).toEqual(10);

    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

    // undo 35
    console.log(`undo`, 35);
    history.undo();
    expect(history.current).toEqual(30);
    expect(history.redoHistory.get()).toEqual([35]);

    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

    // undo 30
    console.log(`undo`, 30);
    history.undo();
    expect(history.current).toEqual(25);
    expect(history.redoHistory.get()).toEqual([30, 35]);

    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

    // undo 25
    console.log(`undo`, 25);
    history.undo();
    expect(history.current).toEqual(20);
    expect(history.redoHistory.get()).toEqual([25, 30, 35]);

    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

    // undo 20
    console.log(`undo`, 20);
    history.undo();
    expect(history.current).toEqual(15);
    expect(history.redoHistory.get()).toEqual([20, 25, 30, 35]);
    
    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

    console.groupEnd();
  });

  it(`clear()`, () => {
    console.group(`History clear()`);
    history.set(10).set(15).set(20).set(25).set(30).set(35);
    history.clear();
    expect(history.redoHistory.get()).toEqual([]);
    expect(history.undoHistory.get()).toEqual([]);
    expect(history.hasCurrent()).toBeFalse();
    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());
    console.groupEnd();
  });

  it(`destroy()`, () => {
    console.group(`History destroy()`);
    history.destroy();
    expect(history.redoHistory.get()).toBeUndefined();
    expect(history.undoHistory.get()).toBeUndefined();
    expect(history.hasCurrent()).toBeFalse();
    console.log(history.undoHistory.get(), history.current, history.redoHistory.get());
    console.groupEnd();
  });
});
