function pop(input) {
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
  const stream = pop(input);

  let c = stream.next();
  while (stream.hasNext()) {
    while (isWhitespace(c)) c = stream.next();

    let token = "";
    while (isAlphanumeric(c)) {
      token += c;
      c = stream.next();
    }
    if (token) yield token;

    while (isOtherCharacter(c)) {
      yield c;
      c = stream.next();
    }
  }
}

export { tokenise };
