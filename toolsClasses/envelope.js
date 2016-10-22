'use strict'
class envelope extends boxController {
    constructor(name) {
        super();
       
       
        // var gain1 = new gain()
        this.setName(name)
        this.setType('gain')
        this.setConnectors(this.gainConnectots(name))
        this.setContent(this.content())
    }
    content(name) {
       
        var self = this
        
        var contentScript = document.createElement('script');
        window[self.getName()] = context.createGain();
        window[self.getName()].gain.value = 0.6;



        function start() {

        }



        var attack = 0.5;
        var realease = 0.5;
        var maxVolume = 1;



        window[self.getName()].up = function () {
          window[self.getName()].gain.setTargetAtTime(0, 0, realease)
        }

        window[self.getName()].down = function () {
              window[self.getName()].gain.setTargetAtTime(maxVolume, 0, attack)
            
        }




var attack_nx 
        setTimeout(function () {
            //ATTACK 
            
            attack_nx = nx.add('dial', {
               
                parent: self.getName(),
                name: self.getName() + 'ATTACK',
                w: 70,
                h: 70,
            })
            console.log(attack_nx,888888)
            attack_nx.label = 'Attack'
            attack_nx.min = 0.01
            attack_nx.max = 2
            attack_nx.val.value=attack
            attack_nx.on('*', function (data) {
                attack = data.value;
            })



            //Realeast
            this.Realeast = nx.add('dial', {
                parent: self.getName(),
                name: self.getName() + 'Realeast',
                w: 70,
                h: 70,
            })
            this.Realeast.label = 'Realeast'
            this.Realeast.min = 0.01
            this.Realeast.max = 2
            this.Realeast.value=1
            this.Realeast.val.value=realease

            this.Realeast.on('*', function (data) {
                realease =data.value;
                })
                //    nx.onload();

 


                    //max level
            this.level = nx.add('dial', {
                parent: self.getName(),
                name: self.getName() + 'level',
                w: 70,
                h: 70,
            })
            this.level.label = 'level'
            this.level.min = 0.01
            this.level.max = 1
            this.level.val.value=1
            this.level.on('*', function (data) {
                maxVolume =data.value;
                })


                nx.labelSize(40);
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
        }]
    }
}






function gainX(name) {


}