'use strict'
class audioDestination extends boxController {
    constructor(name) {
        super()
        this.setConnectors(this.connectors())
        this.setContent(this.content())
    }
    content(name) {
        var self = this
        var contentScript = document.createElement('script');
        return contentScript
    }
    connectors(oscName) {
        return [
        {
            value: "context.destination",
            IO: 'IN',
            type: 'WebAudioToWebAudio'
        }]
    }
}

