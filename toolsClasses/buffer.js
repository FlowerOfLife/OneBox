'use strict'
class buffer extends boxController {
    constructor(name) {
        super();



        this.setName(name)
        this.setType('buffer')
        this.setConnectors(this.oscConnectors(name))
        this.setContent(this.oscContent(name))


    }
    oscContent(name) {
        var self = this
        var contentDiv = document.createElement('div');
        contentDiv.id = self.getName() + "conId";



        var fileInput = document.createElement("INPUT");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("id", self.getName() + "fileId");
        fileInput.onchange = function () {
            console.log(this.files[0])
            self.setFile(this.files[0].name)
            var url = URL.createObjectURL(this.files[0]);
            console.log(url);
            sampleLoader(url);
        };
        contentDiv.appendChild(fileInput)


        //**********************Create gain****************************************
        window[self.getName()] = {};
        window[self.getName()] = context.createGain();
        
        //**********************Buffer source****************************************
        function playSound(thisBuffer, freq, vel, sampleRate) {
            var source = context.createBufferSource();
            //window[self.getName()].gain.value = 0;
            if (freq) {
                source.playbackRate.value = (freq / 240).toFixed(2);
            }
            if (sampleRate) {
                console.log(sampleRate)
                source.playbackRate.value = sampleRate;
            }
            if (vel) {
                window[self.getName()].gain.value = vel;
            }
            //load buffer
            source.buffer = thisBuffer;
            //connect gain
            source.connect(window[self.getName()]);
            //start play
            source.start();
        }



        //**********************SalmpeLoader****************************************
        var thisBuffer = [];
        var sampleLoader = function (url) {
            
            url = 'samples/' + self.getFile();
            console.log(url,self,self.getFile(),3434343434)
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    thisBuffer = buffer
                    waveform1.setBuffer(buffer)
                });
            };

            request.send();
        };

        var sampleRate = 1

        //**********************UP DOWN PRESS****************************************
        window[self.getName()].up = function (freq, vel) {
            // window[self.getName()].stop();
        }

        window[self.getName()].down = function (freq, vel) {


            if (freq == undefined) {
                playSound(thisBuffer, freq, vel, sampleRate)
            } else {

                //******************************PLAY*******************************************************
                playSound(thisBuffer, freq, vel)
            }



        }



        //******************************init*******************************************************
        //sampleLoader('samples/piano.wav');
        setTimeout(function(){
       if(self.getFile()){
            self.setFile(self.getFile());
       }
     //   self.setFile(self.getFile());
        sampleLoader('samples/' + self.getFile());
        },1000)





        //******************************Controls*******************************************************
        //var sampleRate = 1
        setTimeout(function () {
            var mySampleRate = nx.add('dial', {
                parent: contentDiv.id,
                w: 70,
                h: 70,
            })

            mySampleRate.on('*', function (data) {
                console.log(data, window[self.getName() + 'playRate'])
                    //   window[self.getName()+'playRate'].value = data.value
                if (sampleRate) {
                    sampleRate = data.value;
                }

            })


            mySampleRate.min = 0
            mySampleRate.max = 2


             var waveform1 = nx.add('waveform', {
                parent: contentDiv.id,
                w: 150,
                h: 80,
            })
        waveform1.on('*',function(data) {
			    //	sampler.player.setLoopPoints(data.starttime/1000,data.stoptime/1000)
			    })
        }, 100);















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
            value: oscName + '.playbackRate',
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".playbackRate.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".frequency.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".source",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".source",
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }, {
            value: oscName + ".detune.value",
            IO: 'IN',
            type: 'ControllerToWebAudio'
        }, {
            value: oscName + ".detune.value",
            IO: 'OUT',
            type: 'ControllerToWebAudio'
        }]
    }
}






function oscX(name) {


}