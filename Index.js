let BlockChain = require("./src/BlockChain")

let NewBlockChain = new BlockChain

let hash = require('object-hash')

let PROOF = 156

let ValidateProof = (proof) => {
    let GuessHash = hash(proof)
    console.log("Hashing: ", GuessHash)
    return GuessHash == hash(PROOF)
}

let ProofOfWork = () => {
    let proof = 0
    while (true) {
        if (!ValidateProof(proof)) {
            proof++
        } else {
            break
        }
    }
    return proof
}

if (ProofOfWork() == PROOF) {
    NewBlockChain.AddNewTransaction("Ajani Ajanlekoko", "Ayinla Akerekoro", 200)
    let PrevHash = NewBlockChain.LastBlock() ? NewBlockChain.LastBlock().hash : null;
    NewBlockChain.AddNewBlock(PrevHash)
}

console.log("Chain: ", NewBlockChain.Chain)