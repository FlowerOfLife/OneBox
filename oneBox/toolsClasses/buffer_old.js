'use strict'
class buffer extends boxController {
    constructor(name) {
        super();



        this.setName(name)
        this.setType('buffer')
        this.setConnectors(this.oscConnectors(name))
        this.setContent(this.oscContent(name))


    }
    oscContent(name) {
        var self = this
        var contentDiv = document.createElement('div');
        contentDiv.id = self.getName() + "conId";
        var contentScript = document.createElement('script');
        var selectWaveForm = document.createElement('select');



        function mySample(context, buffer) {
            this.context = context;
            this.buffer = buffer;
        };

        mySample.prototype.setup = function () {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(window[self.getName()]);
            window[self.getName() + 'playRate'].connect(this.source.playbackRate);
        };

        //************************************trigger*************************************************
        mySample.prototype.trigger = function (time, freq, vel) {
            
             this.setup();
            if (sampleRate) {
                this.source.playbackRate.value = (freq / 240).toFixed(2);
            }

            if (vel) {
                 window[self.getName()].gain.value = vel;
            }

            var shelf = this
            window[self.getName()].up = function (freq, vel) {
                // window[self.getName()].stop();
                shelf.source.stop(time);
            }
            this.source.start(time);
        };

        var sampleLoader = function (url, context, callback) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    window[self.getName() + 'buffer'] = buffer;
                    callback();
                });
            };

            request.send();
        };

        var sampleRate = 1;
        window[self.getName()] = {};
        window[self.getName()] = context.createGain();
        window[self.getName() + 'playRate'] = context.createGain();
        window[self.getName()].up = function (freq, vel) {
            // window[self.getName()].stop();
        }

        window[self.getName()].down = function (freq, vel) {

            var setup = function () {
                var mySampl = new mySample(context, window[self.getName() + 'buffer']);
                if (freq == undefined) {
                    mySampl.trigger(context.currentTime, sampleRate, vel);
                } else {

                    //******************************trigger*******************************************************
                    mySampl.trigger(context.currentTime, freq, vel);
                }

            }
            sampleLoader('samples/piano.wav', context, setup);



        }



        console.log(contentDiv.id, 7777)
        setTimeout(function () {
            var mySampleRate = nx.add('dial', {
                parent: contentDiv.id,
                w: 50,
                h: 50,
            })

            mySampleRate.on('*', function (data) {
                console.log(data, window[self.getName() + 'playRate'])
                    //  window[self.getName()+'playRate'].value = data.value
                sampleRate = data.value;
            })


            mySampleRate.min = 0
            mySampleRate.max = 2
        }, 100);














        return contentDiv
    }
    connect(device) {
        var self = this
        var deviceName = device.getName();
        console.log(window[self.getName()], (window[deviceName]))
        window[self.getName()].connect(window[deviceName])
    }
    oscConnectors(oscName) {
        return [{
            value: oscName,
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName,
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + 'playRate',
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".playRate.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".frequency.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".source",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".source",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".detune.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".detune.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }]
    }
}






function oscX(name) {


}