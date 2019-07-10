//import express from 'express'
//import Stellar from 'stellar-sdk'

const Stellar = require('stellar-sdk');

// Source account - funded via Friendbot
const sourceSecretKey = 'SAZH2SUUWDWKRJKBD3CUXP54WF4KTDYS6SGQGW2JRPHZRFEZT7IHJ5DD';
const sourceKeyPair = Stellar.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeyPair.publicKey();

// Receiver account - must be created via funding
const receiverPublicKey = 'GDH6IJZ7QE6Q4XLZZGUISFSZQ2ZQXL4VJ3NBKOCK2J2CDDISZNES4UZO';


// Use the Stellar testnet
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();
// let keyPairA = Stellar.Keypair.random()
// let keyPairB = Stellar.Keypair.random()
// let accountA = null
// let accountB = null

/*
server.transactions()
	.forAccount(receiverPublicKey)
	.call()
	.then(function (page) {
		console.log('Page 1: ');
		console.log(page.records);
		return page.next();
	})
	.then(function (page) {
		console.log('Page 2: ');
		console.log(page.records);
	})
	.catch(function (err) {
		console.log(err);
	});
*/

(async function main() {
	// Retrieve the account object in our application
	const account = await server.loadAccount(sourcePublicKey);
	// Use base transaction fee
	const fee = await server.fetchBaseFee();
	// Create a transaction
	const transaction = new Stellar.TransactionBuilder(account, {fee})
		.addOperation(Stellar.Operation.payment({
			destination: receiverPublicKey,
			asset: Stellar.Asset.native(),
			amount: '150.12345',
		}))
		.setTimeout(30)
		.build();
	// Sign transaction with source account's secret key
	transaction.sign(sourceKeyPair);

	console.log(transaction.toEnvelope().toXDR('base64'));

	try {
		const txResult = await server.submitTransaction(transaction);
		console.log(JSON.stringify(txResult, null, 2));
		console.log('\Transaction successful! View the transaction on the Stellar testnet explorer: ');
		//console.log(txResult._links.transaction.href);
		console.log('https://stellar.expert/explorer/testnet/tx/' + txResult.hash);
	} catch (e) {
		console.log('An error has occured:');
		console.log(e);
	}
})().catch( e => { console.error(e) } );