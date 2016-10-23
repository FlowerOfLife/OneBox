"use strict"
class saveLoad {
    constructor() {}
    saveProject() {
        var projectJson = {
            "devices": this.getBoxes(),
            "connections": this.getConnections(),
            "patchValues": this.getPatchValues()
        }
        console.log(projectJson)
        return projectJson
    }
    loadProject(json) {
        var self = this;
        this.setBoxes(json.devices);
        setTimeout(function () {
            self.setLocation(json.devices)
        }, 500)

        setTimeout(function () {
            self.setConnections(json.connections)
        }, 1000)

        

    }
    getBoxes() {
        var allDevices = document.getElementsByClassName('boxContainerDiv');
        var allDevicesCollection = {}
        for (var i = 0; allDevices.length > i; i++) {
            (function (i) {

                var myDevice = eval((allDevices[i].id).replace('boxContainerDiv_', '') + 'Box');
                var singleDevice = {}
                console.log(myDevice, +i)
                
                singleDevice.file =  myDevice.getFile();
                singleDevice.name = myDevice.getName();
                singleDevice.type = myDevice.getType();
                singleDevice.sdkTop = myDevice.getSdkPosition().top
                singleDevice.sdkLeft = myDevice.getSdkPosition().left
                singleDevice.guiTop = myDevice.getGuiPosition().top
                singleDevice.guiLeft = myDevice.getGuiPosition().left
                singleDevice.parentBox = ((myDevice.getParentBox().parentElement.id).replace('boxWorkspaceDiv_', ''));
                singleDevice.currentView = myDevice.getCurrentView();
                if (myDevice.getHeight() != undefined) {
                    singleDevice.height = myDevice.getHeight()
                    singleDevice.height = myDevice.getWidth()
                }


                singleDevice.isShowInGui = myDevice.getIsShowInGUI() //document.getElementById('isShowInGuiCheckbox'+myDevice.getName()).checked
                allDevicesCollection[singleDevice.name] = (singleDevice);

            })(i)

        }
        return allDevicesCollection
            //  console.log(allDevicesCollection)
    }

    getPatchValues() {
        var fileInputs = $('input:file');
        console.log(fileInputs)
        var files = {}
        for (var i=0; i < fileInputs.length; i++) {
            console.log(i)
                files[$('input:file')[i].id] = ( $($('input:file')[i]).val().replace("C:\\fakepath\\",''));
                console.log( $($('input:file')[i]).val(),"boxContainerRRRRRRRRRRRRRRRRRRR")
        }
        return files
    }
    setPatchValues() {}
    getConnections() {

        var connections = jsPlumb.getConnections();
        var connectionsJson = {}
        for (var con in connections) {
            //  console.log(connections[con].endpoints[0].getUuid(), 9999)
            var uid1 = connections[con].endpoints[0].getUuid();
            var uid2 = connections[con].endpoints[1].getUuid();
            var connectionName = uid1 + uid2;
            connectionsJson[connectionName] = {
                "source": uid1,
                "target": uid2
            };
        }
        return connectionsJson
    }
    setBoxes(devices) {
        console.log(device)
        for (var device in devices) {

            (function (device) {

                var deviceType = devices[device].type;
                var deviceName = devices[device].name;
                var deviceParent = devices[device].parentBox;
                var myDeviceJson = devices[device]
               // var deviceFile = 
                if (myDeviceJson.parentBox == "") {
                    myDeviceJson.parentBox = document.body;
                } else {
                    myDeviceJson.parentBox = document.getElementById('boxWorkspaceDiv_' + myDeviceJson.parentBox).firstChild;
                }



                var device = eval(("new " + myDeviceJson.type + "('" + myDeviceJson.name + "')"))

                window[deviceName + 'Box'] = device
                window[deviceName + 'Box'].initBoxValues(myDeviceJson)
                console.log(deviceName, myDeviceJson.name, 989898);
                window[deviceName + 'Box'].createBox();
                //set file
                console.log(myDeviceJson,777777,deviceType)
                if(myDeviceJson.file){
            window[deviceName + 'Box'].setFile(myDeviceJson.file)
                }
               
                //eval("var " + myDeviceJson.name + "=new " + myDeviceJson.type + "('" + myDeviceJson.name + "')")
            })(device)
        }

    }
    setConnections(connections) {
        for (var con in connections) {
            var uid1 = connections[con].source
            var uid2 = connections[con].target
            jsPlumb.connect({
                uuids: [uid1, uid2]
            });
        }

    }

    setLocation(devices) {
        for (var device in devices) {
            var mydevice = document.getElementById('boxContainerDiv_' + devices[device].name);

            mydevice.style.top = devices[device].sdkTop;
            mydevice.style.left = devices[device].sdkLeft;


            (function (device) {

                setTimeout(function () {
                    console.log(devices[device].name)
                        // jsPlumb.revalidate(devices[device].name);
                }, 3000);

            })(device)



            // console.log(devices[device])
            //  var deviceType = devices[device].boxType;
            //   var deviceName = devices[device].name;
            //  console.log($('#' + deviceName + "Container"), 7777)
            //$('#y".$id_kurs."').val(top);
            //  var myBox = new box(eval(deviceType + "('" + deviceName + "')"))
            // var myBox = new box(eval("deviceType"+"(deviceName)"))
        }
    }

    loadFromUrl(getParam) {
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        return getUrlParameter('jsonProject');
    }

    EncBase64(x, base64url) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var r = "",
            d = 0,
            bits = 0,
            l = x.length,
            get = function (i) {
                return x[i]
            };
        if (base64url)
            tab = tab.replace("+/", "-_");
        if (typeof (x) == "string")
            get = function (i) {
                return x.charCodeAt(i);
            };
        for (var i = 0;
            (i < l) || bits; ++i) {
            d <<= 1, ++bits;
            if (i < l)
                d = (d << 7) + (get(i) & 0xff), bits += 7;
            while (bits >= 6)
                r += tab[(d >> (bits -= 6)) & 0x3f];
        }
        if (!base64url)
            r += "===".substr(0, ((r.length + 3) & ~3) - r.length);
        return r;
    }

    DecBase64(x, str) {
        x = x.split("=")[0];
        var tab = "-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var r = [],
            d = 0,
            bits = 0,
            l = x.length;
        for (var i = 0; i < l; ++i) {
            d = (d << 6) + ((tab.indexOf(x[i]) - 2) & 0x3f);
            if ((bits += 6) >= 8)
                r.push((d >> (bits -= 8)) & 0xff);
        }
        if (str)
            r = String.fromCharCode.apply(null, r);
        return r;
    }
}