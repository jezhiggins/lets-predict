
function* tokenise(input) {
  for (const token of input.split(' '))
    if (token !== '')
      yield* splitComma(token)
}

function* splitComma(token) {
  for (let t of token.split(',')) {
    if (t === '')
      t = ','
    yield t
  }
}

export {tokenise}
