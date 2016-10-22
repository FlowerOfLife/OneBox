'use strict'
class midiPlayer extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('mml')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {
        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var thisContentDiv = document.createElement('div');
        var mmlInput = document.createElement('input');
        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(mmlInput);
        thisContentDiv.appendChild(document.createElement('br'));



        thisContentDiv.id = name + 'id'
        thisContentDiv.appendChild(document.createElement('br'));

        var startSequencerButton = document.createElement('button');
        startSequencerButton.id = name + 'startButton';
        startSequencerButton.className = 'startSeq'
        startSequencerButton.textContent = 'start';
        var stopSequencerButton = document.createElement('button');
        stopSequencerButton.id = name + 'stopButton';
        stopSequencerButton.setAttribute('className', 'stopSeq');
        stopSequencerButton.textContent = 'stop';


        var fileInput = document.createElement("INPUT");
        fileInput.setAttribute("type", "file");

        fileInput.onchange = function () {
            var url = URL.createObjectURL(this.files[0]);
            console.log(url);
            playMidi(url);
        };
        thisContentDiv.appendChild(fileInput)


        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(startSequencerButton);
        thisContentDiv.appendChild(document.createElement('br'));
        thisContentDiv.appendChild(stopSequencerButton);



/********************************Load midi****************************/
playMidi("mond_1.mid");
function playMidi(midiFile){
MIDI.loadPlugin({
            // soundfontUrl: 'midi/soundfont/',
            instruments: null,
            onsuccess: function () {
                var pluginLoaded = true;
                var player = MIDI.Player;
                MIDI.Player.BPM= 100
                player.loadFile(midiFile, function () {

              //      player.loadFile("rach1-2.mid", function () {
                    //MIDI.AudioTag.setVolume(0, 0);
            //        MIDI.Player.BPM= 10
                    MIDI.programChange(0, 120);
                    MIDI.AudioTag.setVolume(1, 0);
                    for (var i = 0; i < MIDI.channels.length; i++) {
                        MIDI.channels[i].mute = true
                    }

                    startSequencerButton.onclick = function () {
                        player.start();
                    }

                    stopSequencerButton.onclick = function () {
                        player.stop();
                    }


                    // $('#midiPlayPause > i').toggleClass('mdi-av-play-arrow mdi-av-pause');
                    var loaded = true;
                }, null, function (error) {
                    createToast('midi file does not exist.');
                });




                player.addListener(function (data) {
                   console.log(data)


                    var now = data.now;
                    var end = data.end;
                    var channel = data.channel;
                    var note = data.note;
                    var velocity = data.velocity;
                    
                    try {
                        play(mtof(note), velocity/100,velocity);
                    } catch (e) {
                        console.log(e)
                    }

                    if (now + 1 > end) {
                        var loaded = false;
                        // $('#midiPlayPause > i').toggleClass('mdi-av-play-arrow mdi-av-pause');
                    }
                });
            }
        });

}
        


        function mtof(noteNumber) {
            return 432 * Math.pow(2, (noteNumber - 69) / 12);
        }


        function play(freq, duration,vel) {
           // console.log(freq, duration,vel)
            self.keyDown(freq,vel);
            setTimeout(function () {
                self.keyUp(freq);
            }, duration)
        }


        //functionalety
        window[self.getName() + "upDown"] = {}
        window[self.getName() + "upDown"].connect = function (envelop) {
    

            self.keyUp = function (frequency,vel) {

                envelop.up(frequency,vel)
            };




            self.keyDown = function (frequency,vel) {
 
                if (self.osc) {
                    self.osc.frequency.value = frequency

                }

                envelop.down(frequency,vel)
                    //  console.log(note, frequency)

            };


        }

        window[self.getName() + "Freq"] = {}
        window[self.getName() + "Freq"].connect = function (osc) {
            self.osc = osc;
        }



        return thisContentDiv
    }
    Connectots(knobName) {
        return [{
            value: knobName + "upDown",
            IO: 'OUT',
            type: 'webAudioToAnaliser'
        }, {
            value: knobName + "Freq",
            IO: 'OUT',
            type: 'webAudioToAnaliser'
        }]
    }
}







// drawAnaliser(context, OBJECT, "OBJECT_visual")