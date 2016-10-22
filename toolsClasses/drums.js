'use strict'
class drums extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('knob')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {

        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var thisContentDiv = document.createElement('div');
        thisContentDiv.id = name + 'id'
        thisContentDiv.appendChild(document.createElement('br'));

      var startSequencerButton = document.createElement('button');
        startSequencerButton.id = name + 'startButton';
         startSequencerButton.className= 'startSeq'
        startSequencerButton.textContent = 'start';
        var stopSequencerButton = document.createElement('button');
        stopSequencerButton.id = name + 'stopButton';
         stopSequencerButton.className= 'stopSeq'
        stopSequencerButton.textContent = 'stop';

        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(startSequencerButton);
        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(stopSequencerButton);

        function Kick(context) {
            this.context = context;
        };

        Kick.prototype.setup = function () {
            this.osc = this.context.createOscillator();
            this.gain = this.context.createGain();
            this.osc.connect(this.gain);
            this.gain.connect(this.context.destination)
        };

        Kick.prototype.trigger = function (time) {
            this.setup();

            this.osc.frequency.setValueAtTime(150, time);
            this.gain.gain.setValueAtTime(1, time);

            this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
            this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

            this.osc.start(time);

            this.osc.stop(time + 0.5);
        };

        function Snare(context) {
            this.context = context;
        };

        Snare.prototype.setup = function () {
            this.noise = this.context.createBufferSource();
            this.noise.buffer = this.noiseBuffer();

            var noiseFilter = this.context.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 1000;
            this.noise.connect(noiseFilter);

            this.noiseEnvelope = this.context.createGain();
            noiseFilter.connect(this.noiseEnvelope);

            this.noiseEnvelope.connect(this.context.destination);

            this.osc = this.context.createOscillator();
            this.osc.type = 'triangle';

            this.oscEnvelope = this.context.createGain();
            this.osc.connect(this.oscEnvelope);
            this.oscEnvelope.connect(this.context.destination);
        };

        Snare.prototype.noiseBuffer = function () {
            var bufferSize = this.context.sampleRate;
            var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            var output = buffer.getChannelData(0);

            for (var i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            return buffer;
        };

        Snare.prototype.trigger = function (time) {
            this.setup();

            this.noiseEnvelope.gain.setValueAtTime(1, time);
            this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
            this.noise.start(time)

            this.osc.frequency.setValueAtTime(100, time);
            this.oscEnvelope.gain.setValueAtTime(0.7, time);
            this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            this.osc.start(time)

            this.osc.stop(time + 0.2);
            this.noise.stop(time + 0.2);
        };

        function HiHat(context, buffer) {
            this.context = context;
            this.buffer = buffer;
        };

        HiHat.prototype.setup = function () {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.context.destination);
        };

        HiHat.prototype.trigger = function (time, sampleRate) {
            this.setup();
            if (sampleRate) {
                this.source.playbackRate.value = sampleRate;
            }

            this.source.start(time);
        };

        var sampleLoader = function (url, context, callback) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    window.buffer = buffer;
                    callback();
                });
            };

            request.send();
        };

        var context = new AudioContext();
        var setup = function () {
            var kick = new Kick(context);
            var snare = new Snare(context);
            var hihat = new HiHat(context, window.buffer);
            var HihatsampleRate = 1;


            var matrix1 = nx.add('matrix', {
                    parent: name + 'id',
                    w: 400,
                    h: 200
                })
                //console.log(matr)

            console.log('hereeeeeeeeeeeeeeeee')
            matrix1.col = 16;
            matrix1.row = 3;

            matrix1.init();

            matrix1.on('*', function (data) {
                console.log(data.list)
                if (data.list) {



                    if (data.list[0] == 1) {
                        console.log(kick)
                        kick.trigger(context.currentTime);
                    }
                    if (data.list[1] == 1) {
                        snare.trigger(context.currentTime);
                    }
                    if (data.list[2] == 1) {
                        hihat.trigger(context.currentTime, HihatsampleRate);
                    }



                }

                //   matrix1.jumpToCol(this.playnow)
            })
            startSequencerButton.onclick = function () {
                matrix1.sequence(400);
               // matrix1.bpm = 120;
            }

            stopSequencerButton.onclick = function () {
                matrix1.stop();
            }

            var hihatRate = nx.add('dial', {
                parent: name + 'id',
                w: 50,
                h: 50,
            })

            hihatRate.on('*', function (data) {
                console.log(data)
                HihatsampleRate = data.value;
            })


            hihatRate.min = 0
            hihatRate.max = 2









        };


        sampleLoader('samples/hihat.wav', context, setup);


        return thisContentDiv
    }
    Connectots(knobName) {
        return [{
            value: knobName + "upDown",
            IO: 'OUT',
            type: 'webAudioToAnaliser'
        }, {
            value: knobName + "Freq",
            IO: 'OUT',
            type: 'webAudioToAnaliser'
        }]
    }
}







// drawAnaliser(context, OBJECT, "OBJECT_visual")