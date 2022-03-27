import schedule from "node-schedule";
import dayCounterSendMessage from "./dayCounter";

// 0시 0분 0초 에 실행.
schedule.scheduleJob("0 0 0 * * *", () => {
  dayCounterSendMessage();
});
