const amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1:5672", (err, connection) => {
  if (err) {
    throw err;
  }
  console.log("CONNECTED to amqp://127.0.0.1:5672");
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "technical";
    let message = "this is technocal baj9";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.sendToQueue(queueName, Buffer.from(message));
    setTimeout(() => {
      //connection.close();
    }, 1000);
  });
});
