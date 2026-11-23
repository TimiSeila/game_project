'use strict';

export class Tick{
    constructor(tickRate = 64) {
        this.tickRate = tickRate;
        this.currentTick = 0;
        this.callbacks = [];
        this.lastTick = Date.now();
        this.tickTime = 1000 / this.tickRate;
        this.interval = null;
        this.start();
    }

    onTick(callback){
        this.callbacks.push(callback)
    }

    offTick(callback){
        const index = this.callbacks.indexOf(callback);
        if (index > -1){
            this.callbacks.splice(index, 1);
        }
    }

    executeAfter(ticks, callback){
      const tickSystem = this;

        let count = 0;
        const wait = function(){
            if(count >= ticks){
                tickSystem.offTick(wait);

                callback();

                return;
            }

            count++;
        };
        this.onTick(wait);
    }

    tick(){
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback();
        });

        this.currentTick++;
        if (this.currentTick + 1 > this.tickRate){
            this.currentTick = 0;
        }

        let timeStamp = Date.now();
        this.tickLatency = timeStamp - this.lastTick; 
        this.tickDelta = this.tickLatency / 1000; 
        this.lastTick = timeStamp;
    }

    start(){
        if (this.interval){
            return;
        }

        this.interval = setInterval(() => {
            this.tick();
        }, this.tickTime);
    }

     stop(){
        if (!this.interval){
            return;
        }

        clearInterval(this.interval);

        this.interval = null;
    }

}
