/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */

int state = 0;
int states[5];

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  states[0] = 0;
  states[1] = 558;
  states[2] = 737;
  states[3] = 844;
  states[4] = 512;
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  
  for (int i=0; i<5; i++) {
     if ((states[i]-10) < sensorValue && (states[i]+10) > sensorValue) {
        if (i != state && i != 0)
          Serial.println(i);
        state = i;
        break;
     } 
  }
  
  delay(10);
  
  
}
