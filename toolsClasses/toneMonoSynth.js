'use strict'
class toneMonoSynth extends boxController {
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
        var keyboardDiv = document.createElement('div');
        keyboardDiv.id = self.getName() + "keyboardDiv";
        keyboardDiv.style.height = '80px'
        contentDiv.appendChild(controlsDiv);
        contentDiv.appendChild(keyboardDiv)
        var contentScript = document.createElement('script');
        var selectWaveForm = document.createElement('select');

        var synth = new Tone.MonoSynth({
            "frequency": "C4",
            "-": 0,
            "oscillator": {
                "type": "square"
            },
            "filter": {
                "Q": 6,
                "type": "lowpass",
                "rolloff": -24
            },
            "envelope": {
                "attack": 0.005,
                "decay": 0.1,
                "sustain": 0.9,
                "release": 1
            },
            "filterEnvelope": {
                "attack": 0.06,
                "decay": 0.2,
                "sustain": 0.5,
                "release": 2,
                "baseFrequency": 200,
                "octaves": 7,
                "exponent": 2
            }
        }).toMaster();
        setTimeout(function () {

            $(function () {





                //********************************************ENV 1

          
 self.nexusADSR(self.getName() + 'osc1Env', self.getName() + "Osc", window[self.getName()].envelope)
 document.getElementById(self.getName() + "Osc").appendChild(document.createElement('br'));
 self.nexusSelectOscWave(self.getName() + 'selectWave1',self.getName() + "Osc", window[self.getName()].oscillator);
 self.nexusKeyboard(synth, keyboardDiv.id);
 self.filterControlls(self.getName() + 'osc1FilterEnv', self.getName() + 'Envelop', window[self.getName()].filter)




            })

        }, 300);
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
        return [
             {
          value: oscName + '.frequency.value',
            IO: 'IN',
            type: 'IN'
        }, {
          value: oscName + '.frequency.value',
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        },
            
            {
            value: oscName + '.output',
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName,
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + "Osc",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + 'Envelop',
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + 'Filter',
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
        }, {
            value: oscName + '.filter.Q',
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }]
    }
}






function oscX(name) {


}