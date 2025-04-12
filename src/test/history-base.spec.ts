import { Data, DataCore } from "@typescript-package/data";
import { HistoryBase as AbstractHistoryBase } from "../lib";

export class HistoryBase<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryBase<Value, Size, DataType> {
}

console.group(`HistoryBase`);
describe(`HistoryBase`, () => {
  let historyBase = new HistoryBase({size: 5 as number, value: 277 as number});

  beforeEach(() => {
    // Create a new instance before each test
    historyBase = new HistoryBase({size: 5 as number, value: 277 as number});
  });

  it(`Initial`, () => {
    expect(historyBase).toBeInstanceOf(HistoryBase);
    expect(historyBase).toBeInstanceOf(AbstractHistoryBase);
    expect(historyBase[Symbol.toStringTag]).toEqual('HistoryBase');
    expect(historyBase.current).toEqual(277);
  });

  it(`hasCurrent()`, () => {
    expect(historyBase.hasCurrent()).toBeTrue();
  });

  it(`hasCurrent()`, () => {
    expect(historyBase.hasCurrent()).toBeTrue();
  });

  it(`isEnabled()`, () => {
    expect(historyBase.isEnabled()).toBeTrue();
  });

  it(`pick()`, () => {
    expect(historyBase.pick('current')).toEqual([277]);
    expect(historyBase.pick('redo')).toEqual([]);
    expect(historyBase.pick('undo')).toEqual([]);
  });

  it(`set()`, () => {
    expect(historyBase.set(377).set(477).set(577).current).toEqual(577);
    expect(historyBase.pick('current')).toEqual([577]);
    expect(historyBase.pick('redo')).toEqual([]);
    expect(historyBase.pick('undo')).toEqual([277, 377, 477]);
  });

  it(`undo() and redo()`, () => {
    expect(historyBase.set(377).set(477).set(577).current).toEqual(577);
    // undo
    expect(historyBase.undo().current).toEqual(477);
    expect(historyBase.undo().current).toEqual(377);
    expect(historyBase.undo().current).toEqual(277);
    // redo
    expect(historyBase.redo().current).toEqual(377);
    expect(historyBase.redo().current).toEqual(477);
    expect(historyBase.redo().current).toEqual(577);
    expect(historyBase.redo().current).toEqual(577);
  });

  it(`redoAt() and onUndo()`, () => {
    historyBase.set(377).set(477).set(577).set(677).set(777).set(877).set(977);
    historyBase.onUndo((value) => {
      console.debug(`onUndo: ${value}`);
    });
    historyBase
      .undo() // 977
      .undo() // 877
      .undo() // 777
      .undo() // 677
      .undo(); // 577
    expect(historyBase.redoAt(0)).toEqual(577);
    expect(historyBase.redoAt(1)).toEqual(677);
    expect(historyBase.redoAt(4)).toEqual(977);
  });

  it(`undoAt() and onRedo() and nextRedo() and nextUndo() and firstRedo() and firstUndo()`, () => {
    historyBase.set(377).set(477).set(577).set(677).set(777).set(877).set(977);
    historyBase.onRedo((value) => {
      console.debug(`onRedo: ${value}`);
    });
    historyBase.undo() // 977
    expect(historyBase.current).toEqual(877);
    expect(historyBase.nextRedo()).toEqual(977);
    historyBase.undo() // 877
    expect(historyBase.current).toEqual(777);
    expect(historyBase.nextRedo()).toEqual(877);
    historyBase.undo() // 777
    expect(historyBase.current).toEqual(677);
    expect(historyBase.nextRedo()).toEqual(777);
    historyBase.undo() // 677
    expect(historyBase.current).toEqual(577);
    expect(historyBase.nextRedo()).toEqual(677);
    historyBase.undo() // 577
    expect(historyBase.current).toEqual(477);
    expect(historyBase.nextRedo()).toEqual(577);

    historyBase.redo() // 577
    expect(historyBase.current).toEqual(577);
    expect(historyBase.nextUndo()).toEqual(477);
    historyBase.redo() // 677
    expect(historyBase.current).toEqual(677);
    expect(historyBase.nextUndo()).toEqual(577);
    historyBase.redo() // 777
    expect(historyBase.current).toEqual(777);
    expect(historyBase.nextUndo()).toEqual(677);
    historyBase.redo() // 877
    expect(historyBase.current).toEqual(877);
    expect(historyBase.nextUndo()).toEqual(777);
    historyBase.redo(); // 977
    expect(historyBase.current).toEqual(977);
    expect(historyBase.nextUndo()).toEqual(877);

    console.debug(`undoAt: ${historyBase.undoAt(0)}`, historyBase.get().undo, historyBase.get());

    expect(historyBase.undoAt(0)).toEqual(477);
    expect(historyBase.undoAt(1)).toEqual(577);
    expect(historyBase.undoAt(4)).toEqual(877);  
  });

});
console.groupEnd();