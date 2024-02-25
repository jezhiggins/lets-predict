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
