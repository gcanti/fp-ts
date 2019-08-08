# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]
> - [Deprecation]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 2.0.5

- **Bug Fix**
  - fix `PipeableApply2C` definition (@gcanti)

# 2.0.4

- **Polish**
  - `ReaderTaskEither`
    - add missing `bracket` function (@mlegenhausen)

# 2.0.3

- **Bug Fix**
  - fix `sequenceT`, `sequenceS` implementations, closes #914 (@gcanti)

# 2.0.2

- **Bug Fix**
  - add `reduce` to `FoldableComposition2C1` (@anilanar)

# 2.0.1

- **Bug Fix**
  - fix `PipeableBifunctor` definition (@gcanti)
  - fix `chunksOf` implementation, #897 (@gcanti)

# 2.0.0

- **Breaking Change**
  - remove deprecated APIs (@gcanti)
  - remove classes (@gcanti)
  - remove all phantom fields (@gcanti)
