# RSA Decryption Interactive

**Author:** Alasdair Smith

Allows the encryption of text using the RSA algorithm.

This and `RSA Encryption` were built from scratch to replace `RSA JSEncrypt` by Jack Morgan, and `RSA No Padding` by Heidi Newton and James Browning.

## Modes and Formats

This interactive supports public and private key decryption, as well as padding and no-padding options.

Keys used in the interactive can be one of three formats:

- PKCS #1 (e.g. `-----BEGIN RSA PUBLIC KEY-----, ..., -----END RSA PUBLIC KEY-----`)
- PKCS #8 (e.g. `-----BEGIN PUBLIC KEY-----, ..., -----END PUBLIC KEY-----`)
- Individual RSA Components:
  - e: Public key exponent (assumed to be 0x10001)
  - n: Public key product (n = p.q)
  - p: Private key prime #1
  - q: Private key prime #2
  - d: Private key exponent

Keys in PKCS formats (and messages encrypted with them) are in base64, while those in the Components format are in base16 (hexadecimal).

## Licences

This interactive uses a small portion of [Node.js](https://nodejs.org/en/), as well as [node-rsa](https://github.com/rzcoder/node-rsa) and [BigInteger.js](https://github.com/peterolson/BigInteger.js).
Licences for these can be found in `LICENCE-THIRD-PARTY`, with full copies available in the `third_party_licences` directory.
