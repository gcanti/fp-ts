import * as RA from '../../src/ReadonlyArray'
import * as E from '../../src/Either'
import * as _ from '../../src/Traversable'
import * as TE from '../../src/TaskEither'

//
// traverse
//

// $ExpectType <A, FE, B>(f: (a: A) => TaskEither<FE, B>) => <GE>(tga: readonly Either<GE, A>[]) => TaskEither<FE, readonly Either<GE, B>[]>
_.traverse(RA.Traversable, E.Traversable)(TE.ApplicativePar)
