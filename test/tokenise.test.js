
function tokenise(input) {
  return input.split(' ')
}
test('tokenise single word', () => {
  const toks = tokenise("banana")

  expect(toks).toStrictEqual(['banana'])
})

test('tokenise two words',() => {
  const toks = tokenise('custard apple')

  expect(toks).toStrictEqual(['custard', 'apple'])
})
