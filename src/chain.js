const CryptoJS = require('crypto-js')

/*
 * Author: Giovanni Poliko
 * Project: EDA Personal Project - JavaScript Blockchain
 */
class Block {
    constructor (index, time_of_creation, data, previous_hash) {
        this.index = index
        this.timeOfCreation = time_of_creation
        this.data = data
        this.previousHash = previous_hash
        this.nonce = 0
        this.hash = this.generateHash()
    }

    // Unique hash generation function
    generateHash () {
        const hash =  CryptoJS.SHA512(this.index + this.timeOfCreation + JSON.stringify(this.data) + this.previousHash + this.nonce)

        /* 
        * Hash generation creates a WordArray Object 
        * Need to convert the WordArray Object into a Hex string
        */
        const converted = hash.toString(CryptoJS.enc.Hex)
        return converted
    }

    // Proof of work algorithm
    mineBlock (difficulty) {
        // nonce will continue to increment until the has of the block begins with enough zero's
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
        this.difficulty = 10
    }

    // Generates the first block of the blockchain
    generateGenesis () {
        return new Block(0, this.generateTimeStamp(), 'Genesis Block - First Block in the sick gioCoin JS-CHAIN', '0') 
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

    // Creates a new block in the blockchain
    createNewBlock (newBlock) {
        newBlock.previousHash = this.getCurrentBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.blockchain.push(newBlock)
        console.log(newBlock)
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
gioCoin.createNewBlock(
    new Block(1, gioCoin.generateTimeStamp(), {
        sender: 'Tai', 
        recipient: 'Gio', 
        amount: 100
    })
)

gioCoin.createNewBlock(
    new Block(2, gioCoin.generateTimeStamp(), {
        sender: 'Gio',
        recipient: 'Tai', 
        amount: 300
    })
)

gioCoin.createNewBlock(
    new Block(3, gioCoin.generateTimeStamp(), {
        sender: 'Tai',
        recipient: 'Rod', 
        amount: 300
    })
)

console.log('Ended:', gioCoin.generateTimeStamp())
// console.log(JSON.stringify(gioCoin, null, 2))