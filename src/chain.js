const { generateKeyPair } = require("crypto");
const { realpathSync, readSync } = require("fs");

class Chain {

    constructor () {
        this.blockchain = [this.generateGenesis()]
    }

    generateTimeStamp() {
        let date = new Date()
        const { getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds } = date
        const timeStamp = `${getDate}-${getMonth}-${getFullYear}--${getHours}:${getMinutes}:${getSeconds}`
        return timeStamp
    }

    generateGenesis () {
        return new Block(0, this.generateTimeStamp, 'Genesis Block - First Block in the sick JS-CHAIN', '0')
    }
}