'use strict'
class boxControlls extends boxEntety {
    constructor() {
        super();
    }
    minimiseBoxAction() {
        var self = this;
        var minimiseButton = document.getElementById('titleBarMinimiseButton_' + this.getName());;
        var workspaceDiv = document.getElementById('boxWorkspaceDiv_' + this.getName());;

        if ($(minimiseButton).html() == "-") {
            $(minimiseButton).html("+");

            $('div', $('#boxConnectorsContainerDiv_' + this.getName())).each(function (e) {
                jsPlumb.hide(this, true);
            })


        } else {
            $('div', $('#boxConnectorsContainerDiv_' + this.getName())).each(function (e) {
                jsPlumb.show(this, "hide");
            })

            $(minimiseButton).html("-");
        }
        $(workspaceDiv).slideToggle();
    }


    closeBoxAction() {
        var node = document.getElementById('boxContainerDiv_' + this.getName());

        $('div', $('#boxConnectorsContainerDiv_' + this.getName())).each(function (e) {
                // console.log(this.id,e,111111)
                jsPlumb.removeAllEndpoints(this);
            })
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
}


/*
   //minimiseAction
            var titleBarButtonMinimise = document.createElement('button');
            titleBarButtonMinimise.id = 'titleBarButtonMinimise_' + this.getName();
            titleBarButtonMinimise.innerHTML = "+";
            titleBarButtonMinimise.onclick = function () {
                    self.minimiseAction()
                }
                //closeBoxAction
            var titleBarButtonClose = document.createElement('button');
            titleBarButtonClose.id = 'titleBarButtonClose_' + this.getName();
            titleBarButtonClose.innerHTML = "X"
            titleBarButtonClose.onclick = function () {
                self.closeBoxAction('boxContainerDiv_' + self.getName())
            }*/