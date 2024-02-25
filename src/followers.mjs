
class Follower {
  #token
  #count

  constructor(token) {
    this.#token = token
    this.#count = 1
  }

  bump() { ++this.#count }

  get token() { return this.#token }
  get count() { return this.#count }
}

class Followers {
  #tokens = []

  add(token) {
    const existing = this.#tokens.find(f => f.token === token)
    if (!existing)
      this.#tokens.push(new Follower(token))
    else
      existing.bump()
  }

  at(index) {
    return this.#tokens[index]
  }

  get size() { return this.#tokens.length }
}

function make_followers() {
  return new Followers()
}

export {make_followers}
