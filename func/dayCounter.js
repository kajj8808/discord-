import { MessageEmbed, WebhookClient } from "discord.js";
import userDatas from "../user_data.json";

const dayCounter = (targetDay) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const now = new Date();
  // +1 은 12시에 계산을 해서 하루 적게 나와서.
  return ((targetDay - now) / day + 1).toFixed(0);
};

const getRamdomColor = () => {
  const colors = [
    "#c7ecee",
    "#dff9fb",
    "#e056fd",
    "#ffbe76",
    "#30336b",
    "#badc58",
    "#ff7979",
    "#6ab04c",
  ];
  return colors[(Math.random() * (colors.length - 1)).toFixed(0)];
};

const makeMssageEmbed = (messageData) => {
  const { targetDay, iconURL, userName } = messageData;
  return new MessageEmbed()
    .setColor(getRamdomColor())
    .setAuthor({
      name: userName,
      iconURL,
    })
    .addFields(
      { name: "day", value: targetDay, inline: true },
      {
        name: "day_count",
        value: dayCounter(new Date(targetDay)),
        inline: true,
      }
    )
    .setTimestamp();
};

const sendMessage = () => {
  const DISCORD_ID = process.env.DISCORD_GENERAL_ID;
  const DISCORD_TOKEN = process.env.DISCORD_GENERAL_TOKEN;
  const webHookClinet = new WebhookClient({
    id: DISCORD_ID,
    token: DISCORD_TOKEN,
  });
  userDatas.forEach((messageObject) => {
    webHookClinet.send({ embeds: [makeMssageEmbed(messageObject)] });
  });
};

export default sendMessage;
