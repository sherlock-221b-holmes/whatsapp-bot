require("dotenv").config({ path: "./config/.env" });
var CronJob = require("cron").CronJob;
// Essential Middlewares

const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const { connectDB } = require("./config/db");
const CheerUp = require("./Models/CheerUp");

const GoodMorning = require("./Models/GoodMorning");
const GoodNight = require("./Models/GoodNight");
const Hug = require("./Models/Hug");

const client = new Client({
  authStrategy: new LocalAuth()
});

connectDB();

async function uploadData() {
  // upload Hug.json to MongoDB
  const CheerUp = require("./Models/CheerUp");
  const Messages = require("./CheerUp.json");
  console.log(Messages.message[0]);

  for (let i = 0; i < Messages.message.length; i++) {
    let morning = new CheerUp({
      text: Messages.message[i].name
    });

    await morning.save();
    console.log(`${i}`);
  }
}

const randomFixedInteger = function generateRandom(maxLimit) {
  let rand = Math.random() * maxLimit;

  rand = Math.floor(rand);

  return rand;
};

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
  client.getChats().then(async (allChats) => {
    const myChat = allChats.find((chat) => chat.name === "Lavish");
    console.log(myChat);
    // const response = await myChat.sendMessage('Hi, I am automated message');

    // console.log(response);
  });
});

client.on("message", async (message) => {
  try {
    const LoveYou = require("./Models/LoveYou");
    const MissYou = require("./Models/MissYou");
    const messageBody = message.body.toLowerCase();
    console.log(message._data.id.remote);
    console.log(`91${process.env.NUMBER}@c.us`);
    if (
      message._data.id.remote === `91${process.env.NUMBER}@c.us` ||
      message._data.id.remote === `91${process.env.DOOSRA_NUMBER}@c.us`
    ) {
      if (messageBody.includes("how are you")) {
        console.log(message);
        await client.sendMessage(message.from, "I'm Good. How 'bout you");
      } else if (
        messageBody.includes("how much do you love me") ||
        messageBody.includes("do you love me")
      ) {
        const loveyoumessages = await LoveYou.find({});
        const arr = loveyoumessages.filter(
          (message) => message.tag === "unused"
        );
        const arrLength = arr.length;
        const integer = randomFixedInteger(arrLength);
        const randomMessage = arr[integer - 1].text;
        await client.sendMessage(message.from, randomMessage);

        await LoveYou.findOneAndUpdate(
          { _id: loveyoumessages[integer - 1]._id },
          {
            $set: {
              tag: "used"
            }
          },
          { new: true }
        );
      } else if (
        messageBody.includes("how much do you miss me") ||
        messageBody.includes("do you miss me")
      ) {
        const missyoumessages = await MissYou.find({});
        // console.log(missyoumessages);
        console.log("reaching here");
        let arr = missyoumessages.filter((message) => message.tag === "unused");
        console.log(arr);
        if (arr.length === 0) {
          arr = missyoumessages;
          await MissYou.updateMany(
            { tag: "used" },
            { $set: { tag: "unused" } },
            { new: true }
          );
        }
        const arrLength = arr.length;
        const integer = randomFixedInteger(arrLength);
        const randomMessage = arr[integer - 1].text;
        await client.sendMessage(message.from, randomMessage);

        await MissYou.findOneAndUpdate(
          { _id: missyoumessages[integer - 1]._id },
          {
            $set: {
              tag: "used"
            }
          },
          { new: true }
        );
      } else if (
        messageBody.includes("do you need a hug") ||
        messageBody.includes("give me a hug") ||
        messageBody.includes("hug me")
      ) {
        const hugmessages = await Hug.find({});
        // console.log(missyoumessages);
        console.log("reaching here");
        let arr = hugmessages.filter((message) => message.tag === "unused");
        console.log(arr);
        if (arr.length === 0) {
          arr = hugmessages;
          await Hug.updateMany(
            { tag: "used" },
            { $set: { tag: "unused" } },
            { new: true }
          );
        }
        const arrLength = arr.length;
        const integer = randomFixedInteger(arrLength);
        const randomMessage = arr[integer - 1].text;
        await client.sendMessage(message.from, randomMessage);

        await Hug.findOneAndUpdate(
          { _id: hugmessages[integer - 1]._id },
          {
            $set: {
              tag: "used"
            }
          },
          { new: true }
        );
      } else if (
        messageBody.includes("cheer me up") ||
        messageBody.includes("am i special?")
      ) {
        const cheerupmessage = await CheerUp.find({});
        // console.log(missyoumessages);
        console.log("reaching here");
        let arr = cheerupmessage.filter((message) => message.tag === "unused");
        console.log(arr);
        if (arr.length === 0) {
          arr = missyoumessages;
          await CheerUp.updateMany(
            { tag: "used" },
            { $set: { tag: "unused" } },
            { new: true }
          );
        }
        const arrLength = arr.length;
        const integer = randomFixedInteger(arrLength);
        const randomMessage = arr[integer - 1].text;
        await client.sendMessage(message.from, randomMessage);

        await CheerUp.findOneAndUpdate(
          { _id: cheerupmessage[integer - 1]._id },
          {
            $set: {
              tag: "used"
            }
          },
          { new: true }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
});

client.on("authenticated", (session) => {
  console.log(session);
});

client.on("auth_failure", (d) => {
  console.log(d);
});

var goodMorningJob = new CronJob(
  "20 08 * * *",
  async function () {
    const goodmorningmessages = await GoodMorning.find({});
    let arr = goodmorningmessages.filter((message) => message.tag === "unused");
    if (arr.length === 0) {
      arr = goodmorningmessages;
      await GoodMorning.updateMany(
        { tag: "used" },
        { $set: { tag: "unused" } },
        { new: true }
      );
    }
    const arrLength = arr.length;
    const integer = randomFixedInteger(arrLength);
    const randomMessage = arr[integer - 1].text;
    await client.sendMessage(`91${process.env.NUMBER}@c.us`, randomMessage);
    await GoodMorning.findOneAndUpdate(
      { _id: goodmorningmessages[integer - 1]._id },
      { $set: { tag: "used" } },
      { new: true }
    );
  },
  null,
  true,
  "Asia/Kolkata"
);
uploadData();
client.initialize();
