import { sequenceS } from '../src/Apply'
import { HKT, Type, Type3, URIS, URIS3 } from '../src/HKT'
import { io, URI as IOURI } from '../src/IO'
import { Monad, Monad1, Monad3C } from '../src/Monad'
import * as RTE from '../src/ReaderTaskEither'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { identity } from 'fp-ts/lib/function'

// Adapted from https://tech.iheart.com/why-fp-its-the-composition-f585d17b01d3

const delay = <A>(millis: number, a: A): T.Task<A> => T.delay(millis, T.task.of(a))

//
// type classes
//

interface MonadUser<M> {
  validateUser: (token: string) => HKT<M, string>
  facebookToken: (uid: string) => HKT<M, string>
}

interface MonadFB<M> {
  findPost: (url: string) => HKT<M, string>
  sendLike: (fbToken: string, post: string) => HKT<M, boolean>
}

interface MonadApp<M> extends MonadUser<M>, MonadFB<M>, Monad<M> {}

//
// program
//

function likePost<M extends URIS3, U, L>(
  M: MonadApp3C<M, U, L>
): (token: string) => (url: string) => Type3<M, U, L, boolean>
function likePost<M extends URIS>(M: MonadApp1<M>): (token: string) => (url: string) => Type<M, boolean>
function likePost<M>(M: MonadApp<M>): (token: string) => (url: string) => HKT<M, boolean> {
  return token => url => {
    const mToken = M.chain(M.validateUser(token), uid => M.facebookToken(uid))
    const mPost = M.findPost(url)
    const mmResult = M.map(sequenceS(M)({ token: mToken, post: mPost }), ({ token, post }) => M.sendLike(token, post))
    return M.chain(mmResult, identity)
  }
}

//
// instances
//

interface MonadUser1<M extends URIS> {
  validateUser: (token: string) => Type<M, string>
  facebookToken: (uid: string) => Type<M, string>
}

interface MonadFB1<M extends URIS> {
  findPost: (url: string) => Type<M, string>
  sendLike: (fbToken: string, post: string) => Type<M, boolean>
}

interface MonadApp1<M extends URIS> extends MonadUser1<M>, MonadFB1<M>, Monad1<M> {}

// IO

const monadUserIO: MonadUser1<IOURI> = {
  validateUser: token => io.of(`string(${token})`),
  facebookToken: uid => io.of(`FBToken(${uid})`)
}

const monadFBIO: MonadFB1<IOURI> = {
  findPost: url => io.of(`FBPost(${url})`),
  sendLike: (token, post) => {
    return () => true
  }
}

const monadAppIO: MonadApp1<IOURI> = {
  ...(io as Monad1<IOURI>),
  ...monadUserIO,
  ...monadFBIO
}

// tslint:disable-next-line:no-console
console.log('IO', likePost(monadAppIO)('session123')('https://me.com/1')())
// => IO true

// Task

const monadUserTask: MonadUser1<T.URI> = {
  validateUser: token => delay(1000, `string(${token})`),
  facebookToken: uid => delay(500, `FBToken(${uid})`)
}

const monadFBTask: MonadFB1<T.URI> = {
  findPost: url => delay(2000, `FBPost(${url})`),
  sendLike: () => delay(1000, true)
}

const monadAppTask: MonadApp1<T.URI> = {
  ...T.task,
  ...monadUserTask,
  ...monadFBTask
}

// tslint:disable-next-line: no-floating-promises
likePost(monadAppTask)('session123')('https://me.com/1')()
  // tslint:disable-next-line:no-console
  .then(result => console.log('Task', result))
// => Task true

// ReaderTaskEither

interface MonadUser3C<M extends URIS3, U, L> {
  validateUser: (token: string) => Type3<M, U, L, string>
  facebookToken: (uid: string) => Type3<M, U, L, string>
}

interface MonadFB3C<M extends URIS3, U, L> {
  findPost: (url: string) => Type3<M, U, L, string>
  sendLike: (fbToken: string, post: string) => Type3<M, U, L, boolean>
}

interface MonadApp3C<M extends URIS3, U, L> extends MonadUser3C<M, U, L>, MonadFB3C<M, U, L>, Monad3C<M, U, L> {}

type Env = { error: boolean }

const monadUserReaderTaskEither: MonadUser3C<RTE.URI, Env, Error> = {
  validateUser: token => e =>
    e.error ? TE.fromLeft(new Error('validateUser error')) : TE.right(monadUserTask.validateUser(token)),
  facebookToken: uid => RTE.right(monadUserTask.facebookToken(uid))
}

const monadFBReaderTaskEither: MonadFB3C<RTE.URI, Env, Error> = {
  findPost: url => RTE.right(monadFBTask.findPost(url)),
  sendLike: (token, post) => RTE.right(monadFBTask.sendLike(token, post))
}

const monadAppReaderTaskEither: MonadApp3C<RTE.URI, Env, Error> = {
  ...((RTE.readerTaskEither as any) as Monad3C<RTE.URI, Env, Error>),
  ...monadUserReaderTaskEither,
  ...monadFBReaderTaskEither
}

const ma = likePost(monadAppReaderTaskEither)('session123')('https://me.com/1')

// tslint:disable-next-line: no-floating-promises
ma({ error: true })()
  // tslint:disable-next-line:no-console
  .then(result => console.log('ReaderTaskEither 2', result))
// => ReaderTaskEither 2 left(Error: validateUser error)

// tslint:disable-next-line: no-floating-promises
ma({ error: false })()
  // tslint:disable-next-line:no-console
  .then(result => console.log('ReaderTaskEither 1', result))
// => ReaderTaskEither 1 right(true)
