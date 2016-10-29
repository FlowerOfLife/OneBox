'use strict'
class filter extends boxController {
    constructor(name) {
        super();



        this.setName(name)
        this.setType('filter')
        this.setConnectors(this.oscConnectors(name))
        this.setContent(this.oscContent(name))


    }
    oscContent(name) {
        var self = this
        var contentDiv = document.createElement('div');
        contentDiv.id = self.getName() + 'contentiddiv';
        var contentScript = document.createElement('script');
        var selectWaveForm = document.createElement('select');

        //select filter type
        var lowpass = document.createElement("option");
        lowpass.text = "lowpass";
        var highpass = document.createElement("option");
        highpass.text = "highpass";
        var bandpass = document.createElement("option");
        bandpass.text = "bandpass";
        var lowshelf = document.createElement("option");
        lowshelf.text = "lowshelf";
        var highshelf = document.createElement("option");
        highshelf.text = "highshelf";
        var peaking = document.createElement("option");
        peaking.text = "peaking";
        var notch = document.createElement("option");
        notch.text = "notch";
        var allpass = document.createElement("option");
        allpass.text = "allpass";
        selectWaveForm.add(lowpass);
        selectWaveForm.add(highpass);
        selectWaveForm.add(bandpass);
        selectWaveForm.add(lowshelf);
        selectWaveForm.add(highshelf);
        selectWaveForm.add(peaking);
        selectWaveForm.add(notch);
        selectWaveForm.add(allpass);

        selectWaveForm.onchange = function () {
            console.log(selectWaveForm.value)
            window[self.getName()].type = selectWaveForm.value
        }
        setTimeout(function () {


            //knobs
            var selectWaveForm = document.createElement('select');
            //filter Freq
            var knobfilterFreq = nx.add('dial', {
                parent: self.getName() + 'contentiddiv',
                w: 70,
                h: 70,
            })

            knobfilterFreq.on('*', function (data) {
                window[self.getName()].frequency.value = data.value;
            })

            knobfilterFreq.label = 'Freq'
            knobfilterFreq.min = 0
            knobfilterFreq.max = 1000

            //knob filter GainValue
            var knobfilterGainValue = nx.add('dial', {
                parent: self.getName() + 'contentiddiv',
                w: 70,
                h: 70,
            })

            knobfilterGainValue.on('*', function (data) {
                console.log(data)
                window[self.getName()].gain.value = data.value;
            })

            knobfilterGainValue.label = 'Gain'
            knobfilterGainValue.min = 0
            knobfilterGainValue.max = 2
      


            //knob filter q value
            var knobfilterQValue = nx.add('dial', {
                parent: self.getName() + 'contentiddiv',
                w: 70,
                h: 70,
            })

            knobfilterQValue.on('*', function (data) {
                console.log(data)
                window[self.getName()].Q.value = data.value;
            })

           
            knobfilterQValue.min = 0
            knobfilterQValue.max = 50
 knobfilterQValue.label = 'Q'


        }, 500);


         contentDiv.appendChild(contentScript)
         contentDiv.appendChild(selectWaveForm)
         contentDiv.appendChild(document.createElement('br'));

         
   


        //setup global osc
        window[self.getName()] = context.createBiquadFilter();
        window[self.getName()].frequency.value = 400; // value in hertz
        window[self.getName()].type = "lowshelf";
        window[self.getName()].gain.value = 25
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
        }, 
         {
            value: oscName + ".gain",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".gain",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        },
        
        {
            value: oscName + ".Q",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".Q",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        },
        {
            value: oscName + ".Q.value",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".Q.value",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        },
        
         {
            value: oscName + ".gain.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".gain.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }]
    }
}






function oscX(name) {


}