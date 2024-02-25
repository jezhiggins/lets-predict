import {make_followers} from "../src/followers.mjs";

function expectFollower(follower, token, count) {
  expect(follower.token).toBe(token)
  expect(follower.count).toBe(count)
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
  expectFollower(f, 'fruit', 1)
})

test('add two followers', () => {
  const followers = make_followers()

  followers.add('fruit')
  followers.add('vegetable')

  expect(followers.size).toBe(2)

  const f = followers.at(0)
  expectFollower(f, 'fruit', 1)

  const v = followers.at(1)
  expectFollower(v, 'vegetable', 1)
})

test('duplicate follower, so count is 2', () => {
  const followers = make_followers()

  followers.add('fruit')
  followers.add('fruit')

  expect(followers.size).toBe(1)

  const f = followers.at(0)
  expectFollower(f, 'fruit', 2)
})

test('followers should be sorted in descending count order', () => {
  const followers = make_followers()

  const tokens = [
    'nut', 'fruit', 'vegetable', 'vegetable', 'fruit', 'fruit'
  ]
  tokens.map(t => followers.add(t))

  expect(followers.size).toBe(3)

  const f = followers.at(0)
  expectFollower(f, 'fruit', 3)
  const v = followers.at(1)
  expectFollower(v, 'vegetable', 2)
  const n = followers.at(2)
  expectFollower(n, 'nut', 1)
})
