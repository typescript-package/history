<img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="The typescript package enhances the development of typescript-based applications by providing well-structured, reusable, easy-to-use packages."
  />
</a>

## typescript-package/history

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A **lightweight TypeScript** package for tracking history of values.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - [`History`](#history)
  - Base
    - [`CurrentHistory`](#currenthistory)
    - [`HistoryBase`](#historybase)
    - [`RedoHistory`](#redohistory)
    - [`UndoHistory`](#undohistory)
  - Core
    - [`HistoryAppend`](#historyappend)
    - [`HistoryCore`](#historycore)
    - [`HistoryCurrent`](#historycurrent)
    - [`HistoryPrepend`](#historyprepend)
    - [`HistoryStorage`](#historystorage)
  - Type
    - [`HistoryCoreConstructor`](#historycoreconstructor)
    - [`HistoryCurrentConstructor`](#historycurrentconstructor)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

### 1. Install peer dependencies

```bash
npm install @typescript-package/data --save-peer
```

### 2. Install package

```bash
npm install @typescript-package/history --save-peer
```

## Api

```typescript
import {
  History,
  // Base.
  HistoryBase,
  // Core (Abstract).
  HistoryAppend,
  HistoryCore,
  HistoryCurrent,
  HistoryPrepend,
  HistoryStorage,
  // Type.
  HistoryCoreConstructor,
  HistoryCurrentConstructor,
} from '@typescript-package/history';
```

### `History`

The class to manage the value changes.

```typescript
import { History } from '@typescript-package/history';

// Initialize.
export const history = new History({value: 5, size: 5});

console.group(`History README.md`);

console.log(`set 10 - 35`);
history.set(10).set(15).set(20).set(25).set(30).set(35);

// [10, 15, 20, 25, 30], 35, []
console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

// undo 35
console.log(`undo`, 35);
history.undo();

// [10, 15, 20, 25], 30, [35]
console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); 

// undo 30
console.log(`undo`, 30);
history.undo();

// [10, 15, 20], 25, [30, 35]
console.log(history.undoHistory.get(), history.current, history.redoHistory.get()); 

// undo 25
console.log(`undo`, 25);
history.undo();

// [10, 15], 20, [25, 30, 35]
console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

// undo 20
console.log(`undo`, 20);
history.undo();

// [10], 15, [20, 25, 30, 35]
console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

// redo 20
console.log(`redo`, 20);
history.redo();

// [10, 15], 20, [25, 30, 35]
console.log(history.undoHistory.get(), history.current, history.redoHistory.get());

console.groupEnd();
```

An example of usage data type.

```typescript
import { History as BaseHistory } from '@typescript-package/history';
import { WeakData } from '@typescript-package/data';

// Initialize.
export const history = new class History<Type, Size extends number = number>
  extends BaseHistory<Type, Size, WeakData<readonly Type[]>>{}({value: 5, size: 5}, WeakData);

// Add to the history.
history.set(10).set(15).set(20);

// Check whether it is stored under the `WeakData`.
console.log(`history.undoHistory.data`, WeakData.get(history.undoHistory.data)); // Output: [5, 10, 15]

```

### Base

### `CurrentHistory`

```typescript
import { CurrentHistory } from '@typescript-package/history';
```

### `HistoryBase`

The base `abstract` class to manage history.

```typescript
import { HistoryBase } from '@typescript-package/history';
```

### `RedoHistory`

```typescript
import { RedoHistory } from '@typescript-package/history';
```

### `UndoHistory`

```typescript
import { UndoHistory } from '@typescript-package/history';
```

### Core

### `HistoryAppend`

```typescript
import { HistoryAppend as AbstractHistoryAppend } from '@typescript-package/history';

// Initialize.
export const historyAppend = new class HistoryAppend<Type = number, Size extends number = number>
  extends AbstractHistoryAppend<Type, Size>{}();

// Add to the history.
console.log(`add`, 127, 227);
historyAppend.add(127).add(227);
console.log(historyAppend.get()); // [127, 227]

// Peek.
console.log(`last()`, historyAppend.last()); // Outputs: 127
console.log(`next()`, historyAppend.next()); // Outputs: 227

// Take from the history.
console.log(historyAppend.take()); // Outputs: 227
console.log(historyAppend.get()); // Outputs: [127]
```

### `HistoryCore`

The core class for history append and prepend.

### `HistoryCurrent`

The class represents the current value of the history.

```typescript
import { HistoryCurrent as AbstractHistoryCurrent } from '@typescript-package/history';

export class HistoryCurrent<
  Value,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends AbstractHistoryCurrent<Value, DataType> {
  public override get value() {
    return super.data.value[0]
  }
  public has() {
    return super.data.value.length > 0;
  }
  public override set(value: readonly Value[]) {
    super.set(value);
    return this;
  }
  public update(value: Value) {
    super.set([value]);
    return this;
  }
}

const historyCurrent = new HistoryCurrent({value: 'a'});
console.log(`get()`, historyCurrent.get()); // ['a']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
console.log(`data.value`, historyCurrent.data.value); // ['a']
historyCurrent.set(['b']);
console.log(`get()`, historyCurrent.get()); // ['b']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.set(['b', 'c', 'd']);
console.log(`get()`, historyCurrent.get()); // ['b', 'c', 'd']
console.log(`length`, historyCurrent.length); // 3
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.update('e');
console.log(`get()`, historyCurrent.get()); // ['e']
console.log(`length`, historyCurrent.length); // 1
console.log(`isEmpty()`, historyCurrent.isEmpty()); // false
historyCurrent.destroy();

```

### `HistoryPrepend`

```typescript
import { HistoryPrepend as AbstractHistoryPrepend } from '@typescript-package/history';

// Initialize.
export const historyPrepend = new class HistoryPrepend<Type = number, Size extends number = number>
  extends AbstractHistoryPrepend<Type, Size>{}();

// Add to the history.
console.log(`add`, 127, 327, 227);
historyPrepend.add(127).add(327).add(227);
console.log(historyPrepend.get()); // [227, 327, 127]

// Peek.
console.log(`last()`, historyPrepend.last()); // Outputs: 127
console.log(`next()`, historyPrepend.next()); // Outputs: 227

// Take from the history.
console.log(historyPrepend.take()); // 227
console.log(historyPrepend.get()); // [327, 127]
```

### `HistoryStorage`

The history storage of specified data.

```typescript
import { HistoryStorage as AbstractHistoryStorage } from '@typescript-package/history';

export class HistoryStorage<
  Value,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>
> extends AbstractHistoryStorage<Value, DataType> {
  public override set(value: readonly Value[]) {
    super.set(value);
    return this;
  }
}

const historyStorage = new HistoryStorage(['a']);
console.log(historyStorage.get()); // ['a']
console.log(historyStorage.length); // 1
console.log(historyStorage.isEmpty()); // false
console.log(historyStorage.data.value); // ['a']
historyStorage.set(['b']);
console.log(historyStorage.get()); // ['b']
historyStorage.set(['b', 'c', 'd']);
console.log(historyStorage.get()); // ['b', 'c', 'd']
console.log(historyStorage.length); // 3
historyStorage.destroy();
console.log(Object.hasOwn(historyStorage.data, 'value')); // false

```

### Type

### `HistoryCoreConstructor`

```typescript
import { HistoryCoreConstructor } from '@typescript-package/history';
```

### `HistoryCurrentConstructor`

```typescript
import { HistoryCurrentConstructor } from '@typescript-package/history';
```

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)

Thanks for your support!

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

## Packages

- **[@typescript-package/affix](https://github.com/typescript-package/affix)**: A **lightweight TypeScript** library for the affix - prefix and suffix.
- **[@typescript-package/are](https://github.com/typescript-package/are)**: Type-safe `are` checkers for validating value types in TypeScript.
- **[@typescript-package/data](https://github.com/typescript-package/data)**: A **lightweight TypeScript** library for basic data management.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **lightweight TypeScript** library for property descriptor.
- **[@typescript-package/guard](https://github.com/typescript-package/guard)**: Type-safe guards for guarding the value types in TypeScript.c
- **[@typescript-package/history](https://github.com/typescript-package/history)**: A **TypeScript** package for tracking history of values.
- **[@typescript-package/is](https://github.com/typescript-package/is)**: Type-safe is checkers for validating value types in TypeScript.
- **[@typescript-package/name](https://github.com/typescript-package/name)**: A **lightweight TypeScript** library for the name with prefix and suffix.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **lightweight TypeScript** package with features to handle object properties.
- **[@typescript-package/queue](https://github.com/typescript-package/queue)**: A **lightweight TypeScript** library for managing various queue and stack structures.
- **[@typescript-package/range](https://github.com/typescript-package/range)**: A **lightweight TypeScript** library for managing various types of ranges.
- **[@typescript-package/regexp](https://github.com/typescript-package/regexp)**: A **lightweight TypeScript** library for **RegExp**.
- **[@typescript-package/state](https://github.com/typescript-package/state)**: Simple state management for different types in **TypeScript**.
- **[@typescript-package/type](https://github.com/typescript-package/type)**: Utility types to enhance and simplify **TypeScript** development.
- **[@typescript-package/wrapper](https://github.com/typescript-package/wrapper)**: A **lightweight TypeScript** library to wrap the text with the opening and closing chars.

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/history
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/history
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/history
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/history
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/history/issues
  [typescript-package-forks]: https://github.com/typescript-package/history/network
  [typescript-package-license]: https://github.com/typescript-package/history/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/history/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fhistory.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fhistory

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
