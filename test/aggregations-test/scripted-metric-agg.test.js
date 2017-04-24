import test from 'ava';
import { ScriptedMetricAggregation } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new ScriptedMetricAggregation('my_agg');

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_agg', 'scripted_metric')
);

test(setsAggType, ScriptedMetricAggregation, 'scripted_metric');
test(illegalCall, ScriptedMetricAggregation, 'field');
test(illegalCall, ScriptedMetricAggregation, 'script');
test(illegalCall, ScriptedMetricAggregation, 'missing');
test(setsOption, 'initScript', { param: 'params._agg.transactions = []' });
test(setsOption, 'mapScript', {
    param: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)"
});
test(setsOption, 'combineScript', {
    param: 'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit'
});
test(setsOption, 'reduceScript', {
    param: 'double profit = 0; for (a in params._aggs) { profit += a } return profit'
});
// Apparently if you specify script parameters then you must specify "_agg": {}.
test(setsOption, 'params', { param: { field: 'amount', _agg: {} } });
