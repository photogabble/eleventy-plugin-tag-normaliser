const test = require('ava');
const slugify = require('../src/str-to-slug');

test('slugifies', t=>{
  t.true(slugify('hello world') === 'hello-world')
  t.true(slugify('hello  world') === 'hello-world')
  t.true(slugify('hello--world') === 'hello-world')
  t.true(slugify('1 2 3') === '1-2-3')
  t.true(slugify('123') === '123')
  t.true(slugify('11ty') === '11ty')
  t.true(slugify('DOScember') === 'doscember')
})
