import { History as BaseHistory } from "../lib";
import { DataCore, WeakData } from '@typescript-package/data';

export let history = new class History<Type, Size extends number = number>
  extends BaseHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5}, WeakData);

describe(`History`, () => {
  beforeEach(() => {
    history = new class History<Type, Size extends number = number> extends BaseHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5}, WeakData);
  });

  it(`set()`, () => {
    history.set(10).set(15).set(20);
    console.log(`history.undoHistory.data`, WeakData.get(history.undoHistory.data));

    expect(history.undoHistory.get()).toEqual([5, 10, 15]);
    expect(history.current).toEqual(20);
  });

  it(`initial`, () => {
    expect(new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}().hasCurrent()).toBeFalse();

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


export class CustomData<Type> extends DataCore<Type[]> {
  #value: Type[];

  public get value() {
    return this.#value;
  }

  constructor(value: Type[]) {
    super();
    this.#value = value;
  }

  public destroy() {
    return this;
  }

  public set(value: Type[]) {
    this.#value = value;
    localStorage.setItem('', JSON.stringify(value));
    return this;
  }
}

// Initialize.
export const customHistory = new class History<Type, Size extends number = number>
  extends BaseHistory<Type, Size, CustomData<Type>>{}({value: 'a', size: 5}, CustomData);

// Add to the history.
customHistory.set('b').set('c').set('d').set('e').set('f').undo().undo();

// Check the stored redo and undo in `CustomData`.
console.log(`customHistory.data.redo`, customHistory.data.redo.value); // Output: ['e', 'f']
console.log(`customHistory.data.undo`, customHistory.data.undo.value); // Output: ['a', 'b', 'c']
