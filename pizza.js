var fs = require('fs');
var connect = require('connect');

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600
});

var counter = {};

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    data = data.toString().trim();
    if(data==='') return;

    if(typeof counter[data] === 'undefined')
      counter[ data ] = 0;
    counter[ data ] += 1;

    console.log(counter);
    writeLog(counter);
  });
});


function writeLog(data) {
  fs.writeFile("frontend/latest.json", JSON.stringify(data), function(err) {
    if(err) {
      console.log("Error writing file: " + err);
    }
  });
}

connect.createServer(
  connect.static(__dirname + '/frontend/')
).listen(8080);