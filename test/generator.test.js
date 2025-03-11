import {make_generator} from "../src/generator.mjs";

test('make a prediction!', () => {
  const chain = make_generator()

  chain.add(null, 'hello')
  chain.add('hello', 'world')
  chain.add('hello', 'Brian')
  chain.add('hello', 'world')

  const sentence = chain.sentence_from()

  expect([' hello world', ' hello Brian']).toContain(sentence)
})
