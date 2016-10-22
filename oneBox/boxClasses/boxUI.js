"use strict"
class boxUI extends boxControlls {
    constructor() {


super();
    }
    createBoxUI() {
        var self = this;
        
        var container = this.createContainer_ui();
        this.setContainer(container)
        var titlebar = this.createTitleBar_ui();
        var workspace = this.createWorkspace_ui();
        var connectorsContainer = this.createConnectorsContainer_ui();
      
            // jsPlumb.draggable(container)
            //jsPlumb.draggable(container, false);
            //jsPlumb.setDragScope(titlebar);




        titlebar.onmousedown = function () {
            titlebar.onmouseup = function () {
                jsPlumb.toggleDraggable(container.id)
            }
            console.log(this.id)

          
            jsPlumb.toggleDraggable(container.id);
              jsPlumb.draggable(container.id);
        }

        //      jsPlumb.removeFromDragSelection(titlebar,workspace,connectorsContainer);
        //         jsPlumb.removeFromDragSelection(titlebar,workspace,connectorsContainer);
        //jsPlumb.draggable(container    );
        //   jsPlumb.addToPosse([container,titlebar], container.id);

        //jsPlumb.addToPosse(["flowchartWindow1", "flowchartWindow2"], "posse");
        //create window+titlebar
        container.appendChild(titlebar);
        container.appendChild(workspace);
        //create workspace+connectorsContainer
        ////myWindow.appendChild(workspace);
        workspace.appendChild(self.getContent());
        workspace.appendChild(connectorsContainer);


        setTimeout(function () {

            var connectors = self.addConnectors_ui(self.getConnectors());
        }, 1000)
        this.getParentBox().appendChild(container);
    }
    createContainer_ui() {
        //boxContainerDiv
        var boxContainerDiv = document.createElement('div')
        boxContainerDiv.id = 'boxContainerDiv_' + this.getName();
        boxContainerDiv.className = 'boxContainerDiv jsplumb-drag-select';
        boxContainerDiv.setAttribute('name', this.getType());

        /*     $(boxContainerDiv).resizable({
             resize : function(event, ui) {            
                     jsPlumb.repaint(ui.helper);
                 },
                 handles: "all"
             });*/
        return boxContainerDiv
    };
    createTitleBar_ui() {
        var self = this;
        var boxTitleBar = document.createElement('div');
        boxTitleBar.id = this.getName() + "Title";
        boxTitleBar.className = "boxToolbarDiv"
        boxTitleBar.innerHTML = this.getName();
        boxTitleBar.style.position = "relative";


        var titleBarButtonMinimise = document.createElement('button')
        titleBarButtonMinimise.id = 'titleBarMinimiseButton_' + this.getName();
        titleBarButtonMinimise.innerHTML = "-";
        titleBarButtonMinimise.className = 'boxToolbarIcon';
        titleBarButtonMinimise.onclick = function () {
            self.minimiseBoxAction();
        }
        var titleBarButtonClose = document.createElement('button')
        titleBarButtonClose.id = 'titleBarCloseButton_' + this.getName();
        titleBarButtonClose.innerHTML = "X";
        titleBarButtonClose.className = 'boxToolbarIcon';
        titleBarButtonClose.onclick = function () {
            
            self.closeBoxAction();
        }

        //checkbox
        var isShowInGuiCheckbox = document.createElement('input');
        isShowInGuiCheckbox.type = 'checkbox';
        isShowInGuiCheckbox.id = 'isShowInGuiCheckbox' + this.getName(); // need unique Ids!
        isShowInGuiCheckbox.className = 'checkbox';

        isShowInGuiCheckbox.onclick = function () {
            self.setIsShowInGUI(this.checked)
            var workspaceDiv = document.getElementById('boxWorkspaceDiv_' + self.getName());
            workspaceDiv.className += " showInGUI"
            if (this.checked) {
                workspaceDiv.classList.add("showInGUI");
            } else {
                workspaceDiv.classList.remove("showInGUI");
            }
        }


        /*         $(isShowInGuiCheckbox).click(function() {
                if (!$(this).is(':checked')) {
                  console.log(checked)
                }else{
                 console.log(checked)
                }
            });*/


        boxTitleBar.appendChild(titleBarButtonMinimise)
        boxTitleBar.appendChild(titleBarButtonClose)
        boxTitleBar.appendChild(isShowInGuiCheckbox)
        return boxTitleBar

    };
    createWorkspace_ui() {
        var boxWorkspaceDiv = document.createElement('div')
        boxWorkspaceDiv.id = 'boxWorkspaceDiv_' + this.getName();
        boxWorkspaceDiv.className = 'boxWorkspaceDiv';
        return boxWorkspaceDiv
    };
    createConnectorsContainer_ui() {
        //container
        var connectorsContainer = document.createElement('div');
        connectorsContainer.id = 'boxConnectorsContainerDiv_' + this.getName();
        connectorsContainer.className = 'boxConnectorsContainerDiv';;
        var connectors = this.getConnectors();
        //create boxes inside container
        var connectorsDublicates = {}
        for (var connector in connectors) {
            var currentConnector = connectors[connector]
            var connectorBox = document.createElement('div');
            if (connectorsDublicates[currentConnector.value] == null) {
                connectorsDublicates[currentConnector.value] = (currentConnector.value)
                connectorBox.id = currentConnector.value;
                connectorBox.setAttribute("name", currentConnector.value)
                connectorBox.className = 'boxConnector';
                var lableDiv = document.createElement('div');
                lableDiv.innerHTML = currentConnector.value; + "<br>";
                connectorBox.appendChild(lableDiv);
                connectorBox.style.position = "relative";
                connectorsContainer.appendChild(connectorBox);
            }

        }
        //boxConnectorsDiv
        return connectorsContainer;
    };
    createTitleBarButtons_ui() {

    };
    /* createConnectors_ui() {
         var connectors = this.setConnectors()
          console.log(connectors)
         for (var connector in connectors) {
            
             var newConnectorBox = document.createElement('div');
             newConnectorBox.id = connectors[connector];
             newConnectorBox.innerHTML = connectors[connector];
             newConnectorBox.className = 'boxConnectorDiv';
             var boxContainerDiv = 'boxConnectorsContainerDiv_' + this.getName();
             boxConnectorsDiv.appendChild(newConnectorBox);
         }
     }*/
    ///connectors
    createConnectors() {
        this.addConnectors(this.getConnectors())
    }
    addConnectors_ui(connectors) {
        //IO
        var self = this
        for (var connectorx in connectors) {
            (function () {
             //   setTimeout(function() {
                     self.createConnectors(connectors[connectorx])
            //    }, 3000);
               
            })(connectors[connectorx])
        }
    }
    createConnectors(connectorJson) {

        //connection type
        if (connectorJson.type == 'WebAudioToWebAudio') {
            var endPointColor = 'black'
        }

        if (connectorJson.type == 'ControllerToWebAudio') {
            var endPointColor = 'green'
        }


        if (connectorJson.type == 'webAudioToAnaliser') {
            var endPointColor = 'yellow'
        }



        if (connectorJson.IO == 'IN') {
            var location = 'Left'
            var isSource = false;
            var isTarget = true;
        }
        if (connectorJson.IO == 'OUT') {
            var location = 'Right'
            var isSource = true;
            var isTarget = false;
        }

        var common = {
            paintStyle: {
                fillStyle: endPointColor,
                outlineColor: endPointColor,
                outlineWidth: 1,
                radius: 4
            },
            ///   label:connectorJson.value,
            uuid: connectorJson.value + connectorJson.IO,
            isSource: isSource,
            isTarget: isTarget,
            maxConnections: 10,
            connectorHoverStyle: {
                lineWidth: 2,

            }
        };
//end point style
        jsPlumb.addEndpoint(connectorJson.value, {
            anchor: location,
           // paintStyle:{lineWidth:4, fillStyle:"blue", outlineColor:'rgb(249, 38, 114)'},
        //    connectorPaintStyle:{ strokeStyle:"blue", lineWidth:10 },
        paintStyle: { fillStyle:"rgb(249, 38, 114)", outlineColor:'rgb(249, 38, 114)', outlineWidth:1 ,strokeStyle:"rgb(0, 0, 135)", }
        }, common)

    }
}