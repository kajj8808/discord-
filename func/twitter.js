import axios from "axios";
import priconne from "./priconne";

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

const userObjects = {};
const tweets = {};

const twitterApi = axios.create({
  baseURL: "https://api.twitter.com/2/",
  headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
});

const getTwitterUserID = async (userName) => {
  if (userObjects[userName]) {
    return userObjects[userName].id;
  } else {
    try {
      const {
        data: { data },
      } = await twitterApi.get(
        `users/by?usernames=${userName}&user.fields=created_at&expansions=pinned_tweet_id&tweet.fields=author_id,created_at`
      );
      userObjects[userName] = data[0];
      return data[0].id;
    } catch {
      return null;
    }
  }
};

const getTimeLineList = async (userID) => {
  const {
    data: { data },
  } = await twitterApi.get(`users/${userID}/tweets`);
  return data;
};

export const getTweetDetail = async (tweetID) => {
  if (tweets[tweetID]) {
    return tweets[tweetID];
  } else {
    const {
      data: { data, includes },
    } = await twitterApi.get(
      `tweets?ids=${tweetID}&expansions=attachments.media_keys&media.fields=url`
    );
    tweets[tweetID] = { data: data[0], includes };
    return { data: data[0], includes };
  }
};


export const fourCutMangaWithTwitter = async (twitterUserName) => {
  const twitterUserID = await getTwitterUserID(twitterUserName);
  if (!twitterUserID) return null;
  const timeLineList = await getTimeLineList(twitterUserID);
  switch (twitterUserName) {
    case "priconne_kr":
      priconne(timeLineList);
  }
};
