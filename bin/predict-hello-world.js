import {make_chain} from "../src/chain.mjs";

const chain = make_chain()

chain.add('hello', 'world')
chain.add('hello', 'everyone')
chain.add('hello', 'Dolly')
chain.add('hello', 'everyone')
chain.add('hello', 'world')
chain.add('hello', 'world')

for (let i = 0; i != 10; ++i)
  console.log('hello ' + chain.predict('hello'))
