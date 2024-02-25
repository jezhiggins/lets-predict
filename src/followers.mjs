
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
  #followers = []

  add(token) {
    const existing = this.#followers.find(f => f.token === token)

    if (!existing)
      this.#followers.push(new Follower(token))
    else
      existing.bump()

    this.#followers.sort((lhs, rhs) => rhs.count - lhs.count)
  }

  select(weight) {
    const total = this.#followers.reduce((t, f) => t+f.count, 0)
    weight *= total
    for (const follower of this.#followers) {
      weight -= follower.count
      if (weight < 0)
        return follower.token
    }
  }

  at(index) {
    return this.#followers[index]
  }

  get size() { return this.#followers.length }
}

function make_followers() {
  return new Followers()
}

export {make_followers}
