# stellar_tx_demo
Demo project to test sending XLM funds to a wallet.

## Installation
Install GnuPG on the command line to decrypt GPG private keys:

``
brew install gnupg
``

## Decrypt GPG private key to generate secret key of a source account

Execute in terminal inside a folder which contains the following files: private-key.gpg, decryption-password.txt

``
gpg --output doc --decrypt private-key.gpg
``

Enter the passphrase from "decryption-password.txt" when prompted:

<img src="https://github.com/uziminhas/stellar_tx_demo/blob/master/enter_passphrase.png" width="500">
The output of the prior command is a doc.txt file which contains the secret key of a funded account (i.e. source account).

## Getting started
``
$ npm install
``

## Running the application
1) Navigate into the "src" directory and run the application using node:

``
$ node app.js
``

2) The terminal outputs the option to transfer TXLM.

<img src="https://github.com/uziminhas/stellar_tx_demo/blob/master/command_line.png" width="500">

3) The successful transaction can be viewed on the Stellar testnet explorer at:

https://stellar.expert/explorer/testnet/tx/94ed923eddfb58bc5c46a0ea9885aa91009756b5a27d3eadfd88e01380d9b710

<img src="https://github.com/uziminhas/stellar_tx_demo/blob/master/successful_transaction.png" width="500">


Note: Remaining balance in source account (after transfer of 8.5 TXLM) is 1.5 TXLM. Enter a positive number less than 1.5 TXLM to test additional transfers.
