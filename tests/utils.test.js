import { append } from '../src/utils';

import {describe, it} from 'mocha';
import {assert} from 'chai';

describe('utils', () => {
  it('should append', () => {
    let x = {};
    append(x, 'a', 'test');
    assert.deepEqual({a: ['test']}, x)
  })
})
