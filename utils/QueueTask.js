/**
 * @file 异步队列
 * @desc 传入cache缓存队列，或者动态添加删除cache，trigger方法触发执行队列任务
 */
module.exports = class QueueTask {
    constructor(cache) {
        this.cache = cache || [];
        this.running = false;
    }

    loop = async (locCache) => {
        for (const element of locCache) {
            try {
                await element.method();

                const delIndex = locCache.findIndex((i) => i.id === element.id);
                if (delIndex !== -1) {
                    locCache.splice(delIndex, 1);
                }
            } catch (error) {
                console.error('error', error);
            }
        }
    };

    trigger = async () => {
        if (this.running === true) {
            return;
        }

        this.running = true;

        try {
            await this.loop(this.cache);
        } catch (error) {
            console.log('error', error);
        } finally {
            this.running = false;
            if (this.cache.length > 0) {
                this.trigger();
            }
        }
    };
};

// how use

// let number = 0;
// const task = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             number++;
//             console.log('number', number);
//             resolve();
//         }, 1000);
//     });
// };

// const p1 = new QueueTask();
// let count = 0;
// const interId = setInterval(() => {
//     count++;
//     if (count >= 10) {
//         clearInterval(interId);
//     }
//     p1.cache.push({id: Math.random() + '', method: task});
//     p1.trigger();
// }, 100);
