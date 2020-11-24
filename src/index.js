const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const { Chain } = require('./chain')
const { Transaction } = require('./transaction')

// Random person's Private/Public Keys
const niceGuysKey = ec.keyFromPrivate('9e316f4318cda01d9671a6bd6ce2fab64615ebd50a479543008834d11f3fae3f')
const niceGuysWallet = niceGuysKey.getPublic('hex')

// Gio's Private/Public Keys
const giosKey = ec.keyFromPrivate('1eab648039a8cfe04a18e2b0cff54bf2dd1401e82201af5594c52adfc9c8ae6b')
const giosWallet = giosKey.getPublic('hex')

// Don's Private/Public Keys
const donsKey = ec.keyFromPrivate('37aa5b7658a7712bd217bd18ce63383108dfe8fec1297c6d9b8143778301c05c')
const donsWallet = donsKey.getPublic('hex')

/*
 * Blockchain testing with hard coded values (blocks)
 */
const gioCoin = new Chain()

console.log('\n............................................................\n')
console.log('.............        gioCoin Blockchain        .............\n')
console.log('............................................................\n')
console.log('\n*** MINING IN PROGRESS ***\n')
console.log('Started:', gioCoin.generateTimeStamp())


// Hard coded Transactions

/*
 * Creating a new transaction
 * niceGuy sending Gio 150 gioCoins
 * Transaction signed with niceGuy's private key (authorizing the transaction)
 * Transaction is mined by Don - rewarding Don with gioCoins
 */
const t1 = new Transaction(niceGuysWallet, giosWallet, 150)
t1.signTransaction(niceGuysKey)
gioCoin.addNewTransaction(t1)
console.log('\n Mining a block...')
gioCoin.mineTransactions(donsWallet)
console.log('Gio\'s balance:', gioCoin.getBalance(giosWallet))
console.log('Don\'s balance:', gioCoin.getBalance(donsWallet))

const t2 = new Transaction(giosWallet, donsWallet, 50)
t2.signTransaction(giosKey)
gioCoin.addNewTransaction(t2)
console.log('\n Mining a block...')
gioCoin.mineTransactions(niceGuysWallet)
console.log('Gio\'s balance:', gioCoin.getBalance(giosWallet))
console.log('Don\'s balance:', gioCoin.getBalance(donsWallet))

console.log()
// console.log('Ended:', gioCoin.generateTimeStamp())

// Check if the blockchain is valid and hasn't been tampered with
// console.log('Blockchain is valid:', gioCoin.validateBlockchain())
// console.log(JSON.stringify(gioCoin, null, 2))
