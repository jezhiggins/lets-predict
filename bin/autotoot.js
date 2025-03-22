import { make_generator_from } from "../src/generator.mjs";


const window = process.argv.length === 3 ? process.argv[2] : 1;
const chain = await make_generator_from("./data/toots.txt", window);

for (let i = 0; i !== 5; ++i)
  console.log(chain.sentence_from()+'\n');
