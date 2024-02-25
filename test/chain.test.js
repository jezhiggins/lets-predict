import {make_chain} from "../src/chain.mjs";

test('empty chain', () => {
  const chain = make_chain()

  expect(chain.size).toBe(0)
})

test('adding a single token pair', () => {
  const chain = make_chain()

  chain.add('hello', 'world')

  expect(chain.size).toBe(1)
})

test('make a prediction!', () => {
  const chain = make_chain()

  chain.add('hello', 'world')
  chain.add('hello', 'Brian')
  chain.add('hello', 'world')

  const prediction1 = chain.predict('hello', 0.5)
  const prediction2 = chain.predict('hello', 0.9)

  expect(prediction1).toBe('world')
  expect(prediction2).toBe('Brian')
})

