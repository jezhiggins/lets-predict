import {tokenise} from '../src/tokenise.mjs'

test('tokenise single word', () => {
  const toks = tokenise("banana")

  expect([...toks]).toStrictEqual(['banana'])
})

test('tokenise two words',() => {
  const toks = tokenise('custard apple')

  expect([...toks]).toStrictEqual(['custard', 'apple'])
})

test('tokenise words with many spaces', () => {
  const toks = tokenise('custard    apple  ')

  expect([...toks]).toStrictEqual(['custard', 'apple'])
})
