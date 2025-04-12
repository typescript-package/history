import { CurrentHistory } from "../lib/base";

console.group(`CurrentHistory`);

describe(`CurrentHistory`, () => {
  let currentHistory = new CurrentHistory({value: 27});

  beforeEach(() => {
    currentHistory = new CurrentHistory({value: 27});
  });

  it(`has()`, () => {
    expect(new CurrentHistory().has()).toBeFalse();
    expect(new CurrentHistory({}).has()).toBeFalse();
    expect(new CurrentHistory({value: 27}).has()).toBeTrue();
    expect(new CurrentHistory({value: undefined}).has()).toBeTrue();
  });


  it(`value`, () => {
    expect(currentHistory.value).toEqual(27);
    expect(currentHistory.data.value).toEqual([27]);
  });

  it(`update()`, () => {
    currentHistory.update(34);
    expect(currentHistory.value).toEqual(34);
    expect(currentHistory.data.value).toEqual([34]);
  });
});

console.groupEnd();
