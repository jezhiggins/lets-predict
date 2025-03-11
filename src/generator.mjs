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
    let prev = StartOfLine;
    const tokens = tokenise(line);
    for (const token of tokens) {
      yield [prev, token];

      if (isTerminal(token)) {
        yield [token, EndOfLine];
        prev = StartOfLine;
      } else prev = token;
    }
  }
}

async function make_generator_from(filename) {
  const generator = new Generator();

  for await (const [word, follower] of wordPairs(filename))
    generator.add(word, follower);

  return generator;
}

function make_generator() {
  return new Generator();
}

class Generator {
  #chain = make_chain();

  add(token, follower) {
    this.#chain.add(token ?? StartOfLine, follower);
  }

  sentence_from(start = StartOfLine) {
    let all = "";
    let word = this.#chain.predict(start);

    while (word !== EndOfLine && word !== null) {
      if (!isPunctuation(word)) all += " ";
      all += word;
      word = this.#chain.predict(word);
    }

    return all;
  }
}

export { make_generator_from, make_generator, StartOfLine, EndOfLine };
