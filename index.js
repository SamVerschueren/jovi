'use strict';
const crypto = require('crypto');

exports.encrypt = (data, key) => {
	if (!Buffer.isBuffer(data) && typeof data !== 'string') {
		throw new TypeError(`Expected \`data\` to be a \`buffer\` or a \`string\`, got \`${typeof data}\``);
	}

	if (!Buffer.isBuffer(key)) {
		throw new TypeError(`Expected \`key\` to be a \`buffer\`, got \`${typeof key}\``);
	}

	const encoding = typeof data === 'string' ? 'utf8' : undefined;
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
	const hash = Buffer.concat([cipher.update(data, encoding), cipher.final()]);

	return {
		iv,
		hash
	};
};

exports.decrypt = (data, key, iv) => {
	if (!Buffer.isBuffer(data)) {
		throw new TypeError(`Expected \`data\` to be a \`buffer\`, got \`${typeof data}\``);
	}

	if (!Buffer.isBuffer(key)) {
		throw new TypeError(`Expected \`key\` to be a \`buffer\`, got \`${typeof key}\``);
	}

	if (!Buffer.isBuffer(iv)) {
		throw new TypeError(`Expected \`iv\` to be a \`buffer\`, got \`${typeof iv}\``);
	}

	const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);

	return Buffer.concat([decipher.update(data), decipher.final()]);
};
