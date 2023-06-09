import { createRequire } from "module";

const require = createRequire(import.meta.url);

//const amqp = require("amqplib/callback_api");

export default class RabbitMQClient {
  constructor(amqp, url) {
    this.amqp = amqp;
    this.url = url;
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.amqp.connect(this.url, (error, connection) => {
        if (error) {
          reject(error);
        } else {
          console.log("connect");

          this.connection = connection;
          resolve();
        }
      });
    });
  }

  async createChannel() {
    return new Promise((resolve, reject) => {
      this.connection.createChannel((error, channel) => {
        if (error) {
          reject(error);
        } else {
          console.log("create channel");
          this.channel = channel;
          resolve();
        }
      });
    });
  }

  async assertQueue(queue, options) {
    this.channel.assertQueue(queue, options, (error) => {
      if (error) {
        return error;
      } else {
        console.log("asserted");
      }
    });
  }

  async sendToQueue(queue, message) {
    // console.log(this.channel);
    this.channel.sendToQueue(queue, Buffer.from(message), (error) => {
      if (error) {
        console.log("serror");

        return error;
      } else {
        console.log("send to quee");
      }
    });
  }

  async consume(queue, onMessage, options) {
    return new Promise((resolve, reject) => {
      this.channel.consume(queue, onMessage, options, (error, message) => {
        if (error) {
          reject(error);
        } else {
          console.log("consume channel");

          resolve(message);
        }
      });
    });
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }

    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}

// Example usage

/**
 (async () => {
  const client = new RabbitMQClient("amqp://localhost");

  try {
    await client.connect();
    await client.createChannel();

    const queue = "hello";
    const message = "Hello, RabbitMQ!";

    await client.assertQueue(queue, { durable: false });
    await client.sendToQueue(queue, message);

    console.log(`[x] Sent '${message}'`);

    await client.consume(
      queue,
      (message) => {
        console.log(`[x] Received '${message.content.toString()}'`);
      },
      { noAck: true }
    );

    // Close the connection when done
    await client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
 */
