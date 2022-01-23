const palindrome = require('../utils/for_testing').palindrome

test('Palindrome test for a', () => {
  const result  = palindrome('a')
  expect(result).toBe('a')
})

test('Palindrome test for React', () => {
  const result = palindrome('React')
  expect(result).toBe('tcaeR')
})


test('Palindrome test for releveler', () => {
  const result = palindrome('releveler')
  expect(result).toBe('releveler')
})