let hash = require('object-hash')

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
        return this.Chain(-1)[0]
    }

    IsEmpty() {
        return this.Chain.length == 0
    }

}

module.exports = BlockChain