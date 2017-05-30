import * as freeAp from 'fp-ts/lib/FreeAp'
import * as either from 'fp-ts/lib/Either'

// adapted from https://github.com/ethul/purescript-freeap/blob/master/test/Test/Control/Applicative/Free/Validation.purs

type Validator<A> = (s: string) => either.Either<string, A>

class Field<A = any> {
  readonly _A: A
  constructor(
    public readonly name: string,
    public readonly validator: Validator<A>
  ) {}
}

type Form<A> = freeAp.FreeAp<Field, A>

function field<A>(name: string, validator: Validator<A>): Form<A> {
  return freeAp.liftF<Field, A>(new Field(name, validator))
}

const nes = (name: string): Form<string> =>
  field<string>(name, either.fromPredicate<string, string>(s => s !== '', () => `${name}: Invalid NES`))

function fromString(s: string, message: string): either.Either<string, number> {
  const n = parseFloat(s)
  return isNaN(n) ? either.left<string, number>(message) : either.right<string, number>(n)
}

const int = (name: string): Form<number> =>
  field<number>(name, s =>
    fromString(s, `${name}: Invalid int`).chain(
      either.fromPredicate<string, number>(n => n % 1 === 0, () => `${name}: Invalid NES`))
  )

type User = {
  firstName: string,
  lastName: string,
  age: number
}

const user = (firstName: string) => (lastName: string) => (age: number) => ({ firstName, lastName, age })

type UserA = typeof user

const form: Form<User> = int('Age').ap(nes('Last name').ap(nes('First name').map(user)))

function runForm(first: string, last: string, age: string): either.Either<string, User> {
  function validate<A>(name: string, validator: Validator<A>): either.Either<string, A> {
    switch (name) {
      case 'First name' :
        return validator(first)
      case 'Last name' :
        return validator(last)
      case 'Age' :
        return validator(age)
    }
    throw new Error(`Unexpected field ${name}`)
  }
  return form.foldMap(either, <A>(x: Field<A>) => validate<A>(x.name, x.validator))
}

console.log(runForm('a', '', 'w')) // Left("Last name: Invalid NES")
console.log(runForm('a', 'b', 'w')) // Left("Age: Invalid int")
console.log(runForm('a', 'b', '1')) // Right({"firstName":"a","lastName":"b","age":1})
