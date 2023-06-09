import MQTT_PUB from "./pub.js";
import MQTT_SUB from "./sub.js";

function MQTT(type, MQtt, port, domain) {
  switch (type) {
    case "Pub":
      return MQTT_PUB(MQtt, port, domain);

    case "Sub":
      return MQTT_SUB(MQtt, port, domain);

    default:
      console.error("invalid argument");
      break;
  }
}

export default MQTT;
