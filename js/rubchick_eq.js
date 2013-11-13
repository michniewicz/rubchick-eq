var context = null;

if (typeof AudioContext !== 'undefined') {
  context = new AudioContext();
} else if (typeof webkitAudioContext !== 'undefined') {
  context = new webkitAudioContext();
}

if(context === null){
	alert("not supported browser");
}

var audio_ = document.getElementById("audio_");

var gain = context.createGain();
gain.gain.value = 1;

var analyserNode = context.createAnalyser();

function initFilter(){
	var filter = context.createBiquadFilter();
	filter.type = 5;    
	filter.gain.value = null;    
	filter.Q.value = 1;
	
	return filter;
}

filter55Hz = initFilter();
filter55Hz.frequency.value = 55;

filter77Hz = initFilter();
filter77Hz.frequency.value = 77;

filter110Hz = initFilter();
filter110Hz.frequency.value = 110;

filter156Hz = initFilter();
filter156Hz.frequency.value = 156;

filter220Hz = initFilter();
filter220Hz.frequency.value = 220;

filter311Hz = initFilter();
filter311Hz.frequency.value = 311;

filter440Hz = initFilter();
filter440Hz.frequency.value = 440;

filter622Hz = initFilter();
filter622Hz.frequency.value = 622;

filter880Hz = initFilter();
filter880Hz.frequency.value = 880;

filter1200Hz = initFilter();
filter1200Hz.frequency.value = 1200;

filter1800Hz = initFilter();
filter1800Hz.frequency.value = 1800;

filter2500Hz = initFilter();
filter2500Hz.frequency.value = 2500;

filter3500Hz = initFilter();
filter3500Hz.frequency.value = 3500;

filter5000Hz = initFilter();
filter5000Hz.frequency.value = 5000;

filter7000Hz = initFilter();
filter7000Hz.frequency.value = 7000;

filter10000Hz = initFilter();
filter10000Hz.frequency.value = 10000;

filter14000Hz = initFilter();
filter14000Hz.frequency.value = 14000;

filter20000Hz = initFilter();
filter20000Hz.frequency.value = 20000;

window.addEventListener('load', function(e) {

  var source = context.createMediaElementSource(audio_);
  source.connect(gain);
  gain.connect(analyserNode);
  gain.connect(filter55Hz);
  filter55Hz.connect(filter77Hz);
  filter77Hz.connect(filter110Hz);
  filter110Hz.connect(filter156Hz);
  filter156Hz.connect(filter220Hz);
  filter220Hz.connect(filter311Hz);
  filter311Hz.connect(filter440Hz);
  filter440Hz.connect(filter622Hz);
  filter622Hz.connect(filter880Hz);
  filter880Hz.connect(filter1200Hz);
  filter1200Hz.connect(filter1800Hz);
  filter1800Hz.connect(filter2500Hz);
  filter2500Hz.connect(filter3500Hz);
  filter3500Hz.connect(filter5000Hz);
  filter5000Hz.connect(filter7000Hz);
  filter7000Hz.connect(filter10000Hz);
  filter10000Hz.connect(filter14000Hz);
  filter14000Hz.connect(filter20000Hz);
  filter20000Hz.connect(context.destination);
 
}, false);

$(function() {

	setupUIFilterSlider();
	
});

var flatPreset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var rockPreset = [2, 2, 1, -3, -4, -5, -5, -5, -5, -4, -4, -3, -2, 1, 2, 2, 2, 2];
var metalPreset = [4, 5, 5, 3, 0, -1, -2, -1, 0, 1, 1, 1, 1, 0, -1, -1, -1, -1];
var homeTheaterPreset = [5, 2, 0, -2, -3, -5, -6, -6, -5, -2, -1, 0, -1, -3, 3, 4, 3, 0];

var presetsHash = new Object();
presetsHash['Flat'] = flatPreset;
presetsHash['Rock'] = rockPreset;
presetsHash['Metal'] = metalPreset;
presetsHash['Home Theater'] = homeTheaterPreset;

var filtersArray = [filter55Hz, filter77Hz, filter110Hz, filter156Hz, filter220Hz, filter311Hz, filter440Hz, filter622Hz, filter880Hz, 
filter1200Hz, filter1800Hz, filter2500Hz, filter3500Hz, filter5000Hz, filter7000Hz, filter10000Hz, filter14000Hz, filter20000Hz];

function setPreset(presetArray){
	for(var i = 0; i < filtersArray.length; i++){
		filtersArray[i].gain.value = presetArray[i];
	}
	
	setupUIFilterSlider();
}

function changePreset(e){

	setPreset( presetsHash[e.value] );
}
  
function setupFilter(filter, val){
	return {
	'orientation': "vertical",
	'range': "min",
	'min': -20,
	'max': 20,
	'value': val, 
	'animate': true,
	'step': 0.01,
	'slide': function(event, ui) {  
		filter.gain.value = ui.value;
	 },
	'stop': function(event, ui) {
		console.log(filter);
	 }
	}
}

function setupUIFilterSlider(){
	$('#filter55Hz').slider( setupFilter(filter55Hz, filter55Hz.gain.value) );
	$('#filter77Hz').slider( setupFilter(filter77Hz, filter77Hz.gain.value) );
	$('#filter110Hz').slider( setupFilter(filter110Hz, filter110Hz.gain.value) );
	$('#filter156Hz').slider( setupFilter(filter156Hz, filter156Hz.gain.value) );
	$('#filter220Hz').slider( setupFilter(filter220Hz, filter220Hz.gain.value) );
	$('#filter311Hz').slider( setupFilter(filter311Hz, filter311Hz.gain.value) );
	$('#filter440Hz').slider( setupFilter(filter440Hz, filter440Hz.gain.value) );
	$('#filter622Hz').slider( setupFilter(filter622Hz, filter622Hz.gain.value) );
	$('#filter880Hz').slider( setupFilter(filter880Hz, filter880Hz.gain.value) );
	$('#filter1200Hz').slider( setupFilter(filter1200Hz, filter1200Hz.gain.value) );
	$('#filter1800Hz').slider( setupFilter(filter1800Hz, filter1800Hz.gain.value) );
	$('#filter2500Hz').slider( setupFilter(filter2500Hz, filter2500Hz.gain.value) );
	$('#filter3500Hz').slider( setupFilter(filter3500Hz, filter3500Hz.gain.value) );
	$('#filter5000Hz').slider( setupFilter(filter5000Hz, filter5000Hz.gain.value) );
	$('#filter7000Hz').slider( setupFilter(filter7000Hz, filter7000Hz.gain.value) );
	$('#filter10000Hz').slider( setupFilter(filter10000Hz, filter10000Hz.gain.value) );
	$('#filter14000Hz').slider( setupFilter(filter14000Hz, filter14000Hz.gain.value) );
	$('#filter20000Hz').slider( setupFilter(filter20000Hz, filter20000Hz.gain.value) );
}

function drawSpectrum () {
        
        var canvas = $('canvas')[0];
        var context = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var barWidth = 20;
        var barSpacing = 2;

        context.clearRect(0, 0, width, height);
        
        var frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(frequencyData);
        
        var barCount = Math.round(width / (barWidth + barSpacing));
        var loopStep = Math.floor(frequencyData.length / barCount);

        for (var i = 0; i < barCount; i++) {
            var barHeight = frequencyData[i * loopStep];
            context.fillRect(((barWidth + barSpacing) * i) + (barSpacing / 2), height, barWidth - barSpacing, -barHeight/2);
        }
};