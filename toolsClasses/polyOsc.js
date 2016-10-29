'use strict'
class polyOsc extends boxController {
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
//***********************************CONTROLS**********************************************


        //Frequency value .frequency.value -> gain  BIG
        setTimeout(function () {
            var freqValue = nx.add('dial', {
                parent: self.getName() + 'freqGain',
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
                window[self.getName() + 'freqGain'].gain.value = data.value;
            })


            //Frequency value .frequency.value -> gain  small
            var freqValue2 = nx.add('dial', {
                parent: self.getName() + 'freqGain',
                name: self.getName() + 'Freq2',
                w: 70,
                h: 70,
            })

            freqValue2.min = 0
            freqValue2.max = 2
            freqValue2.label = '0-2'
            freqValue2.on('*', function (data) {
                    console.log(data, window[self.getName() + 'playRate'])
                        // window[self.getName()+'playRate'].value = data.value
                    window[self.getName() + 'freqGain'].gain.value = data.value;
                })
 


            freqValue2.label = 'Stop'
            freqValue2.on('*', function (data) {
                window[self.getName()].up(432)
            })

            //*************Controls number**************************

           var freqGain = nx.add('dial', {
                parent: self.getName() + 'freqGain',
                name: self.getName() + 'number',
                w: 100,
                h: 50,
            })
            freqGain.set({
                value: 432
            })

            freqGain.on('*', function (data) {
                console.log(data)
                thisFreqValue = data.value
            })

            var thisFreqValue = 432

            //envelop 
            //ATTACK 

            attack = nx.add('dial', {

                parent: self.getName() + 'env',
                name: self.getName() + 'ATTACK',
                w: 70,
                h: 70,
            })

            attack.label = 'Attack'
            attack.min = 0.01
            attack.max = 2
            attack.val.value = attack
            attack.on('*', function (data) {
                attack = data.value;
            })



            //Realeast
            Realeast = nx.add('dial', {
                parent: self.getName() + 'env',
                name: self.getName() + 'Realeast',
                w: 70,
                h: 70,
            })
            Realeast.label = 'Realeast'
            Realeast.min = 0.01
            Realeast.max = 2
            Realeast.value = 1
            Realeast.val.value = realease

            Realeast.on('*', function (data) {
                    realease = data.value;
                })
                //    nx.onload();




            //max level
            level = nx.add('dial', {
                parent: self.getName() + 'env',
                name: self.getName() + 'level',
                w: 70,
                h: 70,
            })
            level.label = 'level'
            level.min = 0.01
            level.max = 1
            level.val.value = 1
            level.on('*', function (data) {
                maxVolume = data.value;
            })


            nx.labelSize(40);
            //    nx.onload();
        }, 100);


        //***********************************CONTROLS**********************************************
        var oscArray = [];

        var gainArray = []
            //********************************************envelop***********************************************//
        var oscAttack = 0.1;
        var realease = 0.1;
        var maxVolume = 1;



        //********************************************envelop***********************************************//

        window[self.getName()] = {};
        window[self.getName()] = context.createGain();
        window[self.getName() + 'freqGain'] = context.createGain();
        window[self.getName()].down = function (freq,vel) {

            var currentOsc = oscArray.push(context.createOscillator());
            var currentGain = gainArray.push(context.createGain());
            //connect osc
            oscArray[currentOsc - 1].connect(gainArray[currentGain - 1]);
            gainArray[currentGain - 1].connect(window[self.getName()]);
            gainArray[currentGain - 1].gain.value = 0;
            gainArray[currentGain - 1].gain.setTargetAtTime(vel, 0, oscAttack)
            oscArray[currentOsc - 1].type = window[self.getName()].type
            window[self.getName() + 'freqGain'].connect(oscArray[currentOsc - 1].frequency)

            //setValues
            oscArray[currentOsc - 1].frequency.value = freq; // value in hertz
            oscArray[currentOsc - 1].start();
            console.log(currentOsc, 22222)

        }

        window[self.getName()].up = function () {
            var stopOsc =  oscArray.shift();
            var stopGain =     gainArray.shift();
            //stop env

            //start osc
            stopGain.gain.setTargetAtTime(0, 0, realease)
            setTimeout(function(){
                stopOsc.stop()
                stopOsc.disconnect();
                stopGain.disconnect();
            },2000)
            
              

            console.log(oscArray)

          //  stopOsc.onended = function () {
                console.log('TAKTAKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKk')
              //  stopGain.gain.value = 0;
               // 
                //
                
              //  stopGain = '';
               // stopOsc = '';

          //  }





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
            value: oscName + ".frequency",
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