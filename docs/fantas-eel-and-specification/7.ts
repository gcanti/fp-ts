//
// Code for http://www.tomharding.me/2017/04/03/fantas-eel-and-specification-7/
//

export class Predicate<A> {
  constructor(readonly run: (a: A) => boolean) {}
  static empty = () => new Predicate(() => true)
  contramap<B>(f: (b: B) => A): Predicate<B> {
    return new Predicate(b => this.run(f(b)))
  }
  concat(that: Predicate<A>): Predicate<A> {
    return new Predicate(a => this.run(a) && that.run(a))
  }
}

export const isEven = new Predicate((x: number) => x % 2 === 0)

export const lengthIsEven = isEven.contramap((x: string) => x.length)

export class ToString<A> {
  constructor(readonly run: (a: A) => string) {}
  contramap<B>(f: (b: B) => A): ToString<B> {
    return new ToString(b => this.run(f(b)))
  }
}

// Convert an int to a string
export const intToString = new ToString((x: number) => 'int(' + x + ')').contramap((x: number) => x | 0)

// Convert an array of strings to a string
export const stringArrayToString = new ToString((x: string) => '[ ' + x + ' ]').contramap((x: Array<string>) =>
  x.join(', ')
)

// Given a ToString instance for a type,
// convert an array of a type to a string
export const arrayToString = <A>(t: ToString<A>): ToString<Array<A>> => stringArrayToString.contramap(x => x.map(t.run))

// Convert an integer array to a string
export const intsToString = arrayToString(intToString)

// Aaand they compose! 2D int array:
export const matrixToString = arrayToString(intsToString)

console.log(matrixToString.run([[1, 3, 4]]))
// => [ [ int(1), int(3), int(4) ] ]

export class Equivalence<A> {
  constructor(readonly run: (x: A, y: A) => boolean) {}
  static empty = () => new Equivalence(() => true)
  contramap<B>(f: (b: B) => A): Equivalence<B> {
    return new Equivalence((x, y) => this.run(f(x), f(y)))
  }
  concat(that: Equivalence<A>): Equivalence<A> {
    return new Equivalence((x, y) => this.run(x, y) && that.run(x, y))
  }
}

// Do a case-insensitive equivalence check
export const searchCheck =
  // Basic equivalence
  new Equivalence((x, y) => x === y)
    // Remove symbols
    .contramap((x: string) => x.replace(/\W+/, ''))
    // Lowercase alpha
    .contramap((x: string) => x.toLowerCase())

// And some tests...
console.log(searchCheck.run('Hello', 'HEllO!')) // => true
console.log(searchCheck.run('world', 'werld')) // => false
