import { open } from 'node:fs/promises'
import { tokenise} from "../src/tokenise.mjs";
import { make_chain} from "../src/chain.mjs";

const austen = make_chain()

const file = await open('./data/pride-and-prejudice.txt');

let prev = null
for await (const line of file.readLines()) {
  const tokens = tokenise(line)
  for (const token of tokens) {
    austen.add(prev, token)
    prev = token
  }
}

console.log("I'm all Austened-up. Here goes ...");
console.log()

let all = ""
let word = "Mrs."
for (let i = 0; i !== 50; ++i) {
  all += word + " "
  word = austen.predict(word)
}

console.log(all)
