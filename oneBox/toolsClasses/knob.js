'use strict'
class knob extends boxController {
    constructor(name) {
        super();
        // var osc1 = new osc()
        this.setName(name)
        this.setType('knob')
        this.setConnectors(this.Connectots(name))
        this.setContent(this.content(name))
    }
    content(name) {
        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var knobDiv = document.createElement('div');
        var knobRabge = document.createElement('input');
        //minmax textboxes
        var min = document.createElement('input');
        var max = document.createElement('input');
        min.type = 'text';
        max.type = 'text';
        min.style.width = '80px';
        max.style.width = '80px';
        knobRabge.type = 'range'
        knobDiv.id = "knobDiv" + name;
        knobRabge.id = "knobRabge" + name;
        knobRabge.step = 0.1
            //appends objects
        knobDiv.appendChild(document.createElement('br'));
        knobDiv.appendChild(knobRabge);
        knobDiv.appendChild(document.createElement('br'));
        knobDiv.appendChild(min);
        knobDiv.appendChild(document.createElement('br'));
        knobDiv.appendChild(max);
        min.onkeypress = function () {
            knobRabge.min = min.value
        }
        max.onkeypress = function () {
                knobRabge.max = max.value
            }
            //functionalety
        window[self.getName()] = {}
        window[self.getName()].connect = function (controlValue) {
            console.log(controlValue)
            knobRabge.onmousedown = function () {
                knobRabge.onmousemove = function () {
                    console.log(controlValue)
                    eval(controlValue + "= " + knobRabge.value)
                }
            }
        }

        window[self.getName()].disconnect = function (controlValue) {
            console.log(controlValue)
            knobRabge.onmousedown = '';
            knobRabge.onmousemove = '';
        }
        return knobDiv
    }
    Connectots(knobName) {
        return [{
            value: knobName,
            IO: 'OUT',
            type: 'webAudioToAnaliser'
        }]
    }
}







// drawAnaliser(context, OBJECT, "OBJECT_visual")