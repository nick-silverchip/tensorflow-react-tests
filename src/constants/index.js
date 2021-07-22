import commentTrainingNone from "./comments/comment-training-none";
import commentTrainingBuy from "./comments/comment-training-buy";

const comments = {
  none: commentTrainingNone.map((text) => {
    return { text, intent: "none" };
  }),
  buy: commentTrainingBuy.map((text) => {
    return { text, intent: "buy" };
  }),
};
const commentsTraining = [...comments.buy, ...comments.none];

export default commentsTraining;
