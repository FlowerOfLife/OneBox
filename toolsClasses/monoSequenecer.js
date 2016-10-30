'use strict'
class monoSequenecer extends boxController {
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
        matrix1.row = 1;

        matrix1.init();

        matrix1.on('*', function (data) {

            console.log();
            // console.log(data)
            if (data.list) {

                for (var i = 0; i < 16; i++) {
                    (function (i) {

                        if (data.list[i] == 1) {
                             console.log(matrix1.place,multisliderFreq.val[matrix1.place+1]*1000,multisliderVel.val[matrix1.place+1],multisliderFreq.val)
  self.keyDown (multisliderFreq.val[matrix1.place]*1000,multisliderVel.val[matrix1.place])
                             
                        }
                    })(i)

                }

            }
        })

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
            matrix1.sequence(480);
            matrix1.bpm = 480;
        }

        stopSequencerButton.onclick = function () {
            matrix1.stop();
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
                if(frequency){
                self.osc.frequency.value = frequency
                }
               
                envelop.up(frequency)
                console.log(frequency)
            };





        }

function play(freq,val){

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
            value: oscName+ "upDown",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }]
    }
}






function oscX(name) {


}