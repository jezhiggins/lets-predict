import { make_generator_from } from "../src/generator.mjs";

function generate(chain) {
  const sentences = [];

  do {
    sentences.push(chain.sentence_from());
  } while (Math.random() < 0.6 && sentences.length < 3);

  console.log("\n=============\n");
  console.log(sentences.join(" "));
}

console.log("I've read all your mastodon");
console.log();

const toots = await make_generator_from("./data/toots.txt");

for (let i = 0; i !== 10; ++i) generate(toots);
