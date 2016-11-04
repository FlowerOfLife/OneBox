'use strict'
class osc extends boxController {
    constructor(name) {
        super();

        this.setName(name)
        this.setType('osc')
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

        selectWaveForm.onchange = function () {

                window[self.getName()].type = selectWaveForm.value
            }
            //CONTROLS
        setTimeout(function () {
            var freqValue = nx.add('dial', {
                parent: self.getName() + ".frequency.value",
                name: self.getName() + 'Freq',
                w: 70,
                h: 70,
            })

            freqValue.min = 0
            freqValue.max = 1000
            freqValue.label = '1-1000'
            freqValue.on('*', function (data) {
                console.log(data, window[self.getName() + 'playRate'])
                    // window[self.getName()+'playRate'].value = data.value
                window[self.getName()].frequency.value = data.value;
            })



            this.freqValue2 = nx.add('dial', {
                parent: self.getName() + ".frequency.value",
                name: self.getName() + 'Freq2',
                w: 70,
                h: 70,
            })

            this.freqValue2.min = 0
            this.freqValue2.max = 24
            this.freqValue2.label = '0-24'
            this.freqValue2.on('*', function (data) {
                    console.log(data, window[self.getName() + 'playRate'])
                        // window[self.getName()+'playRate'].value = data.value
                    window[self.getName()].frequency.value = data.value;
                })
                //    nx.onload();

        }, 100);
        //setup global osc
        window[self.getName()] = context.createOscillator();
        window[self.getName()].frequency.value = 432; // value in hertz
        window[self.getName()].start();
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