
function* split_on(input, on = ' ') {
  yield* input.split(on)
}

function* reinsert(tokens, what) {
  for (const token of tokens)
    yield (token !== '') ? token : what
}

function* strip_blanks(tokens) {
  for (const token of tokens)
    if (token !== '')
      yield token
}

function* tokenise(input) {
  yield* splitFullStop(splitComma(strip_blanks(split_on(input))))
}

function* splitComma(tokens) {
  for (const token of tokens)
    yield* reinsert(split_on(token, ','), ',')
}

function* splitFullStop(tokens) {
  for (const token of tokens)
    yield* reinsert(split_on(token, '.'), '.')
}

export {tokenise}
