import { tokenise } from "../src/tokenise.mjs";
import { open } from 'fs/promises'

class Follower {
  #token;
  #count;

  constructor(token) {
    this.#token = token;
    this.#count = 1;
  }

  bump() {
    ++this.#count;
  }

  get token() {
    return this.#token;
  }
  get count() {
    return this.#count;
  }
}

class Followers {
  #followers = [];

  add(token) {
    const existing = this.#followers.find((f) => f.token === token);

    if (!existing) this.#followers.push(new Follower(token));
    else existing.bump();

    this.#followers.sort((lhs, rhs) => rhs.count - lhs.count);
  }

  at(index) {
    return this.#followers[index];
  }

  get size() {
    return this.#followers.length;
  }
}


class Chain {
  tokens = new Map();

  add(token, follower) {
    const followers = this.tokens.get(token) ?? new Followers();
    followers.add(follower);
    this.tokens.set(token, followers);
  }

  keys() { return this.tokens.keys(); }
  entries() { return this.tokens.entries(); }

}


async function* wordPairs(filename) {
  const file = await open(filename);

  let prev = null;
  for await (const line of file.readLines()) {
    for (const token of tokenise(line)) {
      yield [prev, token];
      prev = token;
    }

    yield [prev, null];
  }
}

function esc(f) {
  if (f === '"')
    return "_quot";
  if (f === '\\')
    return "_bkslash";
  return f;
}

const chain = new Chain();
for await (const [word, follower] of wordPairs('./data/complete-sherlock-holmes.txt'))
  chain.add(word, follower);

console.log("digraph finite_state_machine {");

for (const [token, followers] of chain.entries())
  for (let i = 0; i !== followers.size; ++i) {
    const f = followers.at(i);
    console.log(`  "${esc(token)}" -> "${esc(f.token)}" [label = "${f.count}"];`);
  }

console.log("}");
