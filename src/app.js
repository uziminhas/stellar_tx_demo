const Stellar = require('stellar-sdk');
const readline = require('readline');
let amount;

// Source account - funded via Friendbot
const sourceSecretKey = 'SCNEG4I37ZHR7WM7O24DYLAAEJGZASDXMKC7ARXOD5HL6FJTTUSPDG2E'; // decrypted using GPG
const sourceKeyPair = Stellar.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeyPair.publicKey();

// Receiver account - must be created via funding
const receiverPublicKey = 'GCFW3WDOYTJSKXDUXNV6QVRUP4WF7GAAOBZ3FI37K42OJW65VYSONKG6'; // provided by client
let memo = Stellar.Memo.id('15');

// Use the Stellar testnet
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
Stellar.Network.useTestNetwork();

// Use readline module
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Accept user input from command line
rl.question('Please input amount of TXLM to transfer: ', (answer) => {
	amount = answer;
	console.log(`Initiating transfer of ${answer}` + ' TXLM...');

	(async function transfer() {

	// Retrieve the account object in our application
	const account = await server.loadAccount(sourcePublicKey);

	// Use base transaction fee
	const baseFee = await server.fetchBaseFee();

	// Create a transaction
	const transaction = new Stellar.TransactionBuilder(account, {
		fee: baseFee,
		memo: memo
	})
		.addOperation(Stellar.Operation.payment({
			destination: receiverPublicKey,
			asset: Stellar.Asset.native(),
			amount: '' + amount + '',
		}))
		.setTimeout(30)
		.build();

	// Sign transaction with source account's secret key
	transaction.sign(sourceKeyPair);

	//console.log(transaction.toEnvelope().toXDR('base64'));

	try {
		const txResult = await server.submitTransaction(transaction);
		//console.log(JSON.stringify(txResult, null, 2));
		console.log('\Transaction successful! View the transaction on the Stellar testnet explorer: ');
		//console.log(txResult._links.transaction.href);
		console.log('https://stellar.expert/explorer/testnet/tx/' + txResult.hash);
	} catch (e) {
		console.log('An error has occured:');
		console.log(e);
	}
	})().catch( e => { console.error(e) } );

	rl.close();
});