
class Chain {

    constructor () {
        this.blockchain = [this.generateGenesis()]
    }

    // Generates a time to record the creation time of a new block
    generateTimeStamp() {
        let date = new Date()
        const { getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds } = date
        const timeStamp = `${getDate}-${getMonth}-${getFullYear}--${getHours}:${getMinutes}:${getSeconds}`
        return timeStamp
    }

    // Generates the first block of the blockchain
    generateGenesis () {
        return new Block(0, this.generateTimeStamp, 'Genesis Block - First Block in the sick JS-CHAIN', '0')
    }

    // Returns the newest block in the blockchain.
    // Helper method for validation when adding a new block
    getCurrentBlock () {
        return this.blockchain[this.blockchain - 1]
    }

    // Create
    createNewBlock (newBlock) {
        newBlock.previousHash = this.getCurrentBlock().hash
        newBlock.has = newBlocklock.generateHash()
        this.blockchain.push(newBlock)
    }
}