# Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a high state of flux, you're at risk of it changing without notice.

# 0.2

- **Breaking Change**
  - complete refactoring: new technique to get higher kinded types and typeclasses

# 0.1.1

- **New Feature**
  - add support for fantasy-land
- **Breaking Change**
  - complete refactoring
  - remove `data` module
  - remove `newtype` module

# 0.0.4

- **Bug Fix**
  - fix `compose` definition for 5 or more functions (@bumbleblym)

# 0.0.3

- **New Feature**
  - make Array<T> a HKT and deprecate `to`,`from` helper functions, fix #5 (@gcanti)
  - add `Traced` comonad (@bumbleblym)
  - add `getOrElse` method to `Option` (@gcanti)
  - add NonEmptyArray, fix #12 (@gcanti)
- **Polish**
  - add tslint
- **Bug Fix**
  - fix `State` definition (@gcanti)


# 0.0.2

- **Bug Fix**
  - fix `ChainRec` definition (@gcanti)

# 0.0.1

Initial release

