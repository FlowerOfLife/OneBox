<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
	<title>FMSynth</title>

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<link rel="icon" type="image/png" sizes="174x174" href="./style/favicon.png">
	
	<script type="text/javascript" src="../js/Tone.js"></script>

	<script type="text/javascript" src="./js/interface.js"></script>



	<link rel="stylesheet" type="text/css" href="./style/examples.css">

	<script type="text/javascript">
		// jshint ignore: start
	</script>

</head>
<body>
	<div id="Content">
		<div id="Title">FMSynth</div>
		<div id="Explanation">	
			<a href="https://tonejs.github.io/docs/#FMSynth">Tone.FMSynth</a>
			is composed of two 
			<a href="https://tonejs.github.io/docs/#Synth">Tone.Synths</a> 
			where one Tone.Synth modulates the frequency of a second Tone.Synth. 
		</div>
	</div>

	<script type="text/javascript">	
	Tone.setContext(audioContext);		
		var synth = new Tone.FMSynth({
			"modulationIndex" : 12.22,
			"envelope" : {
				"attack" : 0.01,
				"decay" : 0.2
			},
			"modulation" : {
				"type" : "square"
			},
			"modulationEnvelope" : {
				"attack" : 0.2,
				"decay" : 0.01
			}
		}).toMaster();
	</script>

	<script type="text/javascript">

		$(function(){
		
			new Interface.Slider({
				tone : synth,
				param : "modulationIndex",
				name : "mod index",
				max : 100
			});

			$("<div>", {
				"id" : "Keyboard"
			}).appendTo("#Content");

			var keyboard = new QwertyHancock({
				id: "Keyboard",
				width: $("#Content").width(),
				height: 150,
				octaves: Interface.isMobile ? 1.26 : 3,
				startNote: "C3",
				whiteKeyColour: "white",
				blackKeyColour: "#ECECEC",
				activeColour : "#FFFC0C"
			});

			keyboard.keyDown = function (note) {
			    synth.triggerAttack(note);
			};

			keyboard.keyUp = function (note) {
			    synth.triggerRelease();
			};
		});
	</script>
</body>
</html>