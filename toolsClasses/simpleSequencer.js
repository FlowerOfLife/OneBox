'use strict'
class simpleSequencer extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('simpleSequencer')
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

        
        setTimeout(function () {
            var matrix1 = nx.add('matrix', {
                    parent: name + 'id',
                    w: 400,
                    h: 200
                })
                //console.log(matr)

            console.log('hereeeeeeeeeeeeeeeee')
            matrix1.col = 32;
            matrix1.row = 16;
            matrix1.init();

            matrix1.on('*', function (data) {
                console.log(data.list)
                if (data.list) {

                    for (var i = 0; i < 16; i++) {
                        (function (i) {
                            if (data.list[i] == 1) {
                                play(20 * i)
                            }
                        })(i)

                    }

                }

                //   matrix1.jumpToCol(this.playnow)
            })

            startSequencerButton.onclick = function () {
                matrix1.sequence(480);
                matrix1.bpm = 480;
            }

            stopSequencerButton.onclick = function () {
                matrix1.stop();
            }



        }, 100);


        function play(freq) {
            self.keyDown(freq);
            setTimeout(function () {
                self.keyUp(freq);
            }, 100)
        }
        //functionalety
        window[self.getName() + "upDown"] = {}
        window[self.getName() + "upDown"].connect = function (envelop) {
            console.log(self.keyboard)

            self.keyDown = function (frequency) {

//  console.log(note, frequency)
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

        window[self.getName() + "Freq"] = {}
        window[self.getName() + "Freq"].connect = function (osc) {
            self.osc = osc;
            /*
                            keyboard.keyDown = function (note, frequency) {
                            osc.frequency.value = frequency
                            };

                            keyboard.keyUp = function (note, frequency) {
                                console.log(note, frequency)
                                envelop.down()
                            };

            */



        }



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