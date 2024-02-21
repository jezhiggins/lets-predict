
function tokenise(input) {
  return [input]
}
test('tokenise test', () => {
  var toks = tokenise("banana")

  expect(toks).toStrictEqual(['banana'])
})
