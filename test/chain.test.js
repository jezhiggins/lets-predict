
class Chain {
  constructor() {
    this.tokens = []
  }

  push(token, follower) {
    this.tokens.push(token)
  }

  get length() {
    return this.tokens.length
  }
}

function make_chain() {
  return new Chain()
}

test('empty chain', () => {
  const chain = make_chain()

  expect(chain.length).toBe(0)
})

test('adding a single token pair', () => {
  const chain = make_chain()

  chain.push('hello', 'world')
  expect(chain.length).toBe(1)
})
