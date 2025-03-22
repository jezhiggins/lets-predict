import { make_generator_from } from "../src/generator.mjs";

function generate(chain) {
  const sentences = [];

  do {
    sentences.push(chain.sentence_from());
  } while (sentences.length <= 3 || Math.random() < 0.6);

  console.log(sentences.join(" "));
  console.log();
}

const filename = process.argv[2];
const window = process.argv.length === 4 ? process.argv[3] : 1;

const toots = await make_generator_from(filename, window);

generate(toots);
