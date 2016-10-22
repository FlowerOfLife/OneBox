'use strict'
class dashboard extends boxController {
    constructor() {
        super();

        this.setConnectors(this.connectors())
        this.setContent(this.content())

    }

    content() {
/*        var self = this;
       
        window[self.getName()].connect = function (controlValue) {
          

        }
        var xMenu = new myMenu();
        //return xMenu.menuObject();*/
       var dashboardWorkspace = document.createElement('div');
        dashboardWorkspace.style.backgroundColor = "#8f248f";
        dashboardWorkspace.style.width='100px';
        dashboardWorkspace.style.height='200px';
        return dashboardWorkspace
    }
    connectors() {
       return [
        {
            value: "context.destination",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }]
    }
}



/*var dashboardJson = {
    name:'dashboard',
        type:'dashboard',
        parentBox:document.body,
        position:{
            sdkTop:'10px',
            sdkLeft:'10px',
            guiTop:'10px',
            guiLeft:'10px'
        },
        
        currentView:'sdk'
}

var myBox = new dashboard();
myBox.initBoxValues(dashboardJson)
myBox.createBox();*/