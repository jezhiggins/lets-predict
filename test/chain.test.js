
class Chain {
  constructor() {
    this.tokens = new Map()
  }

  add(token, follower) {
    this.tokens.set(token, follower)
  }

  predict(token) {
    return this.tokens.get(token)
  }

  get size() {
    return this.tokens.size
  }
}

function make_chain() {
  return new Chain()
}

test('empty chain', () => {
  const chain = make_chain()

  expect(chain.size).toBe(0)
})

test('adding a single token pair', () => {
  const chain = make_chain()

  chain.add('hello', 'world')

  expect(chain.size).toBe(1)
})

test('make a prediction!', () => {
  const chain1 = make_chain()
  const chain2 = make_chain()

  chain1.add('hello', 'world')
  const prediction1 = chain1.predict('hello')

  chain2.add('hello', 'Brian')
  const prediction2 = chain2.predict('hello')

  expect(prediction1).toBe('world')
  expect(prediction2).toBe('Brian')
})

