# stellar_tx_demo
Demo project to test sending XLM funds to a wallet.

## Installation
Install GnuPG on the command line to decrypt GPG private keys:

``
brew install gnupg
``

## Decrypting GPG private key

Execute in terminal inside a folder which contains the following files: private-key.gpg, decryption-password.txt

``
gpg --output doc --decrypt private-key.gpg
``

The output of the prior command is a doc.txt file which contains the secret key of a funded account (i.e. source account).

## Getting started / running the application
``
$ npm install
``
