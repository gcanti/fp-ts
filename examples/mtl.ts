import { Monad } from 'fp-ts/lib/Monad'
import { HKT, URIS, Type } from 'fp-ts/lib/HKT'
import { liftA2 } from 'fp-ts/lib/Apply'
import { flatten } from 'fp-ts/lib/Chain'

// Adapted from https://tech.iheart.com/why-fp-its-the-composition-f585d17b01d3

interface MonadUser<M> {
  validateUser: (token: string) => HKT<M, string>
  facebookToken: (uid: string) => HKT<M, string>
}

interface MonadFB<M> {
  findPost: (url: string) => HKT<M, string>
  sendLike: (fbToken: string) => (post: string) => HKT<M, boolean>
}

function likePost<M extends URIS>(
  M: Monad<M>,
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

//
// IO
//

import { URI as IOURI, io, IO } from 'fp-ts/lib/IO'

const monadUserIO: MonadUser<IOURI> = {
  validateUser: token => io.of(`string(${token})`),
  facebookToken: uid => io.of(`FBToken(${uid})`)
}

const monadFBIO: MonadFB<IOURI> = {
  findPost: url => io.of(`FBPost(${url})`),
  sendLike: token => (post: string) => {
    return new IO(() => {
      console.log(`sending like with fbToken "${token}" and post "${post}"`)
      return true
    })
  }
}

console.log(likePost(io, monadUserIO, monadFBIO)('session123')('https://me.com/1').run())
// => sending like with fbToken "FBToken(string(session123))" and post "FBPost(https://me.com/1)"
// => true

//
// Task
//

import { URI as TaskURI, task, Task } from 'fp-ts/lib/Task'

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

const monadUserTask: MonadUser<TaskURI> = {
  validateUser: token => delay(`string(${token})`)(1000),
  facebookToken: uid => delay(`FBToken(${uid})`)(500)
}

const monadFBTask: MonadFB<TaskURI> = {
  findPost: url => delay(`FBPost(${url})`)(2000),
  sendLike: token => (post: string) => {
    console.log(`sending like with fbToken "${token}" and post "${post}"`)
    return delay(true)(1000)
  }
}

likePost(task, monadUserTask, monadFBTask)('session123')('https://me.com/1')
  .run()
  .then(result => console.log(result))
// => string(session123) after 1.002
// => FBToken(string(session123)) after 1.503
// => FBPost(https://me.com/1) after 2.002
// => sending like with fbToken "FBToken(string(session123))" and post "FBPost(https://me.com/1)"
// => true after 3.004
// => true
