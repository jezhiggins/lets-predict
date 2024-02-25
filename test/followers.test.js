class Follower {
  #token
  #count

  constructor(token) {
    this.#token = token
    this.#count = 1
  }

  get token() { return this.#token }
  get count() { return this.#count }
}

class Followers {
  #tokens = []

  add(token) {
    this.#tokens.push(new Follower(token))
  }

  at(index) {
    return this.#tokens[index]
  }

  get size() { return this.#tokens.length }
}

function make_followers() {
  return new Followers()
}

test('empty followers', () => {
  const followers = make_followers()

  expect(followers.size).toBe(0)
})

test('add a follower', () => {
  const followers = make_followers()

  followers.add('fruit')

  expect(followers.size).toBe(1)

  const f = followers.at(0)
  expect(f.token).toBe('fruit')
  expect(f.count).toBe(1)
})
