import { make_chain } from "../src/chain.mjs";
import { tokenise } from "../src/tokenise.mjs";
import { open } from 'fs/promises'

async function* wordPairs(filename) {
  const file = await open(filename);

  let prev = null;
  for await (const line of file.readLines()) {
    for (const token of tokenise(line)) {
      yield [prev, token];
      prev = token;
    }

    yield [prev, null];
  }
}

const chain = make_chain();
for await (const [word, follower] of wordPairs('./data/toots.txt'))
  chain.add(word, follower);

for (let j = 0; j !== 10; ++j) {
  const tokens = ['hello']
  for (let i = 0; i !== 12; ++i)
    tokens.push(chain.predict(tokens[tokens.length - 1]));
  console.log(tokens.join(' '));
}
