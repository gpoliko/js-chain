const CryptoJS = require('crypto-js')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
    constructor (senderAddress, recipientAddress, amount) {
        this.senderAddress = senderAddress
        this.recipientAddress = recipientAddress
        this.amount = amount
    }


    // Unique hash function for each transaction
    generateHash () {
        const hash = CryptoJS.SHA256(this.senderAddress + this.recipientAddress + this.amount)
        const converted = hash.toString(CryptoJS.enc.Hex)
        return converted
    }

    // Signing of the transaction using the user's private/public keypair
    signTransaction (signingKey) {

        // Check before signing the transaction
        // Validate if the signingKey(publicKey) is equal to the senderAddress
        if (signingKey.getPublic('hex') !== this.senderAddress) {
            console.log('Cannot sign transactions for a different wallet')
        }

        // Hashing the transaction
        const hashTransaction = this.generateHash()

        // Creating a signature using the signing key and siging the hashed transaction
        const sig = signingKey.sign(hashTransaction, 'base64')

        // Storing the signature into the transaction
        this.signature = sig.toDER('hex')
    }

    // Check's if the signature on the transaction is valid
    isValid () {
        // Validating "reward" transaction
        if (this.senderAddress === null ) return true

        // Validating for signed transaction
        if(!this.signature || this.signature.length === 0) {
            console.log('No signature found for this transaction')
        }

        // Create new publicKey obj from the senderAddress
        // senderAddress is the publicKey
        // Verify that the transaction has been signed by the correct key
        const publicKey = ec.keyFromPublic(this.senderAddress, 'hex')
        return publicKey.verify(this.generateHash(), this.signature)
    }
}

module.exports.Transaction = Transaction