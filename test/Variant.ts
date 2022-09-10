import * as U from './util'
import { pipe } from '../src/function'
import * as _ from '../src/Variant'

type Media = _.Tagged<'book', number> | _.Tagged<'film', string> | _.Tagged<'song', string>

const Media = _.module<Media>({
  book: (value) => _.tagged(_book, value),
  film: (value) => _.tagged(_film, value),
  song: (value) => _.tagged(_song, value)
})

const _book = 'book'
const _film = 'film'
const _song = 'song'

const show: (media: Media) => string = (media) =>
  pipe(
    media,
    _.caseOf({
      [_book]: (isbn) => `Book ${isbn}`,
      [_film]: (filmTitle) => `Film ${filmTitle}`,
      [_song]: (song) => `Song ${song}`
    })
  )

const isBook: (media: Media) => boolean = (media) => pipe(media, _.caseOfWithDefault(false)({ [_book]: () => true }))

const bookExample = Media.book(123)
const filmExample = Media.film('Harry Potter')

describe('Variant', () => {
  describe('constructors', () => {
    it('tagged', () => {
      U.deepStrictEqual(_.tagged('test tag', 1), { _tag: 'test tag', value: 1 })
    })
  })
  describe('destructors', () => {
    it('caseOf', () => {
      U.strictEqual(show(bookExample), 'Book 123')
    })
    it('caseOfWithDefault', () => {
      U.strictEqual(isBook(bookExample), true)
      U.strictEqual(isBook(filmExample), false)
    })
  })
})
