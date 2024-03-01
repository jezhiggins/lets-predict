import {tokenise} from '../src/tokenise.mjs'

function expect_tokens(iter, ...expects) {
  expect([...iter]).toStrictEqual(expects)
}

test('tokenise single word', () => {
  const toks = tokenise("banana")

  expect_tokens(toks, 'banana')})

test('tokenise two words',() => {
  const toks = tokenise('custard apple')

  expect_tokens(toks, 'custard', 'apple')
})

test('tokenise words with many spaces', () => {
  const toks = tokenise('custard    apple  ')

  expect_tokens(toks, 'custard', 'apple')
})

test('commas are their own tokens', () => {
  const toks = tokenise('custard,    apple  ')

  expect_tokens(toks, 'custard', ',', 'apple')
})

test('full stops are their own tokens', () => {
  const toks = tokenise('custard,    apple.  ')

  expect_tokens(toks, 'custard', ',', 'apple', '.')
})
