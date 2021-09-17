const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "/r";

require("dotenv").config();

client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("Connected!");
}

client.on("message", parseMessage);

function parseMessage(msg) {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const number = msg.content.slice(prefix.length);
  const diceNumber = parseInt(number);

  let result = [];
  if (!isNaN(diceNumber)) result = rollDice(diceNumber);

  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== 6) sum += result[i];
  }

  const message = "Total: " + sum + ". [" + result.toString() + "]";
  msg.channel.send(message);
}

function rollDice(diceNumber) {
  let diceRolls = [];
  for (let i = 0; i < diceNumber; i++) {
    let diceRoll = dice.roll();
    if (diceRoll === 6) {
      diceNumber += 2;
    }
    diceRolls[i] = diceRoll;
  }
  return diceRolls;
}

const dice = {
  sides: 6,
  roll: function () {
    let randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  },
};
