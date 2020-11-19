import CryptoJS from 'crypto-js'

class Block extends React.Component {

    constructor (index, time_of_creation, data, previous_hash) {
        this.index = index
        this.timeOfCreation = time_of_creation
        this.data = data
        this.previousHash = previous_hash
        this.hash = this.generateHash()
    }

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

export default Block