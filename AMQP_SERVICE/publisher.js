import { createRequire } from "module";

const require = createRequire(import.meta.url);
import RabbitMQClient from "./amqpClass.js";

// Create a new instance of RabbitMQClient
const client = new RabbitMQClient("amqp://localhost:5672");

// Example function to send and receive messages
async function sendMessage() {
  try {
    // Connect to RabbitMQ
    await client.connect();

    // Create a channel
    await client.createChannel();

    const queue = "hello";
    const message = "Hello, RabbitMQ!";

    // Assert the queue
    await client.assertQueue(queue, { durable: false }).then((data) => {
      console.log("hey dude" + data);
    });

    // Send a message to the queue
    await client.sendToQueue(queue, message).then((data) => {
      console.log("hey dude" + data);
    });

    console.log(` Sent '${message}'`);

    // Consume messages from the queue
    await client.consume(
      queue,
      (message) => {
        console.log(`[x] Received '${message.content.toString()}'`);
      },
      { noAck: true }
    );

    // Close the connection
    await client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the sendMessage function
sendMessage();

//serverinit.publish("hey my freind how are you??");

/*
amqp.connect("amqp://127.0.0.1:5672", (err, connection) => {
  if (err) {
    throw err;
  }
  console.log("swe");
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "technical";
    let message = "this is technocal baj9";
    channel.assertQueue(queueName, {
      durable: false,
    });
    setInterval(() => {
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log("Message sent!", message);
    }, 5000);
    setTimeout(() => {
      //connection.close();
    }, 1000);
  });
});*/
