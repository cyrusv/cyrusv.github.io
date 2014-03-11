void setup() {

    SoundCloudAudioSource = function(audioElement) {
        var player = document.getElementById(audioElement);
        var self = this;
        var analyser;
        // it's not been standardised accross browsers yet.
        var audioCtx = new (window.AudioContext || window.webkitAudioContext);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        // Hook up the <audio> element
        var source = audioCtx.createMediaElementSource(player);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        var sampleAudioStream = function() {
            // This closure is where the magic happens.
            // Because it gets called with setInterval below, continuously samples the audio data
            // and updates the streamData and volume properties.
            // This the SoundCouldAudioSource function can be passed to a visualization routine and
            // continue to give real-time data on the audio stream.
            analyser.getByteFrequencyData(self.streamData);
            // calculate an overall volume value
            var total = 0;
            for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
                total += self.streamData[i];
            }
            self.volume = total;
        };
        setInterval(sampleAudioStream, 20); //

        // Public properties and methods
        this.volume = 0;
        this.streamData = new Uint8Array(analyser.fftSize/2);
        this.playStream = function(streamUrl) {
            // get the input stream from the audio element
            player.setAttribute('src', streamUrl);
            player.play();
        }
    };

  audioSource = new SoundCloudAudioSource('player')
  console.log(audioSource)
}



void draw() {
    console.log(audioSource)
    background(100);
    for(bin=0; bin < audioSource.streamData.length; bin++) {
        var val = audioSource.streamData[bin];
        var red = val;
        var green = 255 - val;
        var blue = val / 2;
        background(red, green, blue);
        console.log(val)
        background(11)
    }

}
