function streamer(input) {
  let index = 0;
  return {
    next: () => (index !== input.length ? input[index++] : null),
    hasNext: () => index !== input.length,
  };
}

const whitespacePattern = /\s/;
function isWhitespace(str) {
  return str && str.match(whitespacePattern);
}
const alphanumericPattern = /[\w\d']/;
function isAlphanumeric(str) {
  return str && str.match(alphanumericPattern);
}
function isOtherCharacter(str) {
  return str && !isWhitespace(str) && !isAlphanumeric(str);
}

function* tokenise(input) {
  const stream = streamer(input);

  let c = stream.next();
  while (stream.hasNext()) {
    while (isWhitespace(c))
      c = stream.next();

    let token = "";
    for ( ; isAlphanumeric(c); c = stream.next())
      token += c;

    if (token)
      yield token;

    for (; isOtherCharacter(c); c = stream.next())
      yield c;
  }
}

export { tokenise };
