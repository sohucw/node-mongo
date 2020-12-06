const Web3 = require('web3');
const fs = require('fs');

const {createUserBids} = require('./controllers/userBids');
const {createUsers} = require('./controllers/users');

function getBids(contract, index) {
    contract.methods.getBid(index).call(async (err, data) => {
        // 保存用户订单数据
        await createUserBids(err, data);
    });
}

module.exports = function getData() {
    const rpcURL =
        'https://kovan.infura.io/v3/2cc44ba2af1d4142b166509013cf3b05';
    const address = '0x8543c0dbd984b4abf7b2323642b9caf6ab410b6f';

    const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));

    const web3 = new Web3(rpcURL);
    const contract = new web3.eth.Contract(abi, address);

    let bidder_cnt = 0;
    contract.methods.bidderCount().call((err, result) => {
        console.log(result);
        bidder_cnt = result;
        for (let i = 0; i < bidder_cnt; ++i) {
            contract.methods.bidders(i).call((err, addr) => {
                contract.methods.bidderAmount(addr).call(async (err, data) => {
                    // console.log('addr', addr, 'amount', data);
                    // 保存用户信息数据
                    await createUsers(err, {addr, amount: data});
                });
                contract.methods.userBidsIndex(addr).call((err, data) => {
                    // console.log('addr', addr, 'bids', data);
                    for (let j = 0; j < data.length; ++j) {
                        getBids(contract, data[j]);
                    }
                });
            });
        }
    });
};
