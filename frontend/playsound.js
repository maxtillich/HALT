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
            console.log(data["1"]);
            console.log(data["2"]);
            console.log(data["3"]);
            console.log(data["4"]);

            console.log( data );

            data_array = [];
            for (key in data) {
                data_array.push( {nr: parseInt(key, 10), value: data[key]} );
            }
            
            console.log( data_array );

            data_array.sort( function(a,b){ return (b.value - a.value); } );

            console.log( data_array );

        });
    };

    // Alle sounds alle 5 minuten durch spielen
    var update_sounds = function() {
        // aktiviere sound data_array[0].nr
        if (data_array.length == 0) return;
        console.log("update sound zu " + data_array[0].nr);
        var audio_number = '#audio'+data_array[0].nr;
        $(audio_number).get(0).play();
    };

    // Den groessten alle 3 minuten
    var update_sounds_first = function() {
        // aktiviere sound data_array[0].nr
        if (data_array.length == 0) return;
        console.log("update sound zu " + data_array[0].nr);
        var audio_number = '#audio'+data_array[0].nr;
        $(audio_number).get(0).play();
    };

    // Den zweitgroessten alle 14 minuten
    var update_sounds_second = function() {
        // aktiviere sound data_array[1].nr
        if (data_array.length == 0) return;
        console.log("update sound zu " + data_array[1].nr);
        var audio_number = '#audio'+data_array[1].nr;
        $(audio_number).get(0).play();
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
        interval_sounds = window.setInterval(update_sounds, 10000);
        interval_sounds_first = window.setInterval(update_sounds_first, 15000);
        interval_sounds_second = window.setInterval(update_sounds_second, 15000);
    };


    // MAGIC

    $('#stop-magic').click(function() {
        stop_magic();
    });

    $('#start-magic').click(function() {
        start_magic();   
    });


});