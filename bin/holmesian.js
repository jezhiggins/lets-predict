import { open } from "node:fs/promises";
import { tokenise } from "../src/tokenise.mjs";
import { make_chain } from "../src/chain.mjs";

function is_punctuation(w) {
  return w === "," || w === ".";
}
function generate(chain) {
  let all = "";
  let word = "Watson";
  for (let i = 0; i !== 100; ++i) {
    if (!is_punctuation(word)) all += " ";
    all += word;
    word = sherlock.predict(word);
  }

  console.log("=============");
  console.log(all);
}

async function* wordPairs(filename) {
  const file = await open(filename);

  let prev = null;
  for await (const line of file.readLines()) {
    const tokens = tokenise(line);
    for (const token of tokens) {
      yield [prev, token];
      prev = token;
    }
  }
}

const sherlock = make_chain();

for await (const [word, follower] of wordPairs(
  "./data/complete-sherlock-holmes.txt",
))
  sherlock.add(word, follower);

console.log("Sherlocked to the gills. Here goes ...");
console.log();

for (let i = 0; i !== 10; ++i) generate(sherlock);
