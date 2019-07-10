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

