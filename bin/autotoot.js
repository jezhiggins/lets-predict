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
  let word = "First"
  for (let i = 0; i !== 50; ++i) {
    if (!isPunctuation(word)) all += " "
    all += word
    if (isTerminal(word))
      break;
    word = sherlock.predict(word)
  }

  console.log("=============")
  console.log(all)
}

async function* wordPairs(filename) {
  const file = await open(filename);

  let prev = null
  for await (const line of file.readLines()) {
    const tokens = tokenise(line)
    for (const token of tokens) {
      yield [prev, token]
      prev = token
    }
  }
}

const sherlock = make_chain()

for await (const [word, follower] of wordPairs('./data/toots.txt'))
  sherlock.add(word, follower)

console.log("I've read all your mastodon");
console.log()

for (let i = 0; i !== 10; ++i)
  generate(sherlock)

