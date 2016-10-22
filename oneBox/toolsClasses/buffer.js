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



        var fileInput = document.createElement("INPUT");
        fileInput.setAttribute("type", "file");

        fileInput.onchange = function () {
            var url = URL.createObjectURL(this.files[0]);
            console.log(url);
            sampleLoader(url);
        };
        contentDiv.appendChild(fileInput)


        //**********************Create gain****************************************
        window[self.getName()] = {};
        window[self.getName()] = context.createGain();

        //**********************Buffer source****************************************
        function playSound(thisBuffer, freq, vel) {
            var source = context.createBufferSource();
            //window[self.getName()].gain.value = 0;
            if (freq) {
                source.playbackRate.value = (freq / 240).toFixed(2);
            }

            if (vel) {
                window[self.getName()].gain.value = vel / 100;
            }
            //load buffer
            source.buffer = thisBuffer;
            //connect gain
            source.connect(window[self.getName()]);
            //start play
            source.start();
        }



        //**********************SalmpeLoader****************************************
        var thisBuffer = [];
        var sampleLoader = function (url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    thisBuffer = buffer
                });
            };

            request.send();
        };



        //**********************UP DOWN PRESS****************************************
        window[self.getName()].up = function (freq, vel) {
            // window[self.getName()].stop();
        }

        window[self.getName()].down = function (freq, vel) {


            if (freq == undefined) {
                mySampl.trigger(context.currentTime, sampleRate, vel);
            } else {

                //******************************PLAY*******************************************************
                playSound(thisBuffer, freq, vel)
            }



        }



        //******************************init*******************************************************
        //sampleLoader('samples/piano.wav');
        sampleLoader('samples/guitar.wav');


        //******************************Controls*******************************************************

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