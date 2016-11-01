"use strict"
class nexusUIelements extends boxEntety {
    constructor() {
        super()
        console.log(111111111111, 'ALALALALALALALALALALAAL')
        console.log(this, 'BOX CONTROLLERXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            //console.log(this.initBoxValues)
    }
    nexusKeyboard(synth, divid) {
        var keyboard = new QwertyHancock({
            id: divid,
            width: $("#" + divid).width(),
            height: $("#" + divid).height(),
            octaves: Interface.isMobile ? 1.26 : 3,
            startNote: "C3",
            whiteKeyColour: "white",
            blackKeyColour: "#ECECEC",
            activeColour: "#FFFC0C"
        });

        keyboard.keyDown = function (note) {
            synth.triggerAttack(note);
        };

        keyboard.keyUp = function (note) {
            synth.triggerRelease();
        };
    }
    nexusADSR(name, divid, element) {
        var envelope = nx.add('multislider', {
            parent: divid,
            name: name,
             w: 170,
            h: 100,
        })
        envelope.setMaxListeners(4)
        envelope.label = name
        envelope.sliders = 4
        envelope.min = 0.3
        envelope.max = 2
        envelope.on('*', function (data) {
            console.log(data, this)

            element.attack = data.list[0];
            element.decay = data.list[1]
            element.sustain = data.list[2]
            element.release = data.list[3]


        })
        envelope.init()
    }

    



    nexusSelectOscWave(name, divid, element) {
        var select = nx.add('select', {
            parent: divid,
            name: name,
             w: 90,
            h: 50

        })
        select.choices = ['sine', 'square', 'triangle', 'sawtooth']


        select.label = 'sice'
        select.init()
        select.on('*', function (data) {
            console.log(data.text)
            element.type = data.text

            // toneFmSynth90147.voice0.filterEnvelope.attack
        })
        select.init()
    }



    filterControlls(name, divid, element) {
        //*******************************************envelope****************************
        var envelope = nx.add('multislider', {
            parent: divid,
            name: name,
            w: 170,
            h: 100,
        })
        envelope.setMaxListeners(4)
        envelope.label = name
        envelope.sliders = 4
        envelope.min = 0.3
        envelope.max = 2
        envelope.on('*', function (data) {
            console.log(data, this)

            element.attack = data.list[0];
            element.decay = data.list[1]
            element.sustain = data.list[2]
            element.release = data.list[3]


        })
        envelope.init()
         document.getElementById(divid).appendChild(document.createElement('br'));
           //*******************************************filterFrequency****************************
        var filterFrequency = nx.add('dial', {
            parent: divid,
            name: name + 'FilterFrequency',
            w: 70,
            h: 70,
        })

        filterFrequency.min = 0
        filterFrequency.max = 1000
        filterFrequency.label = 'frequency'
        filterFrequency.on('*', function (data) {

            element.value = data.value;
        })




 //*******************************************filterQ****************************
        var filterQ = nx.add('dial', {
            parent: divid,
            name: name + 'filterQ',
            w: 70,
            h: 70,
        })

        filterQ.min = 0
        filterQ.max = 24
        filterQ.label = 'Q'
        filterQ.on('*', function (data) {

            element.Q.value = data.value;
        })

filterQ.init()


//*******************************************detune****************************
        var detune = nx.add('dial', {
            parent: divid,
            name: name + 'detune',
            w: 70,
            h: 70,
        })

        detune.min = 0
        detune.max = 1000
        detune.label = 'detune'
        detune.on('*', function (data) {

            element.detune.value = data.value;
        })

detune.init()


document.getElementById(divid).appendChild(document.createElement('br'));
//*******************************************filterType****************************
        var filterType = nx.add('select', {
            parent: divid,
            name: name + 'filterType',
             w: 90,
            h: 50

        })
        filterType.choices = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"]
        filterType.min = -24
        filterType.max = 24
        filterType.label = 'Q'
        filterType.on('*', function (data) {

            element.type = data.text;
        })
        filterType.init()


//*******************************************RollOff****************************
        var rolloff = nx.add('select', {
            parent: divid,
            name: name + 'rolloff',
  w: 90,
            h: 50
        })
        rolloff.choices = ['-12', '-24', '-48', '-96']
        rolloff.min = -24
        rolloff.max = 24
        rolloff.label = 'RollOff'
        rolloff.on('*', function (data) {

            // window[self.getName()+'playRate'].value = data.value
            element.rolloff = data.text;
        })



        rolloff.init()
    }



}