const CryptoJS = require('crypto-js')
class Block {
    constructor (index, time_of_creation, data, previous_hash) {
        this.index = index
        this.timeOfCreation = time_of_creation
        this.data = data
        this.previousHash = previous_hash
        this.hash = this.generateHash()
    }

    // Unique hash generation function
    generateHash () {
        const hash =  CryptoJS.SHA512(this.index + this.timeOfCreation + JSON.stringify(this.data) + this.previousHash)

        /* 
        * Hash generation creates a WordArray Object 
        * Need to convert the WordArray Object into a Hex string
        */
        const converted = hash.toString(CryptoJS.enc.Hex)
        return converted
    }
}

class Chain {
    constructor () {
        this.blockchain = [this.generateGenesis()]
    }

    // Generates the first block of the blockchain
    generateGenesis () {
        return new Block(0, this.generateTimeStamp(), 'Genesis Block - First Block in the sick gioCoin JS-CHAIN', '0')
    }

    // Returns the newest block in the blockchain.
    // Helper method for validation when adding a new block
    getCurrentBlock () {
        const currBlock = this.blockchain[this.blockchain.length - 1]
        console.log(this.blockchain)
        // console.log(currBlock)
        return currBlock
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
        newBlock.hash = newBlock.generateHash()
        this.blockchain.push(newBlock)
    }
}

const gioCoin = new Chain()

console.log('\n............................................................\n')
console.log('.............        gioCoin Blockchain        .............\n')
console.log('............................................................\n')
console.log('\n*** MINING IN PROGRESS ***\n')

// Hard coded blocks to test the blockchain
gioCoin.createNewBlock(
    new Block(1, '19/11/2020-19:22:13', {
        sender: 'Gio', 
        recipient: 'Tom', 
        amount: 30
    })
)

gioCoin.createNewBlock(
    new Block(1, '19/11/2020-19:23:07', {
        sender: 'Tom',
        recipient: 'Gio', 
        amount: 15
    })
)

// console.log(JSON.stringify(gioCoin, null, 2))