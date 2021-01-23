# Do notation

**Cheatsheet**

| Haskell       | TypeScript                      |
| ------------- | ------------------------------- |
| `a <- action` | `bind('a', (scope) => action)`  |
| `_ <- action` | `chainFirst((scope) => action)` |
| `return ...`  | `map((scope) => ...)`           |

**Example**

Haskell

```Haskell
nameDo :: IO ()
nameDo = do putStrLn "What is your first name? "
            first <- getLine
            putStrLn "And your last name? "
            last <- getLine
            let full = first ++ " " ++ last
            putStrLn ("Pleased to meet you, " ++ full ++ "!")
```

TypeScript

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'

declare const putStrLn: (s: string) => T.Task<void>
declare const getLine: T.Task<string>

const nameDo: T.Task<void> = pipe(
  T.Do,
  T.chainFirst(() => putStrLn('What is your first name? ')),
  T.bind('first', () => getLine),
  T.chainFirst(() => putStrLn('And your last name? ')),
  T.bind('last', () => getLine),
  T.bind('full', ({ first, last }) => T.of(first + ' ' + last)),
  T.chain(({ full }) => putStrLn('Pleased to meet you, ' + full + '!'))
)
```
