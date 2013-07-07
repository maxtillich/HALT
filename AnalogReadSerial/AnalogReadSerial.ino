int state = 0;
int states[5];

void setup() {
  Serial.begin(9600);
  states[0] = 0;
  states[1] = 512;
  states[2] = 558;
  states[3] = 844;
  states[4] = 737;
}

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
