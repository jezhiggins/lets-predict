import { make_followers } from "./followers.mjs";

class Chain {
  #tokens = new Map();

  #key(token) {
    if (!Array.isArray(token))
      return token;
    if (token.length === 1)
      return token[0];
    return token.map(s => String(s)).join("-->");
  }

  add(token, follower) {
    const key = this.#key(token);
    const followers = this.#tokens.get(key) ?? make_followers();
    followers.add(follower);
    this.#tokens.set(key, followers);
  }

  predict(token, weight = Math.random()) {
    const key = this.#key(token);
    const followers = this.#tokens.get(key);
    return followers ? followers.select(weight) : null;
  }

  next_n(token, n) {
    const key = this.#key(token);
    const followers = this.#tokens.get(key);
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
