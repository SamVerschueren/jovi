import test from 'ava';
import m from './';

const data = new Buffer('20ea986f64b12235', 'hex');
const key = new Buffer('3c491ad9251904bf02a198027a6090d3c0db07a890d84c3302cd59190ca6b230', 'hex');
const iv = new Buffer('b44044a9f23d9beacd509c0a85b11f0c', 'hex');

test('errors', t => {
	t.throws(() => m.encrypt(1, key), 'Expected `data` to be a `buffer` or a `string`, got `number`');
	t.throws(() => m.encrypt('foo', 1), 'Expected `key` to be a `buffer`, got `number`');
	t.throws(() => m.decrypt(1, key, iv), 'Expected `data` to be a `buffer`, got `number`');
	t.throws(() => m.decrypt(data, 1, iv), 'Expected `key` to be a `buffer`, got `number`');
	t.throws(() => m.decrypt(data, key, 1), 'Expected `iv` to be a `buffer`, got `number`');
});

test('encrypt', t => {
	const result = m.encrypt('unicorns', key);

	t.truthy(result.iv);
	t.truthy(result.hash);
});

test('decrypt', t => {
	const data = new Buffer('20ea986f64b12235', 'hex');
	const iv = new Buffer('b44044a9f23d9beacd509c0a85b11f0c', 'hex');

	t.is(m.decrypt(data, key, iv).toString('utf8'), 'unicorns');
});

test('encrypt → decrypt', t => {
	const result = m.encrypt('unicorns', key);

	t.is(m.decrypt(result.hash, key, result.iv).toString('utf8'), 'unicorns');
});
