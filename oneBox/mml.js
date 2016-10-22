'use strict'
class mml extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('mml')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {
        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var thisContentDiv = document.createElement('div');
        var mmlInput = document.createElement('input');
        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(mmlInput);
        thisContentDiv.appendChild(document.createElement('br'));
    


        thisContentDiv.id = name + 'id'
        thisContentDiv.appendChild(document.createElement('br'));

        var startSequencerButton = document.createElement('button');
        startSequencerButton.id = name + 'startButton';
        startSequencerButton.className= 'startSeq'
        startSequencerButton.textContent = 'start';
        var stopSequencerButton = document.createElement('button');
        stopSequencerButton.id = name + 'stopButton';
        stopSequencerButton.setAttribute('className', 'stopSeq');
        stopSequencerButton.textContent = 'stop';

        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(startSequencerButton);
        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(stopSequencerButton);






     //   mmlInput.value = "v127t120o4<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<a8>c+8e8<a8>c+8e8<a8>d8f+8<a8>d8f+8<g+8>c8f+8<g+8>c+8e8<g+8>c+8d+8<f+8>c8d+8<c+8g+8>c+8<g+8>c+8e8<g+8>c+8e8<g+8>c+8e8<g+8>d+8f+8<g+8>d+8f+8<g+8>d+8f+8<g+8>d+8f+8<g+8>c+8e8<g+8>c+8e8<a8>c+8f+8<a8>c+8f+8<g+8b8>e8<g+8b8>e8<a8b8>d+8<a8b8>d+8<g+8b8>e8<b8>e8g+8<b8>e8g+8<b8>e8g+8<b8>f+8a8<b8>f+8a8<b8>f+8a8<b8>f+8a8<b8>e8g+8<b8>e8g+8c8f+8g+8c+8e8g+8d+8f+8g+8d+8f+8g+8e8g+8>c+8<e8g+8>c+8<d8f+8a8d8f+8a8c8f+8g+8c8f+8g+8c+8e8g+8c+8e8g+8c+8f8g+8c+8f8g+8c+8f+8a8c+8f+8a8c+8f+8a8c+8f+8a8c+8f8g+8c+8f8g+8c+8f8g+8c+8f8g+8c+8f+8a8c+8f+8a8c+8f+8a8c+8f+8a8c+8f8g+8c+8t60o4r1r1r1r1r1r1";
 mmlInput.value =  "v100t120o5r2r1r2rl8>c+c+c+<bab4a>c+<a16a16ba>c+4rc+c+c+c+<baba>c+4<b4ag+f+4r2rl16f+g+f+8r4f+g+f+4r8f+g+f+4r1r1l8r>c+c+c+<bab4a>c+<a16a16ba>c+.r8r16c+c+c+c+<bab4a>c+<b4ag+f+4.r4f+4f+>"
        mmlInput.id = name + "MmlText";
        let mml = mmlInput.value



 startSequencerButton.onclick = function () {
               playm(mml)
            }

            stopSequencerButton.onclick = function () {
    
            }






        function mtof(noteNumber) {
            return 432 * Math.pow(2, (noteNumber - 69) / 12);
        }

        function playm(mml) {
            var config = {
              //  context: audioContext
            };

            var  mmlEmitter = new MMLEmitter(mml, config);

            mmlEmitter.on("note", function (e) {
                console.log("NOTE: " + JSON.stringify(e));
                play(mtof(e.noteNumber), e.duration);
            });
            mmlEmitter.on("end:all", function (e) {
                console.log("END : " + JSON.stringify(e));
                mmlEmitter.stop();
            });

            mmlEmitter.start();
        }

        self.keyDown = function (frequency) {
            console.log(1111111111)
            self.osc.frequency.value = frequency
            envelop.up()
            console.log(frequency)

        };

        self.keyUp = function (frequency) {
            //  console.log(note, frequency)
            envelop.down()
        };

        function play(freq, duration) {
            self.keyDown(freq);
            setTimeout(function () {
                self.keyUp(freq);
            }, duration)
        }
        //functionalety
        window[self.getName() + "upDown"] = {}
        window[self.getName() + "upDown"].connect = function (envelop) {
            console.log(self.keyboard)

            self.keyDown = function (frequency) {
                console.log(1111111111)
                self.osc.frequency.value = frequency
                envelop.up()
                console.log(frequency)

            };

            self.keyUp = function (frequency) {
                //  console.log(note, frequency)
                envelop.down()
            };





        }

        window[self.getName() + "Freq"] = {}
        window[self.getName() + "Freq"].connect = function (osc) {
            self.osc = osc;
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