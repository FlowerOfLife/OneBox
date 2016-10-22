"use strict"
class eventsActions {
    constructor() {

    }
    events(eventType) {
        var self = this;
        //on connect
        jsPlumb.bind('connection', function (info, ev) {

            console.log(1,info.source,2,info.target)
            var endPointStyle = info.targetEndpoint.getPaintStyle()
                //  console.log(endPointStyle.fillStyle)

            self.connectSourceToTarget(info)
            //self.connectTargetToSource(info)


        });




        //black on connect 
        jsPlumb.bind('connectionDetached', function (info, ev) {
            console.log(info.sourceId, info.targetId)
            var endPointStyle = info.targetEndpoint.getPaintStyle()
            console.log(endPointStyle.fillStyle)
            self.disconnectTargetToSource(info)

        });





    }

    connectSourceToTarget(info) {
        var a = info.sourceId //s.name;
        var b = info.targetId //.name;
        console.log(typeof(eval(b)))
        if(typeof(eval(b))=='object'){

             console.log(a + ".connect(" + b + ")",typeof(b));
        eval(a + ".connect(" + b + ")");

        }else{
        console.log(a + ".connect('" + b + "')",typeof(b));
        eval(a + ".connect('" + b + "')");

        }
    }
    
//*******************************************Connect/Disconnect*********************************//
    connectTargetToSource(info) {
        var b = info.sourceId //s.name;
        var a = info.targetId //.name;
        console.log(a + ".connect(" + b + ")",typeof(b));
       
            eval(a + ".connect(" + b + ")");
       
    }
    disconnectTargetToSource(info) {
        var a = info.sourceId //s.name;
        var b = info.targetId //.name;
        console.log(a + ".disconnect(" + b + ")",typeof(b));
       
            eval(a + ".disconnect(" + b + ")");
       
    }
//*******************************************Connect/Disconnect*********************************//

    WebAudioToWebAudio(info) {
        var a = info.sourceId //s.name;
        var b = info.targetId //.name;
        console.log(a + ".connect(" + b + ")");
        eval(a + ".connect(" + b + ")");
    }
    connectKnobToValue(info) {
        console.log(info);
        var aId = document.getElementById(info.sourceId)

        // console.log(aId.innerHTML)
        var a = document.getElementById((info.sourceId).replace("_Div", '')) //s.name;
        var b = document.getElementById(info.targetId) //.name;
        a.onmousedown = function () {
            a.onmousemove = function () {
                console.log((info.targetId), a.value)
                eval(info.targetId + "=" + a.value);
            }

        }
    }


    analiserToWebAudio(info) {
        console.log(info.targetId + ".connect(" + info.sourceId + ")")
        eval(info.targetId + ".connect(" + info.sourceId + ")");
    }


    disconnectWebAudioToWebAudio(info) {
        var a = info.sourceId //s.name;
        var b = info.targetId //.name;
            // console.log(a + ".disconnect(" + b + ")")
        eval(a + ".disconnect()")
    }
    disconnectConnectKnobToValue(info) {
        //  console.log(info);
        var aId = document.getElementById(info.sourceId)

        console.log(aId.innerHTML)
        var a = document.getElementById((info.sourceId).replace("_Div", '')) //s.name;
        var b = document.getElementById(info.targetId) //.name;
        a.onmousedown = "";
        a.onmousemove = ""

    }
    disconnectAnaliserToWebAudio() {}
}
