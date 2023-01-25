const test = require('ava');
const slugify = require('../src/str-to-slug');

test('slugifies', t=>{
  t.is(slugify('hello world'), 'hello-world')
  t.is(slugify('hello  world'), 'hello-world')
  t.is(slugify('hello--world'), 'hello-world')
  t.is(slugify('1 2 3'), '1-2-3')
  t.is(slugify('123'), '123')
  t.is(slugify('11ty'), '11ty')
  t.is(slugify('DOScember'), 'doscember')
})
