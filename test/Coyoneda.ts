import { lift } from '../src/Coyoneda'

describe('Coyoneda',() => {
  it('Executes only one loop',() => {
    const coyo = lift([2,2]).map(x =>  x + 1).map(x => x + 2)
    const res = coyo.x.map(coyo.f)
    expect(res).toEqual([5,5])
  })
  it('Project something into a Functor',() => {
    const coyo = lift({ a: 1 }).map(x => x.a + 2)
    const res = coyo.f(coyo.x)
    expect(res).toEqual(3)
  })
})
