class Transaction {
    constructor (senderAddress, recipientAddress, amount) {
        this.senderAddress = senderAddress
        this.recipientAddress = recipientAddress
        this.amount = amount
    }
}

module.exports.Transaction = Transaction