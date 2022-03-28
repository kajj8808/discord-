import schedule from "node-schedule";
import dayCounterSendMessage from "./func/dayCounter";
import { fourCutMangaWithTwitter } from "./func/twitter";

// 0시 0분 0초 에 실행.
schedule.scheduleJob("0 0 0 * * *", () => {
  dayCounterSendMessage();
});


schedule.scheduleJob("* 0 8-15 * * *", async () => {
  await fourCutMangaWithTwitter("priconne_kr");
});


