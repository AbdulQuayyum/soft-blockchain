const mongoose = require('mongoose');

let BlockChainModel = require('./Model');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/BlockChain')
    .then(() => {
        console.log('Database is Connected');
        ConnectionCallback();
    })
    .catch(err => {
        console.log('Cannot connect to DB', err);
    });

let ConnectionCallback = () => { };

module.exports.onConnect = (callback) => {
    ConnectionCallback = callback;
};



