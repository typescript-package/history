import { UndoHistory } from "../lib/base";

console.group(`UndoHistory`);

describe(`UndoHistory`, () => {
  let undoHistory = new UndoHistory(5 as number);
  console.debug(`undoHistory`, undoHistory);

  beforeEach(() => {
    undoHistory = new UndoHistory(5);
  });

  it(`add()`, () => {
    undoHistory.add('a').add('b').add('c').add('d');
    expect(undoHistory.get()).toEqual(['a', 'b', 'c', 'd']);

    undoHistory.add('e');
    expect(undoHistory.get()).toEqual(['a', 'b', 'c', 'd', 'e']);

    undoHistory.add('f');
    expect(undoHistory.get()).toEqual(['b', 'c', 'd', 'e', 'f']);
  });

  it(`setSize()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e').setSize(6);
    undoHistory.add('f');
    expect(undoHistory.get()).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it(`clear() + isEmpty()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e').clear();
    expect(undoHistory.get()).toEqual([]);
  });

  it(`take()`, () => {
    const taken = undoHistory.add('a').add('b').add('c').add('d').add('e').take();
    expect(taken).toEqual('e');
    expect(undoHistory.get()).toEqual(['a', 'b', 'c', 'd']);
  });

  it(`first() newest() oldest() last() `, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(undoHistory.first()).toEqual('a');
    expect(undoHistory.newest()).toEqual('e');
    expect(undoHistory.oldest()).toEqual('a');
    expect(undoHistory.last()).toEqual('e');
  });

  it(`at()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(undoHistory.at(1)).toEqual('b');
  });

  it(`next()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(undoHistory.next()).toEqual('e');
  });

  it(`oldest()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(undoHistory.oldest()).toEqual('a');
  });

  it(`newest()`, () => {
    undoHistory.add('a').add('b').add('c').add('d').add('e');
    expect(undoHistory.newest()).toEqual('e');
  });
});

console.groupEnd();
