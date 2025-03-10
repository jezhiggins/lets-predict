import { open } from 'node:fs/promises'
import { tokenise} from "../src/tokenise.mjs";
import { make_chain} from "../src/chain.mjs";

function isPunctuation(w) {
  return !w.match(/[\w\d]/)
}
function isTerminal(w) {
  return w.match(/[\.!?]/)
}

function generate(chain) {
  let all = ""
  let word = chain.predict(StartOfLine)

  do {
    while (word !== StartOfLine) {
      if (!isPunctuation(word)) all += " "
      all += word
      word = chain.predict(word)
    }
    word = chain.predict(word)
  } while (Math.random() < 0.6)


  console.log("=============")
  console.log(all)
}

const StartOfLine = Symbol('StartOfLine')

async function* wordPairs(filename) {
  const file = await open(filename);

  for await (const line of file.readLines()) {
    let prev = StartOfLine
    const tokens = tokenise(line)
    for (const token of tokens) {
      yield [prev, token]

      if (isTerminal(token)) {
        yield [token, StartOfLine]
        prev = StartOfLine
      }
      else
        prev = token
    }
  }
}

const toots = make_chain()

for await (const [word, follower] of wordPairs('./data/toots.txt'))
  toots.add(word, follower)

console.log("I've read all your mastodon");
console.log()

for (let i = 0; i !== 10; ++i)
  generate(toots)

