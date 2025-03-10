import {make_followers} from "./followers.mjs";

class Chain {
  #tokens = new Map()

  add(token, follower) {
    const followers = this.#tokens.get(token) ?? make_followers()
    followers.add(follower)
    this.#tokens.set(token, followers)
  }

  predict(token, weight = Math.random()) {
    const followers = this.#tokens.get(token)
    return followers ? followers.select(weight) : '.'
  }

  get size() {
    return this.#tokens.size
  }
}

function make_chain() {
  return new Chain()
}

export {make_chain}
