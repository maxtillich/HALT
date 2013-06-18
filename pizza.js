/**
 * Usage: node pizza.js <device>
 */
var fs = require('fs'),
    util = require('util'),
    connect = require('connect'),
    serialport = require("serialport");

var port = 8080;

if (process.argv.length < 3) {
  util.puts('Please supply a USB device to connect to.');
  util.puts('Available devices:');
  serialport.list(function (err, ports) {
    ports.forEach(function(port) {
      util.print("* " + port.comName + " - " + port.manufacturer + "\n");
    });
    util.puts('');
    util.puts('Select a device and run `node pizza.js <device>`');
  });  
  return;
}
var device = process.argv[2];
var counter = {};

console.log('Connecting to ' + device + ' ...');
var serialPort = new serialport.SerialPort(device, {
    baudrate: 9600
});
serialPort.on("open", function () {
  console.log('Connected to device.');
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
).listen(port);

console.log("Serving on localhost:" + port);