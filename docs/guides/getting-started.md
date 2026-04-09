---
title: Getting Started
parent: Guides
nav_order: 0
---

# Getting Started

This guide walks you through installing `fp-ts` and writing your first program.

## Installation

```bash
# npm
npm install fp-ts

# yarn
yarn add fp-ts

# pnpm
pnpm add fp-ts
```

`fp-ts` is a pure TypeScript library with no runtime dependencies.

## TypeScript Configuration

`fp-ts` requires TypeScript's `strict` mode to be enabled. Without it, type inference for many combinators will not work correctly.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Your First Program

Here is a small example using `Option` to handle a value that might not exist:

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

const inverse = (n: number): O.Option<number> =>
  n === 0 ? O.none : O.some(1 / n)

const result = pipe(
  inverse(2),
  O.map((n) => n * 100),
  O.getOrElse(() => 0)
)

console.log(result) // 50
```

`Option` represents a value that is either present (`some`) or absent (`none`). Instead of throwing exceptions or returning `null`, you model the absence explicitly and handle it with combinators like `map`, `fold`, and `getOrElse`.

## Import Style

`fp-ts` modules can be imported individually to keep bundle size small:

```ts
// Import a specific module
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

// Or import everything (not recommended for production)
import * as fp from 'fp-ts'
```

## Next Steps

- Browse the [API Reference](../modules) for available modules
- Read the [Code Conventions](./code-conventions.html) to understand `fp-ts` patterns
- Explore [Learning Resources](../learning-resources.html) for tutorials and articles
