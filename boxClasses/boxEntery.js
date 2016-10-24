"use strict"
class boxEntety {
    getName() {
        return this.name
    };
    setName(name) {
        this.name = name
    };
    getType() {
        return this.type
    };
    setType(type) {
        this.type = type
    };
    getFile() {
        return this.file
    };
    setFile(file) {
        this.file = file
    };
    getContainer() {
        return this.container
    };
    setContainer(container) {
        this.container = container
    };
    getConnectors() {
        return this.connectors;
    };
    setConnectors(connectors) {
        this.connectors = connectors
    };
    getSdkPosition() {
        return this.SdkPosition
    };
    setSdkPosition(SdkPosition) {
        this.SdkPosition = SdkPosition
    };
    getGuiPosition(GuiPosition) {
        return this.GuiPosition
    };
    setGuiPosition(GuiPosition) {
        this.GuiPosition = GuiPosition
    };
    getParentBox() {
        return this.parentBoard
    }
    setParentBox(parentBoard) {
        this.parentBoard = parentBoard
    }
    setContent(content){
    this.content = content
    }
    
    getContent(){
    return this.content
    }
    setIsShowInGUI(isShow){
    this.IsShowInGUI = isShow;
    }
    
    getIsShowInGUI(){
    return this.IsShowInGUI
    }
    
    getCurrentView(){
    return this.currentView
    };
    setCurrentView(currentView){
        this.currentView = currentView
    };
    
    setWidth(width){
    this.width = width
    }
    
    getWidth(){
    return this.width;
    }
    
    setHeight(height){
    this.height = height
    }
    
    
    getHeight(){
    return this.height;
    }

    getPatchValues(){
        return this.patchValues;
    }

    setPatchValues(patch){
       this.patchValues = patch 
    }
}