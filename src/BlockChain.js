let hash = require('object-hash')

const TargetHash = 156

let Validator = require("./Validator")

class BlockChain {
    constructor() {

        // Create
        this.Chain = []

        // Transaction
        this.CurrentTransactions = []

    }

    AddNewBlock(PrevHash) {
        let Block = {
            index: this.Chain.length + 1,
            timestamp: Date.now(),
            transactions: this.CurrentTransactions,
            prevHash: PrevHash,
        }

        if(Validator.ProofOfWork() == TargetHash) {
            // Add it to the instance
            // Save it on the Database
            // Console success
        }

        // Put Hash
        this.hash = hash(Block)

        // Add to Chain
        this.Chain.push(Block)
        this.CurrentTransactions = []
        return Block
    }

    AddNewTransaction(Sender, Recipient, Amount) {
        this.CurrentTransactions.push({ Sender, Recipient, Amount })
    }

    LastBlock() {
        return this.Chain.slice(-1)[0]
    }

    IsEmpty() {
        return this.Chain.length == 0
    }

}

module.exports = BlockChain