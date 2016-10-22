'use strict'
class piano extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('piano')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {
        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var knobDiv = document.createElement('div');
        var keyboardDiv = document.createElement('div');
        keyboardDiv.id = name


        knobDiv.appendChild(document.createElement('br'));
        knobDiv.appendChild(keyboardDiv);
        setTimeout(function () {
            self.keyboard = new QwertyHancock({
                id: name,
                width: 600,
                height: 150,
                octaves: 2,
                startNote: 'A3',
                whiteNotesColour: 'white',
                blackNotesColour: 'black',
                hoverColour: '#f3e939'
            });
        }, 100)

        //functionalety
        window[self.getName() + "upDown"] = {}
        window[self.getName() + "upDown"].connect = function (envelop) {
            console.log(self.keyboard)
            self.keyboard.keyDown = function (note, frequency) {
                console.log(1111111111)
                if(self.osc){
                    self.osc.frequency.value = frequency

                }
                
                envelop.down(frequency)
                console.log(note, frequency)

            };

            self.keyboard.keyUp = function (note, frequency) {
                console.log(note, frequency)
                envelop.up()
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



        return knobDiv
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