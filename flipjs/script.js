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
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    node = audioCtx.createAnalyser();
    node.fftSize = 256;
    var source = audioCtx.createMediaElementSource(player);
    source.connect(node);
    node.connect(audioCtx.destination);

    volume = 0;
    streamData = new Uint8Array(node.fftSize/2);
    setInterval(sampleAudioStream, 20);
    }

    void playStream() {
        player.setAttribute('src', streamUrl);
        player.play();
    }

    void sampleAudioStream() {
        node.getByteFrequencyData(self.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i < 80; i++) { // Only first 80 bins, else too loud with treble
            total += self.streamData[i];
        }
        volume = total;
    }

    int get_volume() {
        return volume;
    }
}

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
    i = Math.floor(audioSource.get_volume()/10000*256);
    background(i);
}

