// MQTT publisher
class MQTTclass {
  #PORT;
  #DOMAIN;
  #CLIENT;
  #MQtt;
  #i = 0;
  // #connect;

  constructor(MQtt, port, domain) {
    this.#PORT = port;
    this.#DOMAIN = domain;
    this.#MQtt = MQtt;
  }
  On(event, obj) {
    switch (event) {
      case "connect":
        this._connect(obj.source, obj);
        return this;

      default:
        break;
    }
    return this;
  }
  _connect(topic, message) {
    this.#i <= 0
      ? console.log("CONNECTED TO " + `mqtt://${this.#DOMAIN}:${this.#PORT}`)
      : "";

    this.#i++;

    this.#CLIENT = this.#MQtt.connect(`mqtt://${this.#DOMAIN}:${this.#PORT}`);
    //console.log(this.#CLIENT);
    this.#CLIENT.on("connect", () => {
      console.log("down", JSON.stringify(message));
      this.#CLIENT.publish(topic, JSON.stringify(message));
      //console.log(message);
    });
  }
  publish(message) {
    this.#CLIENT.publish(message.source, JSON.stringify(message));
    console.log("PUBLISHED >>>> " + JSON.stringify(message));
  }
}

function MQTT_PUB(MQtt, port, domain) {
  return new MQTTclass(MQtt, port, domain);
}

export default MQTT_PUB;
/*
USE CASE EXAMPLE
import MQTT_PUB from "./path"


cont MQTTCONNECT = MQTT_PUB(mqtt, 3000,localhost);
     
     
     
    MQTTCONNECT.On("connect",
    {
      auth:{
        clientID:key1,
        sessionID:key2,
        publicID:key2
      },
      channel:"key1/key2/key3",
      data:{
        temperature:"300 °C",
        speed:"100 m/s",
        lenght:"4mm",
      },
      command:["stop","start","pause"],
      status:{},

    }
    );






*/

/**
 * 
 * var mqtt = require("mqtt");
require("dotenv").config();

const Url = `${process.env.DOMAIN}:${process.env.PORT}`;
var client = mqtt.connect(Url);

var topic = "LINTANGtest123";
var message = "Hello World!";

client.on("connect", () => {
  client.publish(topic, message);
  console.log("Message sent!", message);
});

 */
