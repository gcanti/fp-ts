import { Coyoneda } from '../src/Coyoneda'
import { array } from '../src/Array'

describe('Coyoneda', () => {
  it('Executes only one loop', () => {
    const coyo = Coyoneda.lift([2, 2])
      .map(x => x + 1)
      .map(x => x + 2)
    const res = coyo.lower(array)
    expect(res).toEqual([5, 5])
  })
  it('Project something into a Functor', () => {
    const o = { a: 1 }
    const res = Coyoneda.liftFromNonFunctor(o)
      .map(x => x.a + 2)
      .lowerB()
    expect(res).toEqual(3)
  })
})
