'use strict'
class visualiser extends boxController {
    constructor(name) {
    super();

        this.setName(name)
        this.setType('visualiser')
            // this.setParentBox('dashboard1')
        this.setConnectors(this.connectors(name))
       this.setContent(this.content(name))
    }
    content(name) {
        //add html object
        var self = this
        var contentScript = document.createElement('script');
        var visualiserDiv = document.createElement('div');
        var visualiserCanvas = document.createElement('canvas');
        visualiserCanvas.width = 400;
        visualiserCanvas.height = 80;
        visualiserDiv.id = "visualDiv" + name;
        visualiserCanvas.id = "visualCanvas" + name;
        visualiserDiv.appendChild(visualiserCanvas);
        self.visualiserCanvas = visualiserCanvas;

        //MAKE PUBLIC
        window[self.getName()] = this

        return visualiserDiv
    }
connect (lfo) {
    var self = this
        var visualiserCanvas = self.visualiserCanvas
            var analyser = context.createAnalyser();
            (lfo.connect(analyser));
            var WIDTH = 400;
            var HEIGHT = 80;
            var canvas = document.getElementById((visualiserCanvas.id));
            var myCanvas = canvas.getContext("2d");

            analyser.fftSize = 2048;
            var bufferLength = analyser.frequencyBinCount; 
            var dataArray = new Uint8Array(bufferLength);

            analyser.getByteTimeDomainData(dataArray);
            myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

            function draw() {
                var drawVisual = requestAnimationFrame(draw);
                analyser.getByteTimeDomainData(dataArray);

                myCanvas.fillStyle = 'white';
                myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
                myCanvas.lineWidth = 5;
                myCanvas.strokeStyle = 'rgb(0, 0, 0)';

                myCanvas.beginPath();
                var sliceWidth = WIDTH * 1.0 / bufferLength;
                var x = 0;

                for (var i = 0; i < bufferLength; i++) {

                    var v = dataArray[i] / 128.0;
                    var y = v * HEIGHT / 2;

                    if (i === 0) {
                        myCanvas.moveTo(x, y);
                    } else {
                        myCanvas.lineTo(x, y);
                    }

                    x += sliceWidth;
                };

                myCanvas.lineTo(canvas.width, canvas.height / 2);
                myCanvas.stroke();
            };

            draw();
        }
    connectors(visualiserName) {
        return [
            {
                value: visualiserName,
                IO: 'OUT',
                type: 'webAudioToAnaliser'
            }]
    }

}





// drawAnaliser(context, OBJECT, "OBJECT_visual")
