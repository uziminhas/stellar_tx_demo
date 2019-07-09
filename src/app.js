import express from 'express'
import Stellar from 'stellar-sdk'

/* Use the Stellar testnet */
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
Stellar.Network.useTestNetwork()


