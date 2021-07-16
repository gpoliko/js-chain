const CryptoJS = require('crypto-js')

class Block {
    constructor (time_of_creation, transactions, previous_hash) {
        this.timeOfCreation = time_of_creation
        this.transactions = transactions
        this.previousHash = previous_hash
        this.nonce = 0
        this.hash = this.generateHash()
    }

    // Unique hash generation function for each block
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
        while (this.hash.substr(0, difficulty) !== Array(difficulty + 2).join('0')) {
            this.nonce++
            this.hash = this.generateHash()
        }
        console.log('\nMINED BLOCK:', this.hash)
    }

    // Function to validate all transactions within the block are valid (signed)
    transactionsAreValid () {
        for (const transaction of this.transactions) {
            if (!transaction.isValid()) {
                return false
            }
        
            return true
        }
    }
}

module.exports.Block = Block