const CryptoJS = require('crypto-js')

/*
 * Author: Giovanni Poliko
 * Project: EDA Personal Project - JavaScript Blockchain
 */

class Transaction {
    constructor (senderAddress, recipientAddress, amount) {
        this.senderAddress = senderAddress
        this.recipientAddress = recipientAddress
        this.amount = amount
    }
}

class Block {
    constructor (time_of_creation, transactions, previous_hash) {
        this.timeOfCreation = time_of_creation
        this.transactions = transactions
        this.previousHash = previous_hash
        this.nonce = 0
        this.hash = this.generateHash()
    }

    // Unique hash generation function
    generateHash () {
        const hash =  CryptoJS.SHA512(this.timeOfCreation + this.transactions + this.previousHash + this.nonce)

        /* 
        * Hash generation creates a WordArray Object 
        * Need to convert the WordArray Object into a Hex string
        */
        const converted = hash.toString(CryptoJS.enc.Hex)
        return converted
    }

    // Proof of work algorithm
    mineBlock (difficulty) {
        // nonce will continue to increment until the hash of the block begins with enough zero's
        // amount of required zero's is defined as difficulty
        while (this.hash.substr(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.generateHash()
        }
        // console.log('Array:', Array(difficulty + 1).join('0'))
        console.log('\nMINED BLOCK:', this.hash)
    }
}
class Chain {
    
    // Set proof of work difficult rate
    constructor () {
        this.blockchain = [this.generateGenesis()]
        this.difficulty = 3
        this.pendingTransactions = []
        this.reward = 50
    }

    // Generates the first block of the blockchain
    generateGenesis () {
        const genesisBlock = new Block(this.generateTimeStamp(), 'Genesis Block - First Block in the sick gioCoin JS-CHAIN', '0') 
        console.log('---   GENESIS BLOCK   ---')
        console.log(genesisBlock)
        return genesisBlock
    }

    // Returns the newest block in the blockchain.
    // Helper method for validation when adding a new block
    getCurrentBlock () {
        return this.blockchain[this.blockchain.length - 1]
        // console.log(this.blockchain)
        // console.log(currBlock)
    }

    // Generates a time to record the creation time of a new block
    generateTimeStamp() {
        let date = new Date()
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        const hour = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()
        const timeStamp = `${day}-${month}-${year}--${hour}:${min}:${sec}`
        // console.log(timeStamp)
        return timeStamp
    }

    createTransaction (transaction) {
        this.pendingTransactions.push(transaction)
    }

    mineTransactions (miningRewardAddress) {
        let block = new Block(this.generateTimeStamp(), this.pendingTransactions, this.getCurrentBlock().hash)
        block.mineBlock(this.difficulty)

        console.log('Block successfully mined!')
        this.blockchain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.reward)
        ]
    }

    getBalance (address) {
        let balance = 0
        for (const block of this.blockchain) {
            console.log(block)
            for (const trans of block.transactions) {
                if (trans.senderAddress === address) {
                    balance -= trans.amount
                }

                if (trans.recipientAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }

    // Validating the blockchain
    validateBlockchain() {
        // Loop starts at index 1 of the blockchain array
        // because we cannot compare anything before the genesis block
        for (let i = 1; this.blockchain.length; i++){
            const current = this.blockchain[i]
            const previous = this.blockchain[i - 1]

            // Validate if current block's hash has not changed
            // break loop if current block's hash has changed
            if (current.hash !== current.generateHash()){
                return false
            }

            // Validate if current block's previous hash matches the previous block's hash
            // break loop if the hashes do not match
            if (current.previousHash !== previous.hash){
                return false
            }
            return true
        }
    }
}


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