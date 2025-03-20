import { make_chain } from "../src/chain.mjs";

const chain = make_chain();

chain.add("hello", "world");
chain.add("hello", "everyone");
chain.add("hello", "there");
chain.add("hello", "everyone");

for (let i = 0; i !== 10; ++i)
  console.log("hello " + chain.predict("hello"));
