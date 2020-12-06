const Web3 = require('web3');
const fs = require('fs');
const {createUserEvents} = require('./controllers/userEvents.js');
const {createUserEventCounts} = require('./controllers/userEventCounts.js');
const UserEvent = require('./models/UserEvent.js');
const QueueTask = require('./utils/QueueTask.js');

const saveDataTask = (data) => async () => {
    try {
        console.log('save userEvents start');
        // UserEvents表 去重
        // 如果该条数据transactionHash存在，就不会进行任何操作
        const element = data;
        const userEvent = await UserEvent.findOne({
            transactionHash: element.transactionHash
        });

        if (!userEvent) {
            await createUserEventCounts(element);
            await createUserEvents(element);
            console.log('save userEvents end');
        }
    } catch (error) {
        console.error('save userEvents error', error);
    } finally {
        console.log('save userEvents finally');
    }
};

module.exports = async function getDataForWs() {
    const web3 = new Web3(
        'wss://kovan.infura.io/ws/v3/2cc44ba2af1d4142b166509013cf3b05'
    );

    const address = '0xdcda898dd1d6008b0c5978c5c4f0b8a1605ed82f';

    const abi = JSON.parse(fs.readFileSync('abi.json', 'utf8'));

    // get history events
    const contract = new web3.eth.Contract(abi, address);

    let fromBlock = 0;
    try {
        // 获取blockNumber最大值元素
        const maxItem = await UserEvent.find({})
            .limit(1)
            .sort({blockNumber: -1});

        // 从哪一个值开始
        fromBlock = maxItem.length === 0 ? 0 : maxItem[0].blockNumber;
    } catch (error) {
        console.error('error', error);
    }

    const queueTask = new QueueTask();

    const subscription = contract.events
        .allEvents(
            {
                fromBlock
            },
            function (error, result) {
                if (error || result == null) {
                    console.log(
                        'Error when watching incoming transactions: ',
                        error.message
                    );
                    return;
                }
                // else
                //   console.log('something back', result)
            }
        )
        .on('connected', function (subscriptionId) {
            console.log('subscriptionId:', subscriptionId);
        })
        .on('data', (data) => {
            // saveDataTask 必须是以队列的方式存储执行
            // 也就是说[p1, p2, p3] 按顺序执行

            queueTask.cache.push({
                method: saveDataTask(data),
                id: Math.random() + ''
            });
            queueTask.trigger();
        })
        .on('changed', function (log) {
            console.log('on changed', log);
        })
        .on('error', function (error) {
            console.log('on error:', error);
        });
};
