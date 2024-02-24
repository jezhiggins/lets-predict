
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

export {make_chain}
