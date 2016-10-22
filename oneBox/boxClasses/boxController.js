"use strict"
class boxController extends boxUI{
    constructor(){
    super()
    console.log(this,'BOX CONTROLLER')
    //console.log(this.initBoxValues)
    }
    initBoxValues(boxJson) {
        
        this.setName(boxJson.name);
        this.setType(boxJson.type);
        this.setParentBox(boxJson.parentBox);
        this.setSdkPosition({top:boxJson.sdkTop,left:boxJson.sdkLeft});
        this.setGuiPosition({top:boxJson.guiTop,left:boxJson.guiLeft});
        this.setCurrentView(boxJson.currentView);
        this.setConnectors(this.getConnectors());
        this.setIsShowInGUI(boxJson.isShowInGui);
        this.setHeight(boxJson.height);
        this.setWidth(boxJson.width);
        //this.setPatchValues(boxJson.patchValues);
    }

    createBox() {
         
        this.createBoxUI();
        if (this.getIsShowInGUI()){
           
                document.getElementById('isShowInGuiCheckbox'+this.getName()).checked = true
            }
    }
}


