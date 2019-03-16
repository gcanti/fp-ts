---
title: Introduction
permalink: /
nav_order: 1
has_children: true
has_toc: false
---

<img alt="fp-ts logo" src="./fp-ts-logo.png" style="display: block; width: 200px; margin-bottom: 2em;">

# Typed functional programming in TypeScript

fp-ts provides developers with popular patterns and reliable abstractions from typed functional languages in TypeScript.
{: .fs-6 .fw-300 }

[Get started](./introduction/core-concepts){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [Take the tutorial](./basics/){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Installation

To install the stable version:

```
npm install fp-ts
```

Make sure to always have a single version of `fp-ts` installed in your project. Multiple versions are known to cause `tsc` to hang during compilation. You can check the versions currently installed using `npm ls fp-ts` (make sure there's a single version and all the others are marked as `deduped`).

## TypeScript compatibility

The stable version is tested against **TypeScript 3.3.3**, but should run with TypeScript 2.8.0+ too.

- **Strictness** – This library is conceived, tested and is supposed to be consumed by TypeScript with the `strict` flag turned on.
- **Compatibility** – If you are running `< typescript@3.0.1` you have to polyfill the `unknown` type. You can use [unknown-ts](https://github.com/gcanti/unknown-ts) as a polyfill.
