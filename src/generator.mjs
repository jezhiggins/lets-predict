import { make_chain } from "./chain.mjs";
import { open } from "node:fs/promises";
import { tokenise } from "./tokenise.mjs";

const StartOfLine = Symbol("StartOfLine");
const EndOfLine = Symbol("EndOfLine");
const QuoteStart = '\u{201C}';
const QuoteEnd = '\u{201D}';

function isTerminal(w) {
  return [".", "!", "?"].includes(w);
}
function isPunctuation(w) {
  return !w.match(/[\w\d]/);
}
function noSpaceBefore(w) {
  return isTerminal(w) ||
    [",", ";", ":", QuoteEnd, ")"].includes(w);
}
function noSpaceAfter(line) {
  const l = line[line.length - 1];
  return [QuoteStart, "("].includes(l);
}

async function* wordPairs(filename) {
  const file = await open(filename);

  let inQuote = false;

  let prev = StartOfLine;
  for await (const line of file.readLines()) {
    if (line.length === 0)
      continue;

    const tokens = tokenise(line);
    for (let token of tokens) {
      if (token === '"') {
        token = inQuote ? QuoteStart : QuoteEnd;
        inQuote = !inQuote;
      }

      yield [prev, token];

      if (isTerminal(token)) {
        yield [token, EndOfLine];
        prev = StartOfLine;
      } else prev = token;
    }
  }

  if (prev !== StartOfLine)
    yield [prev, EndOfLine];
}

function token_window(tokens, window, word = StartOfLine) {
  for (let i = tokens.length; i < window; ++i)
    tokens.push(StartOfLine);
  tokens.push(word)
  tokens.shift()
  return tokens;
}

async function make_generator_from(filenames, window = 1) {
  const generator = new Generator(window);

  if (!Array.isArray(filenames))
    filenames = [filenames];

  let tokens = token_window([], window);
  for (const filename of filenames)
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

      if (!noSpaceBefore(word) && !noSpaceAfter(all))
        all += " ";

      all += word;

      word = this.#chain.predict(tokens);
    }

    if (all.length <= 1)
      return this.sentence_from(start);
    return all;
  }

  next(start) {
    return this.#chain.next_n([start], 3);
  }
}

export { make_generator_from, make_simple_generator_from, make_generator, StartOfLine, EndOfLine };
