const Poker = require("../poker");

const { VALUES_INDEX, SUITS_INDEX, STRAIGHTS_LIST, ROYAL_STRAIGHT } = Poker;

const STRATEGY_RULES = [
  { number: 0, rule: "Is Filler" },
  { number: 1, rule: "Hold Royal Flush, Straight Flush, 4 of a Kind" },
  { number: 2, rule: "Hold 4 to a Royal Flush" },
  { number: 3, rule: "Hold 3 of a Kind, Flush, Straight or Full House" },
  { number: 4, rule: "Hold 4 to a Straight Flush" },
  { number: 5, rule: "Hold 2 Pair" },
  { number: 6, rule: "Hold High Pair" },
  { number: 7, rule: "Hold 3 to a Royal Flush" },
  { number: 8, rule: "Hold 4 to a Flush" },
  { number: 9, rule: "Hold the Low Pair" },
  { number: 10, rule: "Hold 4 to an Outside Straight" },
  { number: 11, rule: "Hold 2 Suited High Cards" },
  { number: 12, rule: "Hold 3 to a Straight Flush" },
  {
    number: 13,
    rule: "Hold 2 Unsuited High Cards (lowest 2)",
  },
  { number: 14, rule: "Hold Suited 10/J, 10/Q, or 10/K" },
  { number: 15, rule: "Hold 1 High Card" },
  { number: 16, rule: "Hold Nothing" },
];

const ONLY_HIGH_CARDS = [
  VALUES_INDEX[10],
  VALUES_INDEX[11],
  VALUES_INDEX[12],
  VALUES_INDEX[0],
];

const HIGH_CARDS_ORDER = [
  VALUES_INDEX[1],
  VALUES_INDEX[2],
  VALUES_INDEX[3],
  VALUES_INDEX[4],
  VALUES_INDEX[5],
  VALUES_INDEX[6],
  VALUES_INDEX[7],
  VALUES_INDEX[8],
  VALUES_INDEX[9],
  VALUES_INDEX[10],
  VALUES_INDEX[11],
  VALUES_INDEX[12],
  VALUES_INDEX[0],
];

const OUTSIDE_STRAIGHTS = [
  [VALUES_INDEX[1], VALUES_INDEX[2], VALUES_INDEX[3], VALUES_INDEX[4]],
  [VALUES_INDEX[2], VALUES_INDEX[3], VALUES_INDEX[4], VALUES_INDEX[5]],
  [VALUES_INDEX[3], VALUES_INDEX[4], VALUES_INDEX[5], VALUES_INDEX[6]],
  [VALUES_INDEX[4], VALUES_INDEX[5], VALUES_INDEX[6], VALUES_INDEX[7]],
  [VALUES_INDEX[5], VALUES_INDEX[6], VALUES_INDEX[7], VALUES_INDEX[8]],
  [VALUES_INDEX[6], VALUES_INDEX[7], VALUES_INDEX[8], VALUES_INDEX[9]],
  [VALUES_INDEX[7], VALUES_INDEX[8], VALUES_INDEX[9], VALUES_INDEX[10]],
  [VALUES_INDEX[8], VALUES_INDEX[9], VALUES_INDEX[10], VALUES_INDEX[11]],
];

const ALL_STRAIGHTS = STRAIGHTS_LIST.concat([ROYAL_STRAIGHT]);

module.exports = {
  VALUES_INDEX,
  SUITS_INDEX,
  STRATEGY_RULES,
  ONLY_HIGH_CARDS,
  HIGH_CARDS_ORDER,
  OUTSIDE_STRAIGHTS,
  STRAIGHTS_LIST,
  ROYAL_STRAIGHT,
  ALL_STRAIGHTS,
};
