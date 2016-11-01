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
        var controlsDiv = document.createElement('div');
        controlsDiv.id = self.getName() + "controlsId";
        controlsDiv.style.height = '180px'
        var keyboardDiv = document.createElement('div');
        keyboardDiv.id = self.getName() + "keyboardDiv";
        keyboardDiv.style.height = '80px'
        contentDiv.appendChild(controlsDiv);
        contentDiv.appendChild(keyboardDiv)
        var contentScript = document.createElement('script');
        var selectWaveForm = document.createElement('select');

        var synth = new Tone.DuoSynth({
            "vibratoAmount": 0.5,
            "vibratoRate": 5,
            "harmonicity": 1.5,
            "voice0": {
                "volume": -10,
                "portamento": 0,
                "oscillator": {
                    "type": "sine"
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.0,
                    "sustain": 1,
                    "release": 0.5
                },
                "envelope": {
                    "attack": 0.01,
                    "decay": 0.0,
                    "sustain": 1,
                    "release": 0.5
                }
            },
            "voice1": {
                "volume": -10,
                "portamento": 0,
                "oscillator": {
                    "type": "sine"
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.0,
                    "sustain": 1,
                    "release": 0.5
                },
                "envelope": {
                    "attack": 0.01,
                    "decay": 0.0,
                    "sustain": 1,
                    "release": 0.5
                }
            }
        }).toMaster();
        setTimeout(function () {

            $(function () {

                //********************************************ENV 1
                this.envelope = nx.add('envelope', {
                    parent: self.getName() + 'freqGain',
                    name: self.getName() + 'freqGaindial',
                    w: 170,
                    h: 90,
                })
                this.envelope.setMaxListeners(4)
                this.envelope.label = 'envelope1'
                this.envelope.on('*', function (data) {
                    console.log(data, this)
                    if (data.points[0] && data.points[1] && data.points[2] && data.points[3]) {
                        console.log(data.points[0] && data.points[1] && data.points[2] && data.points[3])
                        window[self.getName()].voice0.envelope.attack = data.points[0].y;
                        window[self.getName()].voice0.envelope.decay = data.points[1].y
                        window[self.getName()].voice0.envelope.sustain = data.points[2].y
                        window[self.getName()].voice0.envelope.release = data.points[3].y
                    }


                    // toneFmSynth90147.voice0.filterEnvelope.attack
                })
            
                //********************************************ENV 2
                this.envelope2 = nx.add('envelope', {
                    parent: self.getName() + 'freqGain',
                    name: self.getName() + 'freqGaindia2',
                    w: 170,
                    h: 90,
                })
                this.envelope2.setMaxListeners(4)
                this.envelope2.label = 'envelope2'
                this.envelope2.on('*', function (data) {
                    console.log(data, this)
                    if (data.points[0] && data.points[1] && data.points[2] && data.points[3]) {
                        console.log(data.points[0] && data.points[1] && data.points[2] && data.points[3])
                        window[self.getName()].voice1.envelope.attack = data.points[0].y;
                        window[self.getName()].voice1.envelope.decay = data.points[1].y
                        window[self.getName()].voice1.envelope.sustain = data.points[2].y
                        window[self.getName()].voice1.envelope.release = data.points[3].y
                    }


                    // toneFmSynth90147.voice0.filterEnvelope.attack
                })
    contentDiv.appendChild(document.createElement('br'));
                //********************************************select
                this.select = nx.add('select', {
                    parent: self.getName() + 'freqGain',
                    name: self.getName() + 'selectWave1',

                })
                this.select.choices = ['sine', 'square', 'triangle', 'sawtooth']


                this.select.label = 'sice'
                this.select.init()
                this.select.on('*', function (data) {
                    console.log(data.text)
                    window[self.getName()].voice0.oscillator.type=data.text

                    // toneFmSynth90147.voice0.filterEnvelope.attack
                })





                this.select2 = nx.add('select', {
                    parent: self.getName() + 'freqGain',
                    name: self.getName() + 'selectWave2',

                })
                this.select2.choices = ['either', 'sine', 'square', 'triangle', 'sawtooth']


                this.select2.label = 'sice'
                this.select2.init()
                this.select2.on('*', function (data) {
                    console.log(data.text)
                    window[self.getName()].voice0.oscillator.type=data.text

                    // toneFmSynth90147.voice0.filterEnvelope.attack
                })

                // nx.onload()
                //********************************************keyboard
                var keyboard = new QwertyHancock({
                    id: keyboardDiv.id,
                    width: $("#" + keyboardDiv.id).width(),
                    height: $("#" + keyboardDiv.id).height(),
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




                var panel = new Interface.Panel({
                        container: $("#" + controlsDiv.id),
                        useRelativeSizesAndPositions: true
                    }) // panel fills page by default, alternatively you can specify boundaries

                var vibratoAmount = new Interface.Slider({
                        bounds: [0, 0, .3, .8],
                        label: "vibratoAmount",
                        max: 100,
                        onvaluechange: function () {
                            console.log(this)
                            synth.vibratoAmount.value = this.value;
                        }
                    }

                )

                var vibratoRate = new Interface.Slider({
                    bounds: [0.3, 0, .3, .8],
                    label: "vibratoRate",
                    max: 100,
                    onvaluechange: function () {
                        console.log(this)
                        synth.vibratoRate.value = this.value;
                    }
                })

                var harmonicity = new Interface.Slider({
                        bounds: [0.6, 0, .3, .8],
                        label: "harmonicity",
                        max: 100,
                        onvaluechange: function () {
                            console.log(this)
                            synth.harmonicity.value = this.value;
                        }
                    }




                )

                panel.add(vibratoAmount, vibratoRate, harmonicity)


            })

        }, 1600);
        window[self.getName()] = {};
        window[self.getName()] = synth;

        window[self.getName()].down = function (freq, vel) {
            console.log(freq, 32323223)
            synth.triggerAttack(freq, vel);

        }

        window[self.getName()].up = function (freq, vel) {

            synth.triggerRelease();

        }





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
            value: oscName + ".voice0.frequency",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + 'freqGain',
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + 'freqGain',
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + 'env',
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + 'env',
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }]
    }
}






function oscX(name) {


}