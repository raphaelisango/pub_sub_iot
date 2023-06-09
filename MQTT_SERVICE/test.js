import { createRequire } from "module";
const Requir = createRequire(import.meta.url);
import MQTT_PUB from "./pub.js";
import MQTT_SUB from "./sub.js";

var mqtt = Requir("mqtt");
Requir("dotenv").config();

const Url = `${process.env.DOMAIN}:${process.env.MQTT_SEVER_PORT}`;
console.log(Url);
const MQTTCONNECT = MQTT_PUB(
  mqtt,
  process.env.MQTT_SEVER_PORT,
  process.env.DOMAIN
);
//PUBLISHER
setInterval(() => {
  MQTTCONNECT.On("connect", {
    auth: {
      clientID: "key1",
      sessionID: "key2",
      publicID: "key3",
    },
    channel: "key1/key2/key3",
    data: {
      temperature: "300 °C",
      speed: "100 m/s",
      lenght: "4mm",
    },
    command: ["stop", "start", "pause"],
    status: {},
  });
}, "3000");

//SUBSCRIBER
const MQTTCONNECT2 = MQTT_SUB(
  mqtt,
  process.env.MQTT_SEVER_PORT,
  process.env.DOMAIN
);

MQTTCONNECT2.On("connect", {
  channel: "key1/key2/key3",
});

MQTTCONNECT2.On("message", {
  channel: "key1/key2/key3",
  OnMsgCallback: (topic, message) => {
    //redispush
    console.log("message");
    console.log("SUB-RECIEVED >>>> " + message);
  },
});
