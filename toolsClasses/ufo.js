'use strict'
class ufo extends ufoClass {
    constructor(name) {
        super()
        this.setName(name)
        this.setType('ufo')
        this.setConnectors(this.connectors())
        this.setContent(this.content())
    }
    content(name) {
        var self = this;
        var contentDiv = document.createElement('div');
        contentDiv.id = self.getName() + "conId";


        window[self.getName()] = {}
        window[self.getName()].connect = function (controlValue) {
            function freq(freq) {
                 eval(controlValue + "= " + freq)
              
            }
self.myUfo(contentDiv, freq)
        }
        
        return contentDiv
    }
    connectors(oscName) {
         var self = this;
        return [{
            value: self.getName(),
            IO: 'OUT',
            type: 'WebAudioToWebAudio'
        }]
    }
}