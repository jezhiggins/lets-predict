import { make_generator_from, make_simple_generator_from } from "../src/generator.mjs";

function generate(chain) {
  console.log("\n*" + chain.sentence_from());
  console.log();
}

console.log("I've read all your mastodon");
console.log();


const window = process.argv.length === 3 ? process.argv[2] : 1;
const toots = await make_generator_from("./data/toots.txt", window);

for (let i = 0; i !== 10; ++i) generate(toots);
