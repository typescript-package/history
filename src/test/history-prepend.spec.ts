import { Data, DataCore } from "@typescript-package/data";
import { HistoryPrepend as AbstractHistoryPrepend } from "../lib";

// Define the concrete class extending the abstract one
export class HistoryPrepend<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryPrepend<Value, Size, DataType> {};

console.group(`HistoryPrepend`);

describe('HistoryPrepend', () => {
  // Use type alias for better readability in tests
  type StringHistoryPrepend = HistoryPrepend<string>;

  // Declare the variable to hold the instance for each test
  let historyPrepend: StringHistoryPrepend;
  const defaultTestSize = 3; // Define a default size for most tests

  beforeEach(() => {
    // Create a new instance with a default size before each test
    historyPrepend = new HistoryPrepend<string>(defaultTestSize);
  });

  it('should create an instance with the default static size when no size is provided', () => {
    // For this specific test, we need an instance with the *default* size, not defaultTestSize
    const defaultSizedHistory = new HistoryPrepend<string>();
    expect(defaultSizedHistory).toBeInstanceOf(HistoryPrepend);
    // Access protected/private members via string index for testing purposes ONLY
    // Ensure HistoryPrepend.size is accessible or test via behavior if not
    expect(defaultSizedHistory['size']).toBe(HistoryPrepend.size); // Assuming static size is 10
  });

  it('should create an instance with a custom size', () => {
    const customSize = 5;
    // For this specific test, we need an instance with a *custom* size
    const customSizedHistory = new HistoryPrepend<string>(customSize);
    expect(customSizedHistory).toBeInstanceOf(HistoryPrepend);
    expect(customSizedHistory['size']).toBe(customSize);
  });

  it('should clear the added by using `clear()` method', () => {
    historyPrepend.add('a').add('b').add('c').clear();
    // Access protected/private members via string index for testing purposes ONLY
    expect(historyPrepend['history']).toEqual([]);
    expect(historyPrepend['history'].length).toBe(0);
  });

  it('should destroy by using `destroy()`', () => {
    historyPrepend.add('a').add('b').add('c').destroy();
    // Access protected/private members via string index for testing purposes ONLY
    expect(Object.hasOwn(historyPrepend['data'], 'value')).toBeFalse();
  });

  it('should add values to the history', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    // Access protected/private members via string index for testing purposes ONLY
    expect(historyPrepend['history']).toEqual(['c', 'b', 'a']);
  });

  it('should maintain the specified size (FIFO) when adding more items than capacity', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    historyPrepend.add('d'); // This should push 'a' out
    expect(historyPrepend['history']).toEqual(['d', 'c', 'b']);
  });

   it('should not add items if size is 0', () => {
    const zeroSizeHistory = new HistoryPrepend<string>(0);
    zeroSizeHistory.add('a');
    expect(zeroSizeHistory['history']).toEqual([]);
   });

  it('should return the newest value (last added)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    expect(historyPrepend.newest()).toBe('c');
  });

  it('should return undefined for `newest()` when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyPrepend.newest()).toBeUndefined();
  });

  it('should return the next by using `next()` value to be removed (which is the newest/last for LIFO take)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    // next() reflects the item that take() would remove, which is the last one added
    expect(historyPrepend.next()).toBe('c');
  });

  it('should return undefined for `next()` when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyPrepend.next()).toBeUndefined();
  });

  it('should return the oldest value by using `last()` (first added)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    expect(historyPrepend.oldest()).toBe('a');
    // Add another item to ensure oldest shifts correctly
    historyPrepend.add('d');
    expect(historyPrepend.oldest()).toBe('b');
    expect(historyPrepend.last()).toBe('b');
  });

  it('should return the newest value by using `first()` (last added)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    expect(historyPrepend.newest()).toBe('c');
    // Add another item to ensure newest shifts correctly
    historyPrepend.add('d');
    expect(historyPrepend.oldest()).toBe('b');
    expect(historyPrepend.first()).toBe('d');
  });


  it('should return undefined for `oldest()` when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyPrepend.oldest()).toBeUndefined();
  });

  it('should take (remove and return) the last value (LIFO)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyPrepend.add('a').add('b').add('c');
    const taken = historyPrepend.take();
    expect(taken).toBe('c');
    expect(historyPrepend['history']).toEqual(['b', 'a']);
    const nextTaken = historyPrepend.take();
    expect(nextTaken).toBe('b');
    expect(historyPrepend['history']).toEqual(['a']);
  });

  it('should return undefined when taking from an empty history', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    const taken = historyPrepend.take();
    expect(taken).toBeUndefined();
    expect(historyPrepend['history']).toEqual([]);
  });

  it('should have the correct toStringTag', () => {
    // Uses the instance created in beforeEach (size 3)
    // This assumes the toStringTag getter is defined in AbstractHistoryPrepend or HistoryPrepend
    expect(Object.prototype.toString.call(historyPrepend)).toBe(`[object HistoryPrepend]`);
  });
});
console.groupEnd();
