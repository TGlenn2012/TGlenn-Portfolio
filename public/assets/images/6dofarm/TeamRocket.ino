/**********************************************************************************
 * Sketch: TeamRocket                                                             *
 * Function: This sketch works alongside the Team Rocket Unity project. The Unity *
 * interface will send  the ESP 32 the desired PWM signal of the servo and move   *
 * the servo to that position. It also will send the controls for moving the car  *                                                   
 * forwards, backward, left, and right.                                           *
 **********************************************************************************/

#include <SPI.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include "esp32-hal-ledc.h"

int listenPort = 1000;
int sendPort = 5000;

// Servo 1
const int channel1 = 1;
const int servo1 = 13;

// Servo 2
const int channel2 = 2;
const int servo2 = 12;

// Servo 3
const int channel3 = 3;
const int servo3 = 14;

// Servo 4
const int channel4 = 4;
const int servo4 = 27;

// Servo 5
const int channel5 = 5;
const int servo5 = 33;

// Servo 6
const int channel6 = 6;
const int servo6 = 32;

// frequency = 50 Hz, bit-width = 16
const int freq = 50;
const int width = 16;

// Pins for Right motor
int in1 = 5;
int in2 = 18;

// Pins for Left motor
int in3 = 19;
int in4 = 21;

// onboard LED variable
const int onboardLED = 2;

#define UDP_TX_PACKET_MAX_SIZE 8192

// buffers for receiving and sending data
char packetBuffer[50]; //buffer to hold incoming packet,

WiFiUDP Udp;
int status = WL_IDLE_STATUS;
char ssid[] = "NETGEAR59";
char pass[] = "luckybug189";

void setup() {  
  // open serial for debug
  Serial.begin(115200);
  
  // set up servo 1
  ledcSetup(channel1, freq, width);
  ledcAttachPin(servo1, channel1);

  // set up servo 2
  ledcSetup(channel2, freq, width);
  ledcAttachPin(servo2, channel2);

  // set up servo 3
  ledcSetup(channel3, freq, width);
  ledcAttachPin(servo3, channel3);

  // set up servo 4
  ledcSetup(channel4, freq, width);
  ledcAttachPin(servo4, channel4);

  // set up servo 5
  ledcSetup(channel5, freq, width);
  ledcAttachPin(servo5, channel5);

  // set up servo 6
  ledcSetup(channel6, freq, width);
  ledcAttachPin(servo6, channel6);

  // pinmode all pins for the DC motors
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  
  //pinMode the on-board LED and write LOW to start
  pinMode(onboardLED, OUTPUT);
  digitalWrite(onboardLED, LOW);
   
  delay(100);
  
  // We start by connecting to a Wifi network
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  
  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:    
    status = WiFi.begin(ssid, pass);
  
    // wait 5 seconds for connection:
    delay(5000);
  } 
  
  Serial.print("WiFi connected! IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(onboardLED, HIGH);  // Turn LED on once the ESP32 connects to Wifi.
  Udp.begin(listenPort);

  stop();
}

void right()
{
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);

  // analogWrite(enA, speed);
  //ledcWrite(ledChannel_0, Speed);

  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  // analogWrite(enB, speed);
  //ledcWrite(ledChannel_1, Speed);
}

void left()
{

  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  // analogWrite(enA, speed);
  //ledcWrite(ledChannel_0, Speed);

  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  // analogWrite(enB, speed);
  //ledcWrite(ledChannel_1, Speed);
}

void backward()
{
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);

  // analogWrite(enA, speed);
  //ledcWrite(ledChannel_0, Speed);

  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  // analogWrite(enB, speed);
  //ledcWrite(ledChannel_1, Speed);
}

void forward()
{

  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  // analogWrite(enA, speed);
  //ledcWrite(ledChannel_0, Speed);

  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  // analogWrite(enB, speed);
  //ledcWrite(ledChannel_1, Speed);
}

void stop()
{
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

void readPacket() {
  // parse packet to get the size of the packet
  int packetSize = Udp.parsePacket();
  int pos = 0;
  
  if(packetSize)
  {
    // Display the size of the packet and who sent it
    memset(packetBuffer, 0, sizeof(packetBuffer));
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remote = Udp.remoteIP();
    for (int i =0; i < 4; i++)
    {
      Serial.print(remote[i], DEC);
      if (i < 3) { Serial.print("."); }
    }
    Serial.print(", port ");
    Serial.println(Udp.remotePort());

    // Read the incoming packet
    Udp.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);

    char fwd[] = "F";
    char bwd[] = "B";
    char lft[] = "L";
    char rgt[] = "R";
    char stp[] = "S";

    Serial.print("Contents: ");
    Serial.println(packetBuffer); 
    if (packetSize == 1)
    {
      if(strcmp(packetBuffer, fwd) == 0)   // if ESP32 receives "F"...
      {
        forward();                         // Car moved forward
        Serial.println("The car is moving ");
        Serial.print(packetBuffer);
      }
      else if(strcmp(packetBuffer, bwd) == 0)    // else if ESP32 receives "B"
      {
        backward();                         // Car moved backward
        Serial.println("The car is moving ");
        Serial.print(packetBuffer);
      }
      else if(strcmp(packetBuffer, lft) == 0)    // else if ESP32 receives "L"
      {
        left();                         // Car moved left
        Serial.println("The car is moving ");
        Serial.print(packetBuffer);
      }
      else if(strcmp(packetBuffer, rgt) == 0)    // else if ESP32 receives "R"
      {
        right();                         // Car moved right
        Serial.println("The car is moving ");
        Serial.print(packetBuffer);
      }
      else if(strcmp(packetBuffer, stp) == 0)    // else if ESP32 receives "S"
      {
        stop();                         // Car Stopped
        Serial.println("The car is moving ");
        Serial.print(packetBuffer);
      }
    }
    // If the size of the packet is 2...
    else if (packetSize == 2)
    {      
      // Set the position equal to the last digit
      pos = packetBuffer[1] - '0';
 
      // If the first element of the packet is "a" (servo # 1)
      if (packetBuffer[0] == 'a')
      {
        Serial.print("Servo1 Position: ");
        Serial.println(pos); 
        ledcWrite(channel1, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'b')
      {
        Serial.print("Servo2 Position: ");
        Serial.println(pos); 
        ledcWrite(channel2, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'c')
      {
        Serial.print("Servo3 Position: ");
        Serial.println(pos); 
        ledcWrite(channel3, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'd')
      {
        Serial.print("Servo4 Position: ");
        Serial.println(pos); 
        ledcWrite(channel4, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'e')
      {
        Serial.print("Servo5 Position: ");
        Serial.println(pos); 
        ledcWrite(channel5, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'f')
      {
        Serial.print("Servo6 Position: ");
        Serial.println(pos); 
        ledcWrite(channel6, pos); // Moved the servo to the desired angle
      }
    }

    // Else if the size of the packet is 3...
    else if (packetSize == 3)
    {
      // Set the position equal to the last digit
      pos = (packetBuffer[1] - '0') * 10 + (packetBuffer[2] - '0');
 
      // If the first element of the packet is "a" (servo # 1)
      if (packetBuffer[0] == 'a')
      {
        Serial.print("Servo1 Position: ");
        Serial.println(pos); 
        ledcWrite(channel1, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'b')
      {
        Serial.print("Servo2 Position: ");
        Serial.println(pos); 
        ledcWrite(channel2, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'c')
      {
        Serial.print("Servo3 Position: ");
        Serial.println(pos); 
        ledcWrite(channel3, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'd')
      {
        Serial.print("Servo4 Position: ");
        Serial.println(pos); 
        ledcWrite(channel4, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'e')
      {
        Serial.print("Servo5 Position: ");
        Serial.println(pos); 
        ledcWrite(channel5, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'f')
      {
        Serial.print("Servo6 Position: ");
        Serial.println(pos); 
        ledcWrite(channel6, pos); // Moved the servo to the desired angle
      }
    }

    // Else if the size of the packet is 4...
    else if (packetSize == 4)
    {
      // Set the position equal to the last digit
      pos = (packetBuffer[1] - '0') * 100 + (packetBuffer[2] - '0') * 10 + (packetBuffer[3] - '0');
 
      // If the first element of the packet is "a" (servo # 1)
      if (packetBuffer[0] == 'a')
      {
        Serial.print("Servo1 Position: ");
        Serial.println(pos); 
        ledcWrite(channel1, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'b')
      {
        Serial.print("Servo2 Position: ");
        Serial.println(pos); 
        ledcWrite(channel2, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'c')
      {
        Serial.print("Servo3 Position: ");
        Serial.println(pos); 
        ledcWrite(channel3, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'd')
      {
        Serial.print("Servo4 Position: ");
        Serial.println(pos); 
        ledcWrite(channel4, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'e')
      {
        Serial.print("Servo5 Position: ");
        Serial.println(pos); 
        ledcWrite(channel5, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'f')
      {
        Serial.print("Servo6 Position: ");
        Serial.println(pos); 
        ledcWrite(channel6, pos); // Moved the servo to the desired angle
      }
    }

    // Else if the size of the packet is 5...
    else if (packetSize == 5)
    {      
      // Set the position equal to the last digit
      pos = (packetBuffer[1] - '0') * 1000 + (packetBuffer[2] - '0') * 100 + (packetBuffer[3] - '0') * 10 + (packetBuffer[4] - '0');
 
      // If the first element of the packet is "a" (servo # 1)
      if (packetBuffer[0] == 'a')
      {
        Serial.print("Servo1 Position: ");
        Serial.println(pos); 
        ledcWrite(channel1, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'b')
      {
        Serial.print("Servo2 Position: ");
        Serial.println(pos); 
        ledcWrite(channel2, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'c')
      {
        Serial.print("Servo3 Position: ");
        Serial.println(pos); 
        ledcWrite(channel3, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'd')
      {
        Serial.print("Servo4 Position: ");
        Serial.println(pos); 
        ledcWrite(channel4, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'e')
      {
        Serial.print("Servo5 Position: ");
        Serial.println(pos); 
        ledcWrite(channel5, pos); // Moved the servo to the desired angle
      }
      else if (packetBuffer[0] == 'f')
      {
        Serial.print("Servo6 Position: ");
        Serial.println(pos); 
        ledcWrite(channel6, pos); // Moved the servo to the desired angle
      }
    }
  }
}

void loop() {     
  readPacket();
}


