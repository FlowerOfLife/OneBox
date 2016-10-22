'use strict'
class dashboard extends boxController {
    constructor() {
        console.log('boxUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        super();
        this.setConnectors(this.connectors())
        this.setContent(this.contentx())
        this.setIsShowInGUI(true)
    }

    contentx(name) {
        console.log(name,7000);
        //Menu
        var self = this
        var xMenu = new myMenu();
        //DashboardWorkspace
        var dashboardWorkspace = document.createElement('div');
        dashboardWorkspace.style.width = '100%';
        dashboardWorkspace.style.height = '100%';
        dashboardWorkspace.appendChild(xMenu.menuObject())


//GLOBAL SEQUENCER START BUTTON
        var startSequencerButton = document.createElement('i');
        startSequencerButton.className += 'startSeq material-icons'
        startSequencerButton.textContent = 'input';
        startSequencerButton.setAttribute('title', 'start');

        var stopSequencerButton = document.createElement('i');
        stopSequencerButton.className += 'stopSeq material-icons'
        stopSequencerButton.textContent = 'portable_wifi_off';
        stopSequencerButton.setAttribute('title', 'stop');

        dashboardWorkspace.appendChild(startSequencerButton);
        dashboardWorkspace.appendChild(stopSequencerButton);
        /*document.getElementById('menu').appendChild(startSequencerButton);
        document.getElementById('menu').appendChild(stopSequencerButton);*/

        startSequencerButton.onclick = function () {
            var allStartButtons = document.getElementsByClassName('startSeq');
            for (var startButton in allStartButtons) {
                if (document.getElementById(startButton)) {
                    console.log(document.getElementById(startButton));

                    document.getElementById(startButton).onclick()
                }

            }
        }

        stopSequencerButton.onclick = function () {
            var allStartButtons = document.getElementsByClassName('stopSeq');
            for (var startButton in allStartButtons) {
                console.log(startButton);
                startButton.onclick()
            }
        }
//GLOBAL SEQUENCER START BUTTON

        return dashboardWorkspace
    }





    guiView() {
        var self = this
        this.changeView('GuiEditor')
        console.log(this.getCurrentView())
            //********************set current View
        this.setCurrentView('GuiEditor');

        self.resizeDashboardForGuiView()
            //jsPlumb.setDraggable(dashboardDevices[i], false);

    }


    guiEditor() {
        var self = this
        this.changeView('GuiEditor')
        console.log(this.getCurrentView())
            //********************set current View
        this.setCurrentView('GuiEditor');
        var dashboardWorkspace = self.getContent();
        $(dashboardWorkspace).animate({
            width: $("body").width()
        }, 300);
        $(dashboardWorkspace).animate({
            height: $("body").height()
        }, 300);
    }


    sdkView() {
        var self = this
        this.changeView('SdkView')
        console.log(this.getCurrentView())
        this.setCurrentView('SdkView');

        var dashboardWorkspace = self.getContent();
        $(dashboardWorkspace).animate({
            width: $("body").width()
        }, 300);
        $(dashboardWorkspace).animate({
            height: $("body").height()
        }, 300);
    }


    changeView(newView) {
        var self = this;

        console.log(this.getCurrentView())

        var dashboardWorkspace = self.getContent();
        var container = self.getContainer();
        var dashboardDevices = dashboardWorkspace.getElementsByClassName('boxContainerDiv');
        //process all boxes
        for (var i = 0; i < dashboardDevices.length; i++) {
            var myDevice = eval((dashboardDevices[i].id).replace('boxContainerDiv_', '') + "Box");
            var guiDevice = dashboardDevices[i];

            var oldView = self.getCurrentView();
            var currentPosition = {
                top: guiDevice.style.top,
                left: guiDevice.style.left
            }

            //OLD VIEW
            //********************save gui if old view guiEditor
            if (oldView == 'GuiEditor') {
                myDevice.setGuiPosition(currentPosition);

            }
            //********************save sdk if old view sdk
            if (oldView == 'SdkView') {
                myDevice.setSdkPosition(currentPosition);
            }

            //NEW VIEW
            //********************set current View positins
            if (newView == 'SdkView') {
                guiDevice.style.top = myDevice.getSdkPosition().top;
                guiDevice.style.left = myDevice.getSdkPosition().left;
                $(guiDevice).show()
                setTimeout(function () {
                    jsPlumb.revalidate(guiDevice.id);

                }, 100)
            }
            //new gui view
            if (newView == 'GuiEditor') {
                //********************hyde boxes
                if (myDevice.getIsShowInGUI() != true) {
                    $(guiDevice).hide()
                }
                if (myDevice.getGuiPosition().top == undefined) {
                    console.log(myDevice.getGuiPosition(), 1111)
                    myDevice.setGuiPosition({
                        top: "10px",
                        left: "10px"
                    })
                } else {

                }


                guiDevice.style.top = myDevice.getGuiPosition().top;
                guiDevice.style.left = myDevice.getGuiPosition().left;
                setTimeout(function () {
                    jsPlumb.revalidate(guiDevice.id);

                }, 100)
            }


            console.log(myDevice.getSdkPosition(), myDevice.getGuiPosition())

        }
    }
    resizeDashboardForGuiView() {
        var self = this;
        var dashboardWorkspace = self.getContent();
        var dashboardDevices = dashboardWorkspace.getElementsByClassName('boxContainerDiv');
        //process all boxes
        var dashboardWidth = 0
        var dashboardHeight = 0
        for (var i = 0; i < dashboardDevices.length; i++) {
            var myDevice = eval((dashboardDevices[i].id).replace('boxContainerDiv_', '') + "Box");
            var guiDevice = dashboardDevices[i];


            if (dashboardWidth < guiDevice.offsetLeft + guiDevice.offsetWidth) {
                dashboardWidth = guiDevice.offsetLeft + guiDevice.offsetWidth

            }

            if (dashboardHeight < guiDevice.offsetTop + guiDevice.offsetHeight) {
                dashboardHeight = guiDevice.offsetTop + guiDevice.offsetHeight;

            }
        }
        self.setWidth(dashboardWidth);
        self.setHeight(dashboardHeight)
        $(dashboardWorkspace).animate({
            width: dashboardWidth
        }, 300);
        $(dashboardWorkspace).animate({
            height: dashboardHeight
        }, 300);
    }
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
            //close button
        var titleBarButtonClose = document.createElement('button')
        titleBarButtonClose.id = 'titleBarCloseButton_' + this.getName();
        titleBarButtonClose.innerHTML = "X";
        titleBarButtonClose.className = 'boxToolbarIcon';
        titleBarButtonClose.onclick = function () {
            self.closeBoxAction();
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

        //sdk view button
        var sdkEditorView = document.createElement('button');
        sdkEditorView.innerHTML = "sdk";
        sdkEditorView.className = 'boxToolbarIcon';
        sdkEditorView.onclick = function () {
            self.sdkView();
        }
        sdkEditorView.onclick()
            //gui view button
        var guiView = document.createElement('button');
        guiView.className = 'boxToolbarIcon';
        guiView.innerHTML = "gui";
        guiView.onclick = function () {
            self.guiView();
        }

        var guiEditor = document.createElement('button');
        guiEditor.className = 'boxToolbarIcon';
        guiEditor.innerHTML = "guiEditor";
        guiEditor.onclick = function () {
            self.guiEditor();
        }

        boxTitleBar.appendChild(isShowInGuiCheckbox)
        boxTitleBar.appendChild(sdkEditorView)
        boxTitleBar.appendChild(guiView)
        boxTitleBar.appendChild(guiEditor)
        boxTitleBar.appendChild(titleBarButtonMinimise)
        boxTitleBar.appendChild(titleBarButtonClose)

        return boxTitleBar

    }

    connectors() {
        return [{
            value: "context.destination",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }]
    }
}