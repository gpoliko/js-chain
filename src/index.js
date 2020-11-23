const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const { Chain } = require('./chain')
const { Transaction } = require('./transaction')

const myKey = ec.keyFromPrivate('1eab648039a8cfe04a18e2b0cff54bf2dd1401e82201af5594c52adfc9c8ae6b')
const walletAddress = myKey.getPublic('hex')

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
const t1 = new Transaction(walletAddress, 'recipient\'s publicKey', 50)
t1.signTransaction(myKey)
gioCoin.addNewTransaction(t1)


console.log('\n Mining a block...')
gioCoin.mineTransactions(walletAddress)
console.log('Balance of gio is', gioCoin.getBalance(walletAddress))

// gioCoin.mineTransactions('gios-address')
// console.log('Balance of gio is', gioCoin.getBalance('gios-addres'))

console.log('Ended:', gioCoin.generateTimeStamp())
// console.log(gioCoin.validateBlockchain())
console.log(JSON.stringify(gioCoin, null, 4))