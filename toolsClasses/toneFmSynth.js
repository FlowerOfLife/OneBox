'use strict'
class toneFmSynth extends boxController {
    constructor(name) {
        super();

        this.setName(name)
        this.setType('toneFmSynth')
        this.setConnectors(this.oscConnectors(name))
        this.setContent(this.oscContent(name))


    }
    oscContent(name) {
        var self = this
        var contentDiv = document.createElement('div');
        contentDiv.id = self.getName() + "conId";
        var contentScript = document.createElement('script');
        var selectWaveForm = document.createElement('select');


        var sine = document.createElement("option");
        sine.text = "sine";
        var Square = document.createElement("option");
        Square.text = "square";
        var Sawtooth = document.createElement("option");
        Sawtooth.text = "sawtooth";
        var Triangle = document.createElement("option");
        Triangle.text = "triangle";
        selectWaveForm.add(sine);
        selectWaveForm.add(Square);
        selectWaveForm.add(Sawtooth);
        selectWaveForm.add(Triangle);
        contentDiv.appendChild(contentScript)
        contentDiv.appendChild(selectWaveForm)


        var toneSynth = {}



            $(function () {
                var pannel = new Interface.Panel({
                    container: document.body,
                  //   width: $("#" + contentDiv.id).width()
                });


        setTimeout(function () {

        var synth = new Tone.FMSynth({
            "modulationIndex": 12.22,
            "envelope": {
                "attack": 0.01,
                "decay": 0.2
            },
            "modulation": {
                "type": "square"
            },
            "modulationEnvelope": {
                "attack": 0.2,
                "decay": 0.01
            }
        }).toMaster();
                var sliderFm = new Interface.Slider({
                    tone: synth,
                    param: "modulationIndex",
                    name: "mod index",
                     width: $("#" + contentDiv.id).width(),
                     height: 10,
                    bounds: [.4, .35, .55, .3],
                //    label: 'horizontal slider',
                    isVertical: false,
                 //   value: .5,
                    max: 100
                });
pannel.background = 'black';
                pannel.add(sliderFm)
     

                $("<div>", {
                    "id": "Keyboard"
                }).appendTo("#" + contentDiv.id);

                var keyboard = new QwertyHancock({
                    id: "Keyboard",
                    width: $("#" + contentDiv.id).width(),
                    height: 10,
                    octaves: Interface.isMobile ? 1.26 : 3,
                    startNote: "C3",
                    whiteKeyColour: "white",
                    blackKeyColour: "#ECECEC",
                    activeColour: "#FFFC0C"
                });

                keyboard.keyDown = function (note) {
                    synth.triggerAttack(note);
                };

                keyboard.keyUp = function (note) {
                    synth.triggerRelease();
                };
            });
        }, 1000);
        //setup global osc
        window[self.getName()] = {}
            //   window[self.getName()].frequency.value = 400; // value in hertz
            //   window[self.getName()].start();
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
            value: oscName + ".frequency",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".frequency.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".frequency.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".detune",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".detune",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }]
    }
}






function oscX(name) {


}