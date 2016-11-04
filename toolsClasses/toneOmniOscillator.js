'use strict'
class omniOscillator extends boxController {
    constructor(name) {
        super();

        this.setName(name)
        this.setType('omniOscillator')
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


var osc = new Tone.OmniOscillator(432, "sine").toMaster().start();




        setTimeout(function () {

            $(function () {





//********************************************Select Waveform
var nameController = self.getName() + 'oscWaveform';
var divid =contentDiv.id 
var element=osc;  
self.nexusSelectOscWave(nameController,divid , element)
//********************************************Select Waveform





//********************************************Select nexusKeyboard
 //self.nexusKeyboard(osc, keyboardDiv.id);
 //********************************************Select nexusKeyboard









//********************************************mute*******************
 var mute = nx.add('button', {
                parent: contentDiv.id ,
                name: self.getName() + 'MUTE',
                w: 70,
                h: 70,
            })

            mute.min = 0
            mute.max = 1000
            mute.label = '1-1000'
            mute.on('*', function (data) {
                console.log(data)

                   window[self.getName()].mute = true;

            })
        

      

//********************************************mute*******************




//********************************************freqValue*******************
 var freqValue = nx.add('dial', {
                parent: contentDiv.id ,
                name: self.getName() + 'freqValue',
                w: 70,
                h: 70,
            })

            freqValue.min = 0
            freqValue.max = 1000
            freqValue.label = 'freqValue'
            freqValue.on('*', function (data) {
                console.log(data)

                   window[self.getName()].frequency.value = data.value;


        });

//********************************************freqValue*******************
    })
  }, 300);

        window[self.getName()] = osc;

       




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
            value: oscName + '.frequency',
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        },{
            value: oscName + '.frequency',
            IO: 'IN',
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
        }]
    }
}






function oscX(name) {


}