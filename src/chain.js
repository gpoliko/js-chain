const { Transaction } = require('./transaction')
const { Block } = require('./block')

/*
 * Author: Giovanni Poliko
 * Project: EDA Personal Project - JavaScript Blockchain
 */

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

    // Mines transactions in the 'queue' - pendingTransactions array
    // Takes an address as a parameter to reward that address (wallet) with cryptocurrency if they successfully mine the block
    mineTransactions (miningRewardAddress) {
        let block = new Block(this.generateTimeStamp(), this.pendingTransactions, this.getCurrentBlock().hash)
        block.mineBlock(this.difficulty)

        console.log('Block successfully mined!')
        this.blockchain.push(block)

        // Reset the pendingTransactions array to a single transaction
        // Single transaction is the cryptocurrency reward for the miner
        // NOTE: This reward transaction must be mined in the next block to be saved to the blockchain
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.reward)
        ]
    }

    // Returns balance of a provided address/wallet
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

module.exports.Chain = Chain