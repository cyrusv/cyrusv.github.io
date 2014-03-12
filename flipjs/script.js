/*
Inspired by Michael Bromley
https://github.com/michaelbromley/soundcloud-visualizer/blob/master/js/app.js
*/


int i = 0;
String URL = "https://soundcloud.com/lafelix/starwin-boys-noize-la-felix";
// String URL = "https://soundcloud.com/four-tet/live-in-tokyo";

String client_id = "8000818c2ef2e0c6d536dacf2ee7fd50";
String redirect_uri = "http://localhost/flipjs";


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
    setInterval(sampleAudioStream, 10);
    }

    void playStream(streamURL) {
        player.setAttribute('src', streamURL);
        player.play();
    }

    void sampleAudioStream() {
        node.getByteFrequencyData(self.streamData);

        var total = 0;

        // Only first 80 bins, else too loud with treble
        for (var i=20; i<50; i++) {
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
    size(screenWidth, screenHeight);
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
        audioSource.playStream(sound.stream_url + "?client_id=" + client_id);
    });
}

void draw() {
    i = Math.floor(audioSource.get_volume()/10000*256);
    background(i);
}
