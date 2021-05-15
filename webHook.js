const discord = require("discord.js");
const schedule = require("node-schedule");
const dateFormat = require("dateformat");
const { id, token } = require("./config");
const userData = require("./data");

const hook = new discord.WebhookClient(id, token);

const ran_color = () => {
  const colors = [
    "#C4E538",
    "#FDA7DF",
    "#12CBC4",
    "#006266",
    "#EE5A24",
    "#9980FA",
    "#5758BB",
    "#1B1464",
    "#F79F1F",
    "#FFC312",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ran_emoji = () => {
  const emogis = ["🔶", "🔷"];
  return emogis[Math.floor(Math.random() * emogis.length)];
};

const get_military = (general_discharge) => {
  const now = new Date();
  const count_date = Math.floor((general_discharge.getTime() - now.getTime()) / 86400000);
  return count_date;
};

const msgForm = (name, general_discharge) => {
  return new discord.MessageEmbed()
    .setTitle(`${ran_emoji()} 전역날 계산기 오전 0시마다 갱신! ${ran_emoji()}`)
    .setColor(ran_color())
    .addField(`day`, dateFormat(general_discharge, "yyyy-mm-dd "), true)
    .addField(`day-count`, `-${get_military(general_discharge)}`, true)
    .setTimestamp();
};

const sendDiscord = (name, date, profile_image) => {
  hook.send({
    username: name,
    avatarURL: profile_image,
    embeds: [msgForm(name, date)],
  });
};

schedule.scheduleJob("0 0 0 * * *", () => {
  userData.map((data) => {
    const day = data.day.split(" ");
    sendDiscord(data.name, new Date(day[0], day[1], day[2], 0, 0, 0), data.profile);
  });
});
