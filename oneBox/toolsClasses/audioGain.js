'use strict'
class gain extends boxController {
    constructor(name) {
        super();
        // var gain1 = new gain()
        this.setName(name)
        this.setType('gain')
        this.setConnectors(this.gainConnectots(name))
        this.setContent(this.gainContent())
    }
    gainContent(name) {
        
        var self = this
        var contentScript = document.createElement('script');
        window[self.getName()] = context.createGain();;
        window[self.getName()].gain.value = 0.6;

        //CONTROLS
        setTimeout(function () {
            //gain 1-1000
            this.freqValue = nx.add('dial', {
                parent: self.getName() + ".gain.value",
                name: self.getName() + 'Value',
                w: 70,
                h: 70,
            })
            
            this.freqValue.min = 0
            this.freqValue.max = 1000
            this.freqValue.on('*', function (data) {
                //      console.log(data, window[self.getName() + 'playRate'])
                // window[self.getName()+'playRate'].value = data.value
                window[self.getName()].gain.value = data.value;
            })



            //gain 0-2
            this.freqValue = nx.add('dial', {
                parent: self.getName() + ".gain.value",
                name: self.getName() + 'Value02',
                w: 70,
                h: 70,
            })
            console.log(freqValue)
            this.freqValue.min = 0
            this.freqValue.max = 2
            this.freqValue.on('*', function (data) {
                    //      console.log(data, window[self.getName() + 'playRate'])
                    // window[self.getName()+'playRate'].value = data.value
                    window[self.getName()].gain.value = data.value;
                })
                //    nx.onload();

        }, 100);


        return contentScript
    }
    gainConnectots(gainName) {
        return [{
            value: gainName,
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: gainName,
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }, {
            value: gainName + ".gain.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: gainName + ".gain",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }]
    }
}






function gainX(name) {


}