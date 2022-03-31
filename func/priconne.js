import { MessageEmbed, WebhookClient } from "discord.js";
import { getTweetDetail } from "./twitter";
const priconneFourCutMangaFilter = async (timeLineList) => {
  return timeLineList.filter((timeLine) =>
    timeLine.text.includes("#4컷만화")
  )[0];
};

const getTwitterOriginalImage = (imageURL) =>
  `${imageURL}?format=jpg&name=orig`;
  
const makePriconneMessageEmbed = (messageObj) => {
  const { data, includes } = messageObj;
  const photoImage = includes.media.filter((media) => media.type === "photo")[0]
    .url;
  const title = data.text.split("\n")[0].split("#4컷만화 ")[1];
  const id = data.id;
  return new MessageEmbed()
    .setTitle(title)
    .setColor("#82ccdd")
    .setURL(`https://twitter.com/priconne_kr/status/${id}`)
    .setImage(getTwitterOriginalImage(photoImage))
    .setTimestamp();
};

const priconneSendMessage = (messageObj) => {
  const DISCORD_ID = process.env.DISCORD_PRICONE_ID;
  const DISCORD_TOKEN = process.env.DISCORD_PRICONE_TOKEN;
  const webHookClinet = new WebhookClient({
    id: DISCORD_ID,
    token: DISCORD_TOKEN,
  });
  webHookClinet.send({
    username: "pricone fourcut bot",
    avatarURL:
      "https://pbs.twimg.com/profile_banners/765105291633405954/1614670859/1500x500",
    embeds: [makePriconneMessageEmbed(messageObj)],
  });
};

let sendedMangaID = "";
const priconne = async (timeLineList) => {
  const priconneFourCutManga = await priconneFourCutMangaFilter(timeLineList);
  if (!priconneFourCutManga || sendedMangaID === priconneFourCutManga.id)
    return null;
  sendedMangaID = priconneFourCutManga.id;
  const tweetDetail = await getTweetDetail(priconneFourCutManga.id);
  priconneSendMessage(tweetDetail);
};

export default priconne;
