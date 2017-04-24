import test from 'ava';
import { ReverseNestedAggregation } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) => new ReverseNestedAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'reverse_nested'));

test(setsAggType, ReverseNestedAggregation, 'reverse_nested');
test(illegalCall, ReverseNestedAggregation, 'field');
test(illegalCall, ReverseNestedAggregation, 'script');
test(setsOption, 'path', { param: 'reverse_nested_path' });

test('constructor sets arguments', t => {
    const value = getInstance('reverse_nested_path').toJSON();
    const expected = {
        my_agg: {
            reverse_nested: {
                path: 'reverse_nested_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
