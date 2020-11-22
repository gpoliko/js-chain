const { Chain } = require('./chain')
const { Transaction } = require('./transaction')

/*
 * Blockchain testing with hard coded values (blocks)
 */
const gioCoin = new Chain()

console.log('\n............................................................\n')
console.log('.............        gioCoin Blockchain        .............\n')
console.log('............................................................\n')
console.log('\n*** MINING IN PROGRESS ***\n')
console.log('Started:', gioCoin.generateTimeStamp())

// Hard coded blocks to test the blockchain
gioCoin.createTransaction(new Transaction('addy1', 'addy2', 100))
gioCoin.createTransaction(new Transaction('addy2', 'addy1', 50))

console.log('\n Starting the miner...')
gioCoin.mineTransactions('gios-address')
console.log('Balance of gio is', gioCoin.getBalance('gios-address'))

gioCoin.createTransaction(new Transaction('addy1', 'gios-address', 175))
gioCoin.createTransaction(new Transaction('gios-address', 'addy1', 25))
gioCoin.mineTransactions('gios-address')
console.log('Balance of gio is', gioCoin.getBalance('gios-addres'))

console.log('Ended:', gioCoin.generateTimeStamp())
console.log(gioCoin.validateBlockchain())
// console.log(JSON.stringify(gioCoin, null, 4))