let hash = require('object-hash')

module.exports.ValidateProof = () => {
    let GuessHash = hash(proof)
    console.log("Hashing: ", GuessHash)
    return GuessHash == hash(PROOF)
}

module.exports.ProofOfWork = () => {
    let proof = 0
    while (true) {
        if (!ValidateProof(proof)) {
            proof++
        } else {
            break
        }
    }
    return hash(proof)
}