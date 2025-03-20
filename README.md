
<a href="https://www.typescriptlang.org/">
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

A **TypeScript** package for tracking history of values.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - [`History`](#history)
  - [`HistoryAppend`](#historyappend)
  - [`HistoryCore`](#historycore)
  - [`HistoryPrepend`](#historyprepend)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

```bash
npm install @typescript-package/history
```

## Api

```typescript
import {
  History,
  HistoryAppend,
  HistoryCore,
  HistoryPrepend,
} from '@typescript-package/history';
```

## `History`

```typescript
import { History } from '@typescript-package/history';

// Initialize.
const history = new class History<Type, Size extends number = number> extends AbstractHistory<Type, Size>{}({value: 5, size: 5});

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

## `HistoryAppend`

```typescript
import { History } from '@typescript-package/history';
```

## `HistoryCore`

```typescript
import { History } from '@typescript-package/history';
```

## `HistoryPrepend`

```typescript
import { History } from '@typescript-package/history';
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
