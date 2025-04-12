import { Data, DataCore } from "@typescript-package/data";
import { HistoryAppend as AbstractHistoryAppend } from "../lib";

// Define the concrete class extending the abstract one
export class HistoryAppend<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends AbstractHistoryAppend<Value, Size, DataType> {};

console.group(`HistoryAppend`);

describe('HistoryAppend', () => {
  // Use type alias for better readability in tests
  type StringHistoryAppend = HistoryAppend<string>;

  // Declare the variable to hold the instance for each test
  let historyAppend: StringHistoryAppend;
  const defaultTestSize = 3; // Define a default size for most tests

  beforeEach(() => {
    // Create a new instance with a default size before each test
    historyAppend = new HistoryAppend<string>(defaultTestSize);
  });

  it('should create an instance with the default static size when no size is provided', () => {
    // For this specific test, we need an instance with the *default* size, not defaultTestSize
    const defaultSizedHistory = new HistoryAppend<string>();
    expect(defaultSizedHistory).toBeInstanceOf(HistoryAppend);
    // Access protected/private members via string index for testing purposes ONLY
    // Ensure HistoryAppend.size is accessible or test via behavior if not
    expect(defaultSizedHistory['size']).toBe(HistoryAppend.size); // Assuming static size is 10
  });

  it('should create an instance with a custom size', () => {
    const customSize = 5;
    // For this specific test, we need an instance with a *custom* size
    const customSizedHistory = new HistoryAppend<string>(customSize);
    expect(customSizedHistory).toBeInstanceOf(HistoryAppend);
    expect(customSizedHistory['size']).toBe(customSize);
  });

  it('should add values to the history', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    // Access protected/private members via string index for testing purposes ONLY
    expect(historyAppend['history']).toEqual(['a', 'b', 'c']); // Assuming history is a Data instance with toArray()
  });

  it('should clear the added by using `clear()` method', () => {
    historyAppend.add('a').add('b').add('c').clear();
    // Access protected/private members via string index for testing purposes ONLY
    expect(historyAppend['history']).toEqual([]);
    expect(historyAppend['history'].length).toBe(0);
  });

  it('should destroy by using `destroy()`', () => {
    historyAppend.add('a').add('b').add('c').destroy();
    // Access protected/private members via string index for testing purposes ONLY
    expect(Object.hasOwn(historyAppend['data'], 'value')).toBeFalse();
  });

  it('should maintain the specified size (FIFO) when adding more items than capacity', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    historyAppend.add('d'); // This should push 'a' out
    expect(historyAppend['history']).toEqual(['b', 'c', 'd']);
  });

   it('should not add items if size is 0', () => {
    const zeroSizeHistory = new HistoryAppend<string>(0);
    zeroSizeHistory.add('a');
    expect(zeroSizeHistory['history']).toEqual([]);
   });

  it('should return the newest value (last added)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    expect(historyAppend.newest()).toBe('c');
  });

  it('should return undefined for newest() when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyAppend.newest()).toBeUndefined();
  });

  it('should return the next value to be removed (which is the newest/last for LIFO take)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    // next() reflects the item that take() would remove, which is the last one added
    expect(historyAppend.next()).toBe('c');
  });

  it('should return undefined for next() when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyAppend.next()).toBeUndefined();
  });

  it('should return the oldest value (first added)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    expect(historyAppend.oldest()).toBe('a');
    // Add another item to ensure oldest shifts correctly
    historyAppend.add('d');
    expect(historyAppend.oldest()).toBe('b');
  });

  it('should return undefined for oldest() when history is empty', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    expect(historyAppend.oldest()).toBeUndefined();
  });

  it('should take (remove and return) the last value (LIFO)', () => {
    // Uses the instance created in beforeEach (size 3)
    historyAppend.add('a').add('b').add('c');
    const taken = historyAppend.take();
    expect(taken).toBe('c');
    expect(historyAppend['history']).toEqual(['a', 'b']);
    const nextTaken = historyAppend.take();
    expect(nextTaken).toBe('b');
    expect(historyAppend['history']).toEqual(['a']);
  });

  it('should return undefined when taking from an empty history', () => {
    // Uses the instance created in beforeEach (size 3), which is initially empty
    const taken = historyAppend.take();
    expect(taken).toBeUndefined();
    expect(historyAppend['history']).toEqual([]);
  });

  it('should have the correct toStringTag', () => {
    // Uses the instance created in beforeEach (size 3)
    // This assumes the toStringTag getter is defined in AbstractHistoryAppend or HistoryAppend
    expect(Object.prototype.toString.call(historyAppend)).toBe(`[object HistoryAppend]`);
  });
});
console.groupEnd();
