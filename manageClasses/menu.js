'use strict'
class myMenu {
    constructor() {
        // this.menuObject()
    }

getAllToolsNames(){
 var  menuItems = ["dashboard", "osc",
            "polyOsc",

            "audioDestination",
            "visualiser",
            "audioDestination",
            "audioGain",
            "knob",
            "piano",
            "envelope",
            "simpleSequencer",
            "mml",
            "drums",
            "filter",
            "buffer",
            "midi",
            "lineSequencer",
            "toneFmSynth",
            "monoSequenecer",
            "toneMonoSynth",

            "toneOscilator",
            "toneOmniOscillator",
            "toneSequenecer"];
          return  menuItems
}
loadAllToolsScripts(){
var menuItems = this.getAllToolsNames()
        for (var tool in menuItems) {
            addScript("toolsClasses/" + menuItems[tool] + ".js")

        }

        function addScript(src) {
            var s = document.createElement('script');
            s.setAttribute('src', src);
            document.body.appendChild(s);
        }
}

    menuObject() {
       var menuItems = this.getAllToolsNames()
        var menuItemsIcons = ['album', 'add_to_queue', 'gradient', 'data_usage',
            'av_timer', 'keyboard', 'business', 'volume_up', 'subtitles', 'view_column', 'dialpad', 'view_module', 'format_line_spacing', 'assessment',
            'queue_music', 'view_column', 'view_column', 'view_column', 'view_column', 'view_column', 'view_column', 'view_column', 'view_column', 'view_column'];







        console.log(document.head, 3333333333)


        var dashboardMenu = document.createElement('div');
        //div menu
        var menuDiv = document.createElement('div');
        menuDiv.id = 'menu'
        dashboardMenu.appendChild(menuDiv)
        for (var items in menuItems) {
            (function (items) {


                //menu button
                //console.log(items);
                var addButton = document.createElement('i');
                addButton.id = menuItems[items] + 'button';
                addButton.className += 'material-icons'
                addButton.innerHTML = menuItemsIcons[items];
                addButton.setAttribute('title', menuItems[items]);
                var label = document.createElement('label');
                label.innerHTML = menuItems[items];
                addButton.appendChild(label);

                menuDiv.appendChild(addButton)
                addButton.onclick = function () {
                    var deviceJsonObject = (menuItems[items] + Math.floor((Math.random() * 100000) + 1))
                    var deviceValues = {
                        name: deviceJsonObject,
                        type: menuItems[items],
                        parentBox: this.parentElement.parentElement.parentElement,
                        position: {
                            sdkTop: '10px',
                            sdkLeft: '10px',
                            guiTop: '10px',
                            guiLeft: '10px'
                        },

                        currentView: 'sdk'
                    }

                    var device = eval('new ' + menuItems[items] + "('" + deviceJsonObject + "')");
                    device.initBoxValues(deviceValues)
                    device.setParentBox(this.parentElement.parentElement.parentElement);

                    device.createBox();
                    window[device.getName() + "Box"] = device
                }
            })(items)

        }

        return dashboardMenu
    }
}
