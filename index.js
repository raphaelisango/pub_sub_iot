import RabbitMQClient from "./AMQP_SERVICE/amqpClass.js"; // IMPORT AMQP MODULE
import MQTT from "./MQTT_SERVICE/index.js"; // IMPORT MQTT MODULE

class PubSubFactory {
  createPubSub(type, ProtocolObj, port, domain) {
    switch (type) {
      case "amqp":
        return new RabbitMQClient(ProtocolObj, `amqp://${domain}:${port}`);
      case "mqtt":
        return MQTT(arguments[4], ProtocolObj, port, domain);
      default:
        throw new Error("Invalid protocol type.");
    }
  }
}

let PubSub = (() => {
  return new PubSubFactory();
})();

export default PubSub;

// Example usage:
/**  const PubSubFactory = new PubSubFactory();
  
  const MQTT = PubSubFactory.createPubSub("mqtt",mqttClient, "3456","localhost","sub");
  console.log(car.getInfo()); // Output: Car: Toyota Camry
  
  const bike = vehicleFactory.createVehicle("bike", "Giant");
  console.log(bike.getInfo()); // Output: Bike: Giant*/
