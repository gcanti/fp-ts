export class Data1<A> {
  constructor(public value0: A) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `${this.constructor.name}(${this.value0})`
  }
}

export class Data2<A, B> {
  constructor(public value0: A, public value1: B) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `${this.constructor.name}(${this.value0}, ${this.value1})`
  }
}

export class Data3<A, B, C> {
  constructor(public value0: A, public value1: B, public value2: C) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `${this.constructor.name}(${this.value0}, ${this.value1}, ${this.value2})`
  }
}

export class Data4<A, B, C, D> {
  constructor(public value0: A, public value1: B, public value2: C, public value3: D) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `${this.constructor.name}(${this.value0}, ${this.value1}, ${this.value2}, ${this.value3})`
  }
}

export class Data5<A, B, C, D, E> {
  constructor(public value0: A, public value1: B, public value2: C, public value3: D, public value4: E) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `${this.constructor.name}(${this.value0}, ${this.value1}, ${this.value2}, ${this.value3}, ${this.value4})`
  }
}
