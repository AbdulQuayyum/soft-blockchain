let hash = require('object-hash')

const TargetHash = 1560

module.exports.ValidateProof = () => {
    let GuessHash = hash(proof)
    console.log("Hashing: ", GuessHash)
    return GuessHash == hash(TargetHash)
}

module.exports.ProofOfWork = () => {
    let proof = 0
    while (true) {
        if (!module.exports.ValidateProof(proof)) {
            proof++
        } else {
            break
        }
    }
    return hash(proof)
}