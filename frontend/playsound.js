$(function() {

    // CONTROLS

    HTMLAudioElement.prototype.stop = function()
    {
        this.pause();
        this.currentTime = 0.0;
    }

    $('#reset-audio').click(function() {
        console.log('reset');
        $('.audio').each(function(){
            this.stop();
        });
    });

    $('#pause-audio').click(function() {
        console.log('pause');
        $('.audio').each(function(){
            this.pause();
            console.log('paused');
        });
    });


    var data_array = [];

    var update_data = function() {
        $.getJSON('latest.json', function(data) {

            data_array = [];
            for (key in data) {
                if (data[key] <= 0) continue;
                data_array.push( {nr: parseInt(key, 10), value: data[key]} );
            }
            
            data_array.sort( function(a,b){ return (b.value - a.value); } );

            //console.log( data_array );

        });
    };  

    var sound_is_playing = false;

    var stopSounds = function() {
        $('.audio').each(function(){
            this.pause();
        });
    };

    var setSound = function(nr, level) {
        stopSounds();
        var rand = Math.round(  (Math.random() * 2) + 1  ); // rand in [1,3]
        console.log("update sound zu " + nr + "-" + rand);
        var audio_number = '#audio'+nr + "-" + rand;
        if ($(audio_number).length == 0) {
            console.error('Sound not found');
            return;
        }
        $(audio_number).get(0).volume=level;
        $(audio_number).get(0).play();
        $(audio_number).bind("ended", function(){
            sound_is_playing = false;
        });
        sound_is_playing = true;
    };

    var current_sound = 0;

    // Alle sounds alle 5 minuten durch spielen
    var update_sounds = function() {
        // aktiviere sound data_array[0].nr
        if (data_array.length == 0) return;

        setSound(data_array[current_sound].nr, 1.0);

        current_sound ++;
        if(current_sound >= data_array.length ) {
            current_sound = 0;
        }
    };

    // Den groessten alle 3 minuten
    var update_sounds_first = function() {
        // aktiviere sound data_array[0].nr
        if (data_array.length == 0) return;
        if (sound_is_playing) return;
        setSound(data_array[0].nr, 0.3);
    };

    // Den zweitgroessten alle 13 minuten
    var update_sounds_second = function() {
        // aktiviere sound data_array[1].nr
        if (data_array.length == 0) return;
        if (sound_is_playing) return;
        setSound(data_array[1].nr, 0.4);
    };




    var interval_data, interval_sounds, interval_sounds_first, interval_sounds_second;
    var stop_magic = function() {
        window.clearInterval(interval_data);
        window.clearInterval(interval_sounds);
        window.clearInterval(interval_sounds_first);
        window.clearInterval(interval_sounds_second);
    };
    var start_magic = function() {
        interval_data = window.setInterval(update_data, 1000);
        interval_sounds = window.setInterval(update_sounds, 270000);
        interval_sounds_first = window.setInterval(update_sounds_first, 180000);
        interval_sounds_second = window.setInterval(update_sounds_second, 786000);
    };


    // MAGIC

    $('#stop-magic').click(function() {
        stop_magic();
        $('#start-magic').attr('disabled', false);
    });

    $('#start-magic').click(function() {
        start_magic();
        $(this).attr('disabled', true);   
    });


});