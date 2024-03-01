
function* tokenise(input) {
  for (const token of input.split(' '))
    if (token !== '')
      yield token
}

export {tokenise}
