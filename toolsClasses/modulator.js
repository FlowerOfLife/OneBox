'use strict'
class toneSequenecer extends boxController {
    constructor(name) {
        super();

        this.setName(name)
        this.setType('osc')
        this.setConnectors(this.oscConnectors(name))
        this.setContent(this.oscContent(name))


    }
    oscContent(name) {
        var self = this;
        var contentScript = document.createElement('script');
        var thisContentDiv = document.createElement('div');
        thisContentDiv.id = name + 'id'
        thisContentDiv.appendChild(document.createElement('br'));

        var startSequencerButton = document.createElement('button');
        startSequencerButton.id = name + 'startButton';
        startSequencerButton.className = 'startSeq'
        startSequencerButton.textContent = 'start';
        var stopSequencerButton = document.createElement('button');
        stopSequencerButton.id = name + 'stopButton';
        stopSequencerButton.className = 'stopSeq'
        stopSequencerButton.textContent = 'stop';

        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(startSequencerButton);

        thisContentDiv.appendChild(stopSequencerButton);
        thisContentDiv.appendChild(document.createElement('br'));
        document.body.appendChild(thisContentDiv)
        console.log("ready!");

        var matrix1 = nx.add('matrix', {
            parent: name + 'id',
            w: 500,
            h: 40
        })
        //console.log(matr)

        console.log('hereeeeeeeeeeeeeeeee')
        matrix1.col = 16;
        matrix1.row = 4;

        matrix1.init();

        var keys = new Tone.MultiPlayer({
            urls: {
                "A": "samples/hihat.wav",
                "C#": "samples/hihat.wav",
                "E": "samples/hihat.wav",
                "F#": "samples/hihat.wav",
            },
            volume: -10,
            fadeOut: 0.1,
        }).toMaster();












        var noteNames = ["F#", "E", "C#", "A"];

        var loop = new Tone.Sequence(function (time, col) {
            console.log(col)
            var column = matrix1.matrix[col];
            for (var i = 0; i < 4; i++) {
                if (column[i] === 1) {
                    //slightly randomized velocities
                    var vel = Math.random() * 0.5 + 0.5;
                      self.keyDown(432)
                  //  keys.start(noteNames[i], time, 0, "32n", 0, vel);
                }
            }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");










        thisContentDiv.appendChild(document.createElement('br'));
        var multisliderFreq = nx.add('multislider', {
            parent: name + 'id',
            w: 500,
            h: 80
        })
        multisliderFreq.sliders = 16
        multisliderFreq.min = 200
        multisliderFreq.max = 800
        multisliderFreq.init()

        thisContentDiv.appendChild(document.createElement('br'));
        var multisliderVel = nx.add('multislider', {
            parent: name + 'id',
            w: 500,
            h: 80
        })
        multisliderVel.sliders = 16
        multisliderVel.min = 200
        multisliderVel.max = 800
        multisliderVel.init()

        startSequencerButton.onclick = function () {
            Tone.Transport.bpm.value = 80;
            Tone.Transport.start();
            loop.start();

        }

        stopSequencerButton.onclick = function () {
            Tone.Transport.stop();
            loop.stop();
        }


        window[self.getName() + "upDown"] = {}
        window[self.getName() + "upDown"].connect = function (envelop) {
            console.log(self.keyboard)

            self.keyDown = function (frequency) {

                console.log(frequency)
                envelop.down(frequency)
                setTimeout(function () {
                    envelop.up(frequency)
                }, 100)
            };

            self.keyUp = function (frequency) {
                console.log(1111111111)
                if (frequency) {
                    self.osc.frequency.value = frequency
                }

                envelop.up(frequency)
                console.log(frequency)
            };





        }

        function play(freq, val) {

        }



        return thisContentDiv
    }





    connect(device) {
        var self = this
        var deviceName = device.getName();
        console.log(window[self.getName()], (window[deviceName]))
        window[self.getName()].connect(window[deviceName])
    }
    oscConnectors(oscName) {
        return [{
            value: oscName + "upDown",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }]
    }
}






function oscX(name) {


}