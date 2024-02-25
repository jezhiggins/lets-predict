
function make_followers() {
  return {
    size: 0
  }
}

test('empty followers', () => {
  const followers = make_followers()

  expect(followers.size).toBe(0)
})
