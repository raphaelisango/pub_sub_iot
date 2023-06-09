// MQTT SUBSCRIBER
class MQTTclass {
  #PORT;
  #DOMAIN;
  #CLIENT;
  #MQtt;
  constructor(MQtt, port, domain) {
    this.#PORT = port;
    this.#DOMAIN = domain;
    this.#MQtt = MQtt;
  }
  On(event, obj) {
    switch (event) {
      case "connect":
        this._connect(obj.channel);
        break;
      case "message":
        this._message(obj.OnMsgCallback);
        break;

      default:
        break;
    }
    return this;
  }
  _connect(topic) {
    console.log("CONNECTED TO " + `${this.#DOMAIN}:${this.#PORT}`);
    this.#CLIENT = this.#MQtt.connect(`${this.#DOMAIN}:${this.#PORT}`);
    this.#CLIENT.on("connect", () => {
      this.#CLIENT.subscribe(topic);

      console.log("SUBSCRIBED TO >>>> " + topic);
    });
  }
  _message(OnMsgCallback) {
    this.#CLIENT.on("message", (topic, message) => {
      OnMsgCallback(topic, message);
    });
  }
}

function MQTT_SUB(MQtt, port, domain) {
  return new MQTTclass(MQtt, port, domain);
}

export default MQTT_SUB;

/*
USE CASE EXAMPLE
import MQTT_PUB from "./path"


cont MQTTCONNECT = MQTT_SUB(mqtt, 3000,localhost);
     
     
     
    MQTTCONNECT.On("connect",
    {
      topic:"key1/key2/key3"
    }
    );

    MQTTCONNECT.On("message",(topic,message)=>{
      /redispush
    })



// MQTT subscriber
var mqtt = require("mqtt");
require("dotenv").config();

const Url = `${process.env.DOMAIN}:${process.env.PORT}`;
var client = mqtt.connect(Url);

var topic = "LINTANGtest123";

client.on("message", (topic, message) => {
  message = message.toString();
  console.log(message);
});

client.on("connect", () => {
  client.subscribe(topic);
});



*/
