import { History as BaseHistory } from "../lib";
import { DataCore, WeakData } from '@typescript-package/data';

export let history = new class History<Type, Size extends number = number>
  extends BaseHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5 as number}, WeakData);

describe(`History`, () => {
  beforeEach(() => {
    history = new class History<Type, Size extends number = number> extends BaseHistory<Type, Size, WeakData<Type[]>>{}({value: 5, size: 5 as number}, WeakData);
  });

  it(`disabled by size = 0`, () => {
    console.group(`disabled by size = 0`);
    const disabled = new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}({size: 0 as number});
    expect(disabled.isEnabled()).toBeFalse();

    // Set 27.
    disabled.set(27);
    expect(disabled.undoHistory.get()).toEqual([]);

    // Set size and set 27.
    disabled.setSize(5).set(27);
    expect(disabled.undoHistory.get()).toEqual([27]);

    console.groupEnd();
  });

  it(`initial`, () => {
    console.group(`Initial`);
    const test = new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}();
    console.debug(test);
    expect(test.hasCurrent()).toBeFalse();
    expect(history.undoHistory.get()).toEqual([]);
    expect(history.current).toEqual(5);

    console.groupEnd();
  });

  describe(`current`, () => {
    it(`initialized with 25`, () => {
      expect(new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}({value: 25}).current).toEqual(25);
    });

    it(`empty`, () => {
      expect(new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}({}).current).toBeUndefined();
      expect(new class History<Type, Size extends number = number> extends BaseHistory<Type, Size>{}().current).toBeUndefined();
    });

    it(`after set()`, () => {
      // history.
      expect(history.current).toEqual(5);
      // Set.
      history.set(27);
      expect(history.current).toEqual(27);
    });

    it(`after set() and one undo()`, () => {  
      history.set(27);
      expect(history.current).toEqual(27);
    
      history.undo();
      expect(history.current).toEqual(5);
    });

    it(`after set() and undo() above the limit`, () => {  
      history.set(27);
      expect(history.current).toEqual(27);
  
      history.set(37);
      expect(history.current).toEqual(37);
  
      history.undo().undo().undo();
      expect(history.current).toEqual(5);
    });

    it(`set() undo() and redo()`, () => {  
      history.set(27).set(37).set(57).set(67).set(77);
      history.undo().undo().undo().undo();
      expect(history.current).toEqual(27);
  
      history.redo();
      expect(history.current).toEqual(37);
  
      history.redo();
      expect(history.current).toEqual(57);
  
      history.redo();
      expect(history.current).toEqual(67);

      history.redo();
      expect(history.current).toEqual(77);

      history.redo();
      expect(history.current).toEqual(77);

      history.undo();
      expect(history.current).toEqual(67);
    });
  });

  describe(`peek`, () => {
    it(`peekLastUndo()`, () => {
      history.set(10).set(15).set(20).set(25).set(30);
      expect(history.lastUndo()).toEqual(25);
      history.set(35);
      expect(history.lastUndo()).toEqual(30);
    });

    it(`peekFirstUndo()`, () => {
      history.set(10).set(15).set(20).set(25).set(30);
      expect(history.firstUndo()).toEqual(5);
      history.set(35);
      expect(history.firstUndo()).toEqual(10);
    });

    it(`peekLastRedo()`, () => {
      history.set(10).set(15).set(20).set(25).set(30).undo().undo();
      expect(history.lastRedo()).toEqual(30);
    });

    it(`peekFirstRedo()`, () => {
      history.set(10).set(15).set(20).set(25).set(30).undo().undo();
      expect(history.firstRedo()).toEqual(25);
      history.set(35);
      expect(history.firstRedo()).toBeUndefined();
    });
  
    it(`peekLastRedo() peekNextRedo() peekLastUndo() peekNextUndo()`, () => {
      history.set(10).set(15).set(20).set(25).set(30)
        .undo() // undo [5, 10, 15, 20] -> current 25 -> redo [30]

      expect(history.nextUndo()).toEqual(20);

      history.undo() // undo [5, 10, 15] -> current 20 -> redo [25, 30]
        .undo() // undo [5, 10] -> current 15 -> redo [20, 25, 30]

      expect(history.nextUndo()).toEqual(10);
      expect(history.lastRedo()).toEqual(30);
      expect(history.nextRedo()).toEqual(20);

      history.redo(); // undo [5, 10, 15] -> current 20 -> redo [25, 30]
      expect(history.lastRedo()).toEqual(30);
      expect(history.nextRedo()).toEqual(25);
    });
  
  });

  it(`set()`, () => {
    history.set(10).set(15).set(20);
    console.log(`history.undoHistory.data`, WeakData.get(history.undoHistory.data));

    expect(history.undoHistory.get()).toEqual([5, 10, 15]);
    expect(history.current).toEqual(20);
  });

  // setSize()
  it(`setSize`, () => {
    history.setSize(27 as any);
    expect(history.undoHistory.size).toEqual(27);
  });

  // size()
  it(`size`, () => {
    expect(history.undoHistory.size).toEqual(5);
  });

  // undo and redo with limit size
  it(`undo and redo with limit size`, () => {
    console.group(`History`);

    console.log(`set 10 - 35`);
    history.set(10).set(15).set(20).set(25).set(30).set(35);

    expect(history.current).toEqual(35);
    // expect(history.peek.undo.last()).toEqual(30); //TODO: Check

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

  // clear()
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

  // destroy()
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
    // localStorage.setItem('', JSON.stringify(value));
    return this;
  }
}

// Initialize.
export const customHistory = new class History<Type, Size extends number = number>
  extends BaseHistory<Type, Size, CustomData<Type>>{}({value: 'a', size: 5}, CustomData);

// Add to the history.
customHistory.set('b').set('c').set('d').set('e').set('f').undo().undo();

// Check the stored redo and undo in `CustomData`.
console.log(`customHistory.data`, customHistory.data); // Output: 
console.log(`customHistory.data.redo`, customHistory.data.redo.value); // Output: ['e', 'f']
console.log(`customHistory.data.undo`, customHistory.data.undo.value); // Output: ['a', 'b', 'c']




