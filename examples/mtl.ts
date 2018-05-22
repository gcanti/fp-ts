import { liftA2 } from '../src/Apply'
import { flatten } from '../src/Chain'
import { HKT, Type, Type3, URIS, URIS3 } from '../src/HKT'
//
// IO
//
import { IO, URI as IOURI, io } from '../src/IO'
import { Monad, Monad1, Monad3 } from '../src/Monad'
// => sending like with fbToken "FBToken(string(session123))" and post "FBPost(https://me.com/1)"
// => true
//
// Task
//
import { Task, URI as TaskURI, task } from '../src/Task'
// => string(session123) after 1.002
// => FBToken(string(session123)) after 1.503
// => FBPost(https://me.com/1) after 2.002
// => sending like with fbToken "FBToken(string(session123))" and post "FBPost(https://me.com/1)"
// => true after 3.004
// => true
//
// ReaderTaskEither
//
import { URI as ReaderTaskEitherURI, right, readerTaskEither } from '../src/ReaderTaskEither'

// Adapted from https://tech.iheart.com/why-fp-its-the-composition-f585d17b01d3

interface MonadUser<M> {
  validateUser: (token: string) => HKT<M, string>
  facebookToken: (uid: string) => HKT<M, string>
}

interface MonadUser1<M extends URIS> {
  validateUser: (token: string) => Type<M, string>
  facebookToken: (uid: string) => Type<M, string>
}

interface MonadFB<M> {
  findPost: (url: string) => HKT<M, string>
  sendLike: (fbToken: string) => (post: string) => HKT<M, boolean>
}

interface MonadFB1<M extends URIS> {
  findPost: (url: string) => Type<M, string>
  sendLike: (fbToken: string) => (post: string) => Type<M, boolean>
}

function likePost<M extends URIS3>(
  M: Monad3<M>,
  U: MonadUser<M>,
  F: MonadFB<M>
): <U, L>(token: string) => (url: string) => Type3<M, U, L, boolean>
function likePost<M extends URIS>(
  M: Monad1<M>,
  U: MonadUser<M>,
  F: MonadFB<M>
): (token: string) => (url: string) => Type<M, boolean>
function likePost<M>(M: Monad<M>, U: MonadUser<M>, F: MonadFB<M>): (token: string) => (url: string) => HKT<M, boolean> {
  return token => url => {
    const mToken = M.chain(U.validateUser(token), uid => U.facebookToken(uid))
    const mPost = F.findPost(url)
    const mmResult = liftA2(M)(F.sendLike)(mToken)(mPost)
    return flatten(M)(mmResult)
  }
}

const monadUserIO: MonadUser1<IOURI> = {
  validateUser: token => io.of(`string(${token})`),
  facebookToken: uid => io.of(`FBToken(${uid})`)
}

const monadFBIO: MonadFB1<IOURI> = {
  findPost: url => io.of(`FBPost(${url})`),
  sendLike: token => (post: string) => {
    return new IO(() => {
      console.log(`sending like with fbToken "${token}" and post "${post}"`)
      return true
    })
  }
}

console.log(likePost(io, monadUserIO, monadFBIO)('session123')('https://me.com/1').run())

const now = Date.now()
const delay = <A>(a: A) => (n: number): Task<A> =>
  new Task(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          console.log(`${a} after ${(Date.now() - now) / 1000}`)
          resolve(a)
        }, n)
      })
  )

const monadUserTask: MonadUser1<TaskURI> = {
  validateUser: token => delay(`string(${token})`)(1000),
  facebookToken: uid => delay(`FBToken(${uid})`)(500)
}

const monadFBTask: MonadFB1<TaskURI> = {
  findPost: url => delay(`FBPost(${url})`)(2000),
  sendLike: token => (post: string) => {
    console.log(`sending like with fbToken "${token}" and post "${post}"`)
    return delay(true)(1000)
  }
}

likePost(task, monadUserTask, monadFBTask)('session123')('https://me.com/1')
  .run()
  .then(result => console.log(result))

const monadUserReaderTaskEither: MonadUser<ReaderTaskEitherURI> = {
  validateUser: token => right(monadUserTask.validateUser(token)),
  facebookToken: uid => right(monadUserTask.facebookToken(uid))
}

const monadFBReaderTaskEither: MonadFB<ReaderTaskEitherURI> = {
  findPost: url => right(monadFBTask.findPost(url)),
  sendLike: token => (post: string) => right(monadFBTask.sendLike(token)(post))
}

type Env = void
type Error = void
likePost(readerTaskEither, monadUserReaderTaskEither, monadFBReaderTaskEither)<Env, Error>('session123')(
  'https://me.com/1'
)
  .run(undefined)
  .then(result => console.log(result))
/*
string(session123) after 1.238
FBToken(string(session123)) after 1.742
FBPost(https://me.com/1) after 2.236
sending like with fbToken "FBToken(string(session123))" and post "FBPost(https://me.com/1)"
true after 3.237
right(true)
*/
