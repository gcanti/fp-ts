---
title: FAQ
permalink: /faq/
nav_order: 6
has_children: false
has_toc: false
---

# Frequently Asked Questions
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Data Types

### How can I handle errors with Tasks?

Not every async computation necessarily needs error handling, which is why [Task](../modules/Task.ts) is simply defined as `Task<A>`. If you do need to handle errors, you can use [TaskEither](../modules/TaskEither.ts) or variations of `Task` like `Task<Option<A>>` or `Task<Validation<L, A>>`.

## Where do I find …?

### Where do I find the `Maybe` data type?

`fp-ts` provides the [Option](../modules/Option.ts) data type, which is conceptually similar to the `Maybe` data type.

### Where do I find the liftA2, liftA3, … functions?

Use [sequenceT](../modules/Apply.ts.html#sequencet-function) and [sequenceS](../modules/Apply.ts.html#sequences-function) instead.

## Techniques

### Is it possible to serialize and deserialize an fp-ts type?

Yes, you can create an [io-ts](https://github.com/gcanti/io-ts) encoder/decoder for sending/receiving a data type like [Option](../modules/Option.ts) or [Either](../modules/Either.ts) over a network or exchange data with a web worker. Check out [io-ts-types](https://github.com/gcanti/io-ts-types) for this use-case.

Note that it is not possible to serialize data types that contain functions (like [IO](../modules/IO.ts) or [Task](../modules/Task.ts)).

### Is it possible to use tagless final with fp-ts?

Yes, read [Functional Design: Tagless Final](https://dev.to/gcanti/functional-design-tagless-final-332k) for an introduction. Also have a look at this code example: [fp-ts-to-the-max-II](https://gist.github.com/gcanti/453e5419fbcabe078d933ab21f0df8bf).

## Miscellaneous

### Does fp-ts provide Flow type definitions?

No, `fp-ts` does not provide official [Flow](https://flow.org/) type definitions.
