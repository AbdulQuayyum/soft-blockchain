let Database = require("./src/Database/Index")
Database.onConnect(() => {
    // let dotenv = require('dotenv')
    let hash = require('object-hash')

    let BlockChain = require("./src/BlockChain")
    let ConnectDB = require("./src/Database/DB")

    let NewBlockChain = new BlockChain
    let PROOF = 156

    // Connect to Database
    // ConnectDB()

    // if (ProofOfWork() == PROOF) {
    //     NewBlockChain.AddNewTransaction("Ajani Ajanlekoko", "Ayinla Akerekoro", 200)
    //     let PrevHash = NewBlockChain.LastBlock() ? NewBlockChain.LastBlock().hash : null;
    //     NewBlockChain.AddNewBlock(PrevHash)
    // }

    NewBlockChain.AddNewTransaction("Ajani Ajanlekoko", "Ayinla Akerekoro", 200)
    NewBlockChain.AddNewBlock(null)

    console.log("Chain: ", NewBlockChain.Chain)

})