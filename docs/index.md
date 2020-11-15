---
title: Introduction
permalink: /
nav_order: 1
has_children: false
has_toc: false
---

<img alt="fp-ts logo" src="./fp-ts-logo.png" style="display: block; width: 200px; margin-bottom: 2em;">

# Typed functional programming in TypeScript

`fp-ts` provides developers with popular patterns and reliable abstractions from typed functional languages in TypeScript.
{: .fs-6 .fw-300 }

**Disclaimer**. Teaching functional programming is out of scope of this project, so the documentation assumes you already know what FP is.

## Core Concepts

The goal of `fp-ts` is to empower developers to write pure FP apps and libraries built atop higher order abstractions. It includes the most popular data types, type classes, and abstractions from languages like [Haskell](https://haskell-lang.org), [PureScript](http://www.purescript.org), and [Scala](https://www.scala-lang.org/).

## Functions

Functional programming is all about pure functions and how to compose them into bigger structures. `fp-ts` provides a few general [functions](./modules/function.ts.html) to support you with composition, constant functions, and more.

## Data Types

Data types are the practical part of `fp-ts`: you can instantiate them with your data to gain properties and functionality that are useful for solving a specific need. Because data types all share common interfaces (through [type classes](#type-classes)), once you learn how to use one data type, you can apply the same concepts to the others.

Many functions in `fp-ts` use [ad hoc polymorphism](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism), meaning that they have a single implementation that can deal with arguments of different types. To make this work, it is often necessary to provide a data type _instance_ that provides functionality that is specific to the data type.

**Note**. Data types are not stack safe and there is no trampolining implementation. But for traversing and sequencing lists there is a stack safe and optimized version in each data types.

## Type Classes

Type classes provide the theoretical underpinnings of `fp-ts`: they describe what you can do with your data. To guarantee that they can be safely composed, they are built on laws rooted in abstract algebra and [category theory](https://en.wikipedia.org/wiki/Category_theory).

## Higher Kinded Types

A distinctive feature of `fp-ts` with respect to other functional libraries is its implementation of [Higher Kinded Types](<https://en.wikipedia.org/wiki/Kind_(type_theory)>), which TypeScript doesn't support natively. The idea for emulating higher kinded types in TypeScript is based on [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf).
