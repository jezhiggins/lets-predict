import { make_followers } from "./followers.mjs";
import ArrayKeyedMap from 'array-keyed-map';

class Chain {
  #tokens = new ArrayKeyedMap();

  add(token, follower) {
    const followers = this.#tokens.get(token) ?? make_followers();
    followers.add(follower);
    this.#tokens.set(token, followers);
  }

  predict(token, weight = Math.random()) {
    const followers = this.#tokens.get(token);
    return followers ? followers.select(weight) : null;
  }

  next_n(token, n) {
    const followers = this.#tokens.get(token);
    if (!followers)
      return []

    n = Math.min(n, followers.size);
    const next = []
    for (let i = 0; i !== n; ++i)
      next.push(followers.at(i).token);
    return next;
  }

  get size() {
    return this.#tokens.size;
  }
}

function make_chain() {
  return new Chain();
}

export { make_chain };
