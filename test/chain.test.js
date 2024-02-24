
function make_chain() {
  return {
    length: 0
  }
}

test('empty chain', () => {
  const chain = make_chain()

  expect(chain.length).toBe(0)
})
