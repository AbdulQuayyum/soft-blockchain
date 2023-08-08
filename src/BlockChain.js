let chalk = require("chalk");
let hash = require('object-hash')
let mongoose = require('mongoose')

let BlockChainModel = mongoose.model("BlockChain")
let Validator = require("./Validator")
const TargetHash = 1560

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

        if (Validator.ProofOfWork() == TargetHash) {
            Block.hash = hash(Block)
            // Add it to the instance Save it on the Database Console success
            let NewBlock = new BlockChainModel(this.Block)
            NewBlock.save((err) => {
                if (err) {
                    console.log(chalk.red("Canot save Block to Database", err.message))
                } else {
                    console.log(chalk.green("Block saved to Database successfully"))
                }
            })

            // Add to Chain
            this.Chain.push(Block)
            this.CurrentTransactions = []
            return Block
        }
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