<script type="text/javascript" src="./js/mml.js"></script>
 <script src="js/nexusUI.js"></script>
  <script src="js/qwerty-hancock.js"></script>
<canvas nx="keyboard"></canvas>
   	<html>
	<head>
		<title>NexusUI Demo</title>
		  <div id="keyboard"></div>
		<script>
    var keyboard = new QwertyHancock({
                     id: 'keyboard',
                     width: 600,
                     height: 150,
                     octaves: 2,
                     startNote: 'A3',
                     whiteNotesColour: 'white',
                     blackNotesColour: 'black',
                     hoverColour: '#f3e939'
                });

  var audioContext = new AudioContext();

  </scr 
