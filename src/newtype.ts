/*

  Usage:

  type Fahrenheit = NewType<'Fahrenheit'>;
  const fahrenheit = newtype<Fahrenheit, number>()
  type Celsius = NewType<'Celsius'>;
  const celsius = newtype<Celsius, number>()

  const hot = fahrenheit.to(100);
  const boiling = celsius.to(100);

  function convertFtoC(t: Fahrenheit): Celsius {
    return celsius.to((fahrenheit.from(t) - 32) / 1.8);
  }

  convertFtoC(hot);     // ok
  convertFtoC(boiling); // error: Type '"Celsius"' is not assignable to type '"Fahrenheit"'

*/

export interface NewType<URI> {
  readonly __newtype: URI;
}

export function newtype<Brand, Carrier>() {
  return {
    to(x: Carrier): Brand { return x as any },
    from(x: Brand): Carrier { return x as any }
  }
}
