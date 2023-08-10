const fs = require('fs');
const SHA256 = require("crypto-js/sha256")

class CryptoBlock {
    constructor(index, timestamp, data, precedingHash = " ") {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.precedingHash = precedingHash
        this.hash = this.ComputeHash()
        this.nonce = 0
    }

    ComputeHash() {
        return SHA256(
            this.index +
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString()
    }

    ProofOfWork(Difficulty) {
        while (
            this.hash.substring(0, Difficulty) !== Array(Difficulty + 1).join("0")
        ) {
            this.nonce++
            this.hash = this.ComputeHash()
        }
    }
}

class CryptoBlockChain {
    constructor() {
        this.Blockchain = [this.StartGenesisBlock()]
        this.Difficulty = 4
    }

    StartGenesisBlock() {
        return new CryptoBlock(0, "31/12/2022", "Initial Block in the Chain", "0")
    }

    ObtainLatestBlock() {
        return this.Blockchain[this.Blockchain.length - 1]
    }

    AddNewBlock(NewBlock) {
        NewBlock.precedingHash = this.ObtainLatestBlock().hash
        // NewBlock.hash = NewBlock.ComputeHash()
        NewBlock.ProofOfWork(this.Difficulty)
        this.Blockchain.push(NewBlock)
    }

    CheckChainValidity() {
        for (let i = 1; i < this.Blockchain.length; i++) {
            const CurrentBlock = this.Blockchain[i]
            const PrecedingBlock = this.Blockchain[i - 1]

            if (CurrentBlock.hash !== CurrentBlock.ComputeHash()) {
                return false
            } if (CurrentBlock.precedingHash !== PrecedingBlock.hash)
                return false
        }
        return true
    }
}

let TheBlockChainCoder = new CryptoBlockChain()

// console.log("TheBlockChainCoder is mining...")

// TheBlockChainCoder.AddNewBlock(
//     new CryptoBlock(1, "01/02/2023", {
//         sender: "Ayinla Akerekoro",
//         recepient: "Ajani Ajanlekoko",
//         quantity: 50,
//     })
// )

// console.log(JSON.stringify(TheBlockChainCoder, null, 4))

// Read transactions from JSON file
fs.readFile('Data/Dummy.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    const transactions = JSON.parse(data);

    console.log('TheBlockChainCoder is mining...');

    transactions.forEach(transaction => {
        const { id, timestamp, transaction: { sender, recepient, quantity } } = transaction;
        TheBlockChainCoder.AddNewBlock(new CryptoBlock(id, timestamp, { sender, recepient, quantity }));
    });

    console.log(JSON.stringify(TheBlockChainCoder, null, 4));
});