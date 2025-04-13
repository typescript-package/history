import { RedoHistory } from "../lib/base";

console.group(`RedoHistory`);

describe(`RedoHistory`, () => {
  let redoHistory = new RedoHistory(5 as number);
  console.debug(`redoHistory`, redoHistory);

  beforeEach(() => {
    redoHistory = new RedoHistory(5);
  });

  it(`add()`, () => {
    redoHistory.add('a').add('b').add('c').add('d');
    expect(redoHistory.get()).toEqual(['d', 'c', 'b', 'a']);

    redoHistory.add('e');
    expect(redoHistory.get()).toEqual(['e', 'd', 'c', 'b', 'a']);

    redoHistory.add('f');
    expect(redoHistory.get()).toEqual(['f', 'e', 'd', 'c', 'b']);
  });

  it(`setSize()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e').setSize(6);
    redoHistory.add('f');
    expect(redoHistory.get()).toEqual(['f', 'e', 'd', 'c', 'b', 'a']);
  });

  it(`clear() + isEmpty()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e').clear();
    expect(redoHistory.get()).toEqual([]);
  });

  it(`take()`, () => {
    const taken = redoHistory.add('a').add('b').add('c').add('d').add('e').take();
    expect(taken).toEqual('e');
    expect(redoHistory.get()).toEqual(['d', 'c', 'b', 'a']);
  });

  it(`first() newest() oldest() last() `, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(redoHistory.first()).toEqual('e');
    expect(redoHistory.newest()).toEqual('e');
    expect(redoHistory.oldest()).toEqual('a');
    expect(redoHistory.last()).toEqual('a');
  });

  it(`at()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(redoHistory.at(1)).toEqual('d');
  });

  it(`next()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(redoHistory.next()).toEqual('e');
  });

  it(`oldest()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(redoHistory.oldest()).toEqual('a');
  });

  it(`newest()`, () => {
    redoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(redoHistory.newest()).toEqual('e');
  });
});

console.groupEnd();
