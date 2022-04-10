const { readFile } = require('fs/promises');
const { EventEmitter } = require('events');

const time = 'time';

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        try {
            console.time(time);
            const data = await asyncFunc(...args);
            this.emit('data', data);
            console.timeEnd(time);
            this.emit('end');
        }
        catch(e) {
            this.emit('error', e);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => {
    console.log('About to execute');
});
withTime.on('end', () => {
    console.log('Done with execute');
});


try{
    withTime.execute(readFile, __filename);
}
catch(e) {
    console.error(e);
}
