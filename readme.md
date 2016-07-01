# jovi [![Build Status](https://travis-ci.org/SamVerschueren/jovi.svg?branch=master)](https://travis-ci.org/SamVerschueren/jovi)

> Encrypt and decrypt data with AES-256-CTR


## Install

```
$ npm install --save jovi
```


## Usage

```js
const crypto = require('crypto');
const jovi = require('jovi');

const key = crypto.randomBytes(32);

const result = jovi.encrypt('unicorns', key)
/*
{
	iv: <Buffer 50 0b 19 ad 0e 7a 0f 8b 5d 62 c1 b6 8f 5e 08 cb>,
	hash: <Buffer da c7 2a 1b 4d 44 fc ec>
}
*/

const buf = jovi.decrypt(result.hash, key, result.iv);
console.log(buf.toString('utf8'));
//=> 'unicorns'
```


## API

### jovi.encrypt(data, key)

Returns an object with an `iv` and the `hash`.

#### data

Type: `buffer`, `string`

Buffer you want to encrypt.

While strings are supported you should prefer buffers as they're faster to hash. Though if you already have a string you should not convert it to a buffer.

#### key

Type: `buffer`

Key to encrypt the data with.

### jovi.decrypt(data, key, iv)

Returns a `buffer` with the decrypted data.

#### data

Type: `buffer`

Buffer you want to decrypt.

#### key

Type: `buffer`

Key that was used to encrypt the data.

#### iv

Type: `buffer`

IV that was used to encrypt the data.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
