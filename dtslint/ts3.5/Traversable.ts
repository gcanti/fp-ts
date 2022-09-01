import * as RA from '../../src/ReadonlyArray'
import * as E from '../../src/Either'
import * as _ from '../../src/Traversable'
import * as TE from '../../src/TaskEither'

//
// traversable
//

// $ExpectType <A, FE, B>(f: (a: A) => TaskEither<FE, B>) => <GE>(tga: readonly Either<GE, A>[]) => TaskEither<FE, readonly Either<GE, B>[]>
_.traverse(RA.Traversable, E.Traversable)(TE.ApplicativePar)

//
// traversable
//

// $ExpectType <GE, FE, A>(tgfa: readonly Either<GE, TaskEither<FE, A>>[]) => TaskEither<FE, readonly Either<GE, A>[]>
_.sequence(RA.Traversable, E.Traversable)(TE.ApplicativePar)
