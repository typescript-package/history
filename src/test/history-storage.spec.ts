import { Data, DataCore } from "@typescript-package/data";
import { HistoryStorage as AbstractHistoryStorage } from "../lib";

export class HistoryStorage<
  Value,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryStorage<Value, DataType> {
  public override set(value: Value[]) {
    super.set(value);
    return this;
  }
}

console.group(`HistoryStorage`);
describe(`HistoryStorage`, () => {
  let historyStorage = new HistoryStorage(['a']);

  beforeEach(() => {
    historyStorage = new HistoryStorage(['a']);
  });

  it(`initial`, () => {
    expect(historyStorage.get()).toEqual(['a']);
    expect(historyStorage.length).toEqual(1);
    expect(historyStorage.isEmpty()).toBeFalse();
    expect(historyStorage.data.value).toEqual(['a']);
  });

  it(`set() get()`, () => {
    historyStorage.set(['b']);
    expect(historyStorage.get()).toEqual(['b']);
    historyStorage.set(['b', 'c', 'd']);
    expect(historyStorage.get()).toEqual(['b', 'c', 'd']);
    expect(historyStorage.length).toEqual(3);
  });

  it(`destroy()`, () => {
    historyStorage.destroy();
    expect(Object.hasOwn(historyStorage.data, 'value')).toBeFalse();
  });
});
console.groupEnd();
