import { make_chain } from "./chain.mjs";
import { open } from "node:fs/promises";
import { tokenise } from "./tokenise.mjs";

const StartOfLine = Symbol("StartOfLine");
const EndOfLine = Symbol("EndOfLine");

function isTerminal(w) {
  return w.match(/[\.!?]/);
}
function isPunctuation(w) {
  return !w.match(/[\w\d]/);
}

async function* wordPairs(filename) {
  const file = await open(filename);

  for await (const line of file.readLines()) {
    if (line.length === 0)
      continue;

    let prev = StartOfLine;
    const tokens = tokenise(line);
    for (const token of tokens) {
      yield [prev, token];

      if (isTerminal(token)) {
        yield [token, EndOfLine];
        prev = StartOfLine;
      } else prev = token;
    }

    if (prev !== StartOfLine)
      yield [prev, EndOfLine];
  }
}

function token_window(tokens, window, word = StartOfLine) {
  for (let i = tokens.length; i < window; ++i)
    tokens.push(StartOfLine);
  tokens.push(word)
  tokens.shift()
  return tokens;
}

async function make_generator_from(filename, window = 1) {
  const generator = new Generator(window);

  let tokens = token_window([], window);

  for await (const [word, follower] of wordPairs(filename)) {
    tokens = word === StartOfLine
      ? token_window([],window)
      : token_window(tokens, window, word)

    generator.add(tokens, follower);
  }
  return generator;
}

async function make_simple_generator_from(filename) {
  const generator = new Generator();

  for await (const [word, follower] of wordPairs(filename)) {
    if (follower === StartOfLine || follower === EndOfLine)
      continue;
    if (isPunctuation(follower))
      continue;

    generator.add([word], follower);
  }

  return generator;
}

function make_generator() {
  return new Generator();
}

class Generator {
  #chain = make_chain();
  #window = 1;

  constructor(window = 1) {
    this.#window = window;
  }

  add(token, follower) {
    this.#chain.add(token ?? StartOfLine, follower);
  }

  sentence_from(start = StartOfLine) {
    let all = "";
    let tokens = token_window([], this.#window, start);
    let word = this.#chain.predict(tokens);

    while (word !== EndOfLine && word !== null) {
      tokens = token_window(tokens, this.#window, word);
      if (!isPunctuation(word)) all += " ";
      all += word;
      word = this.#chain.predict(tokens);
    }

    return all;
  }

  next(start) {
    return this.#chain.next_n([start], 3);
  }
}

export { make_generator_from, make_simple_generator_from, make_generator, StartOfLine, EndOfLine };
