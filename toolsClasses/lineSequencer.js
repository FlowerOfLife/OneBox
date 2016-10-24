'use strict'
class lineSequencer extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('lineSequencer')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {

            //add html object
            var self = this
            var contentScript = document.createElement('script');
            var thisContentDiv = document.createElement('div');
            thisContentDiv.id = name + 'id'
            thisContentDiv.appendChild(document.createElement('br'));

            var startSequencerButton = document.createElement('button');
            startSequencerButton.id = name + 'startButton';
            startSequencerButton.className = 'startSeq'
            startSequencerButton.textContent = 'start';

            var stopSequencerButton = document.createElement('button');
            stopSequencerButton.id = name + 'stopButton';
            stopSequencerButton.className = 'stopSeq'
            stopSequencerButton.textContent = 'stop';


 var sequencerDiv  = document.createElement('div');
 sequencerDiv.id = name +'seqencerDivid'
  var KnobsDiv  = document.createElement('div');
  KnobsDiv.id = name + 'knobDivid'

            thisContentDiv.appendChild(document.createElement('br'));
            thisContentDiv.appendChild(startSequencerButton);
            thisContentDiv.appendChild(document.createElement('br'));
            thisContentDiv.appendChild(stopSequencerButton);
 thisContentDiv.appendChild(sequencerDiv);
  thisContentDiv.appendChild(KnobsDiv);

            setTimeout(function () {


                var matrix1 = nx.add('matrix', {
                    parent: name + 'id',
                    w: 400,
                    h: 150
                })

                //console.log(matr)

                console.log('hereeeeeeeeeeeeeeeee')
                matrix1.col = 16;
                matrix1.row = 5;
                matrix1.init();

                matrix1.on('*', function (data) {
                    //  console.log(data.list)



                    if (data.list) {

                        for (var i = 0; i < 16; i++) {
                            (function (i) {


                                if (data.list[i] == 1) {
                                    //   console.log(self)
                                    self['upDownCh' + i].play();
                                }
                            })(i)

                        }

                    }

                    //   matrix1.jumpToCol(this.playnow)
                })

                startSequencerButton.onclick = function () {
                    matrix1.sequence(480);
                    matrix1.bpm = 480;
                }

                stopSequencerButton.onclick = function () {
                    matrix1.stop();
                }



            }, 150);


            function play(freq) {
                self.keyDown(freq);
                setTimeout(function () {
                    self.keyUp(freq);
                }, 500)
            }
            //functionalety

            for (var i = 0; i < 5; i++) {
                //  console.log(121211212)
                (function (i) {
                        console.log(121211212)
                        var freqKnobValue = 432;
                          var velKnobValue = 0.6
                        setTimeout(function () {
                 
                            var freqKnob = nx.add('dial', {
                                parent: sequencerDiv,
                                w: 70,
                                h: 70,
                            })

                            freqKnob.on('*', function (data) {
                                console.log(data)
                                freqKnobValue = data.value;
                            })
                            freqKnob.min = 0
                            freqKnob.max = 1000


                            console.log(121211212)
                          
                      

                                var velKnob = nx.add('dial', {
                                    parent: name + 'knobDivid',
                                    w: 70,
                                    h: 70,
                                })

                                velKnob.on('*', function (data) {
                                    console.log(data)
                                    velKnobValue = data.value;
                                })
                                velKnob.min = 0
                                velKnob.max = 1000
                            }, 100)



                            window[self.getName() + "upDown_Ch" + i] = {}
                            window[self.getName() + "upDown_Ch" + i].connect = function (envelop) {


                                self['upDownCh' + i] = {}
                                console.log(1111111111 + i)
                                self['upDownCh' + i].play = function () {
                                    self['upDownCh' + i].keyDown(freqKnobValue,velKnobValue);
                                    setTimeout(function () {
                                        self['upDownCh' + i].keyUp(freqKnobValue,velKnobValue);
                                    }, 1000)
                                };

                                self['upDownCh' + i].keyDown = function (frequency,vel) {

                                    if (frequency) {
                                        self.osc = frequency
                                    }

                                    envelop.down(frequency,vel)
                                    console.log(frequency)

                                };

                                self['upDownCh' + i].keyUp = function (frequency,vel) {
                                    //  console.log(note, frequency)

                                    envelop.up(frequency,vel)
                                };


                            }




                        })(i)

                    }

                    window[self.getName() + "Freq"] = {}
                    window[self.getName() + "Freq"].connect = function (osc) {
                        self.osc = osc;
                        /*
                                        keyboard.keyDown = function (note, frequency) {
                                        osc.frequency.value = frequency
                                        };

                                        keyboard.keyUp = function (note, frequency) {
                                            console.log(note, frequency)
                                            envelop.down()
                                        };

                        */



                    }



                    return thisContentDiv
                }
                Connectots(name) {
                    return [{
                        value: name + "upDown_Ch0",
                        IO: 'OUT'
                    }, {
                        value: name + "upDown_Ch1",
                        IO: 'OUT'
                    }, {
                        value: name + "upDown_Ch2",
                        IO: 'OUT'
                    }, {
                        value: name + "upDown_Ch3",
                        IO: 'OUT'
                    }, {
                        value: name + "upDown_Ch4",
                        IO: 'OUT'
                    }, {
                        value: name + "upDown_Ch5",
                        IO: 'OUT'
                    }, {
                        value: name + "Freq",
                        IO: 'OUT',
                        type: 'webAudioToAnaliser'
                    }]
                }
            }







            // drawAnaliser(context, OBJECT, "OBJECT_visual")