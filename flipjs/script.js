/*
Inspired by Michael Bromley
https://github.com/michaelbromley/soundcloud-visualizer/blob/master/js/app.js
*/


int i = 0;
String URL = "https://soundcloud.com/lafelix/starwin-boys-noize-la-felix";
String client_id = "8000818c2ef2e0c6d536dacf2ee7fd50";
String redirect_uri = "http://localhost/flipjs";
String streamUrl = "http://api.soundcloud.com/tracks/108242177/stream?client_id=" + client_id;


class SoundCloudAudioSource {

    SoundCloudAudioSource(audioID) {
    var player = document.getElementById(audioID);
    }

    void playStream () {
        player.setAttribute('src', streamUrl);
        player.play();
    }
}

//     var analyser;
//     var audioCtx = new (window.AudioContext || window.webkitAudioContext);
//     analyser = audioCtx.createAnalyser();
//     analyser.fftSize = 256;
//     // Hook up the <audio> element
//     var source = audioCtx.createMediaElementSource(player);
//     source.connect(analyser);
//     analyser.connect(audioCtx.destination);
//     var sampleAudioStream = function() {
//         // This closure is where the magic happens.
//         // Because it gets called with setInterval below, continuously samples the audio data
//         // and updates the streamData and volume properties.
//         // This the SoundCouldAudioSource function can be passed to a visualization routine and
//         // continue to give real-time data on the audio stream.
//         analyser.getByteFrequencyData(self.streamData);
//         // calculate an overall volume value
//         var total = 0;
//         for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
//             total += self.streamData[i];
//         }
//         self.volume = total;
//     };
//     setInterval(sampleAudioStream, 20); //

//     // Public properties and methods
//     this.volume = 0;
//     this.streamData = new Uint8Array(analyser.fftSize/2);
// }

audioSource = new SoundCloudAudioSource('player');

void setup() {
    background(0);
    SC.initialize({
        client_id: client_id,
        redirect_uri: redirect_uri,
    });

    SC.get('/resolve', {url:URL}, function(sound) {
        if (sound.errors) {
            alert("ERROR!");
            return;
        }
        audioSource.playStream();

    });



}

void draw() {
    background(i);
    i = i+1;
}

