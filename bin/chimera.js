import { make_generator_from } from "../src/generator.mjs";

function generate(chain) {
  const sentences = [];

  do {
    sentences.push(chain.sentence_from());
  } while (sentences.length <= 3 || Math.random() < 0.6);

  console.log(sentences.join(" "));
  console.log();

}

const window = process.argv.length === 3 ? process.argv[2] : 1;
const toots = await make_generator_from(
  [
    "./data/toots.txt",
    "./data/pride-and-prejudice-cut.txt",
    "./data/a-study-in-scarlet.txt"
  ],
  window);

generate(toots);
