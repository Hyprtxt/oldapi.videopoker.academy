"use strict";
// import Deck from './deck'
const Deck = require("./deck");

const getHandSuitsValuesSorted = (input_cards) => {
  let hand_values;
  hand_values = [];
  const hand_suits = input_cards.map(function (card, i) {
    hand_values.push(card.split("")[1]);
    return card.split("")[0];
  });
  hand_values.sort((a, b) => VALUES_INDEX.indexOf(a) - VALUES_INDEX.indexOf(b));
  return {
    hand_suits,
    hand_values,
  };
};

const VALUES_INDEX = Deck.values,
  SUITS_INDEX = Deck.suits,
  STRAIGHTS_LIST = [
    VALUES_INDEX.slice(0, 5),
    VALUES_INDEX.slice(1, 6),
    VALUES_INDEX.slice(2, 7),
    VALUES_INDEX.slice(3, 8),
    VALUES_INDEX.slice(4, 9),
    VALUES_INDEX.slice(5, 10),
    VALUES_INDEX.slice(6, 11),
    VALUES_INDEX.slice(7, 12),
    VALUES_INDEX.slice(8, 13),
  ],
  ROYAL_STRAIGHT = [VALUES_INDEX[0], ...VALUES_INDEX.slice(9, 13)],
  Score = (hand_cards = [], bet = 5) => {
    const { hand_suits, hand_values } = getHandSuitsValuesSorted(hand_cards);
    let royal, straight, flush, pair1, pair2, triple, quad, jacksorbetter;
    // bet = bet || 5
    // console.log(hand_suits, hand_values)
    royal = false;
    straight = false;
    flush = false;
    pair1 = false;
    pair2 = false;
    triple = false;
    quad = false;
    jacksorbetter = false;
    if (JSON.stringify(hand_values) === JSON.stringify(ROYAL_STRAIGHT))
      royal = true;
    STRAIGHTS_LIST.forEach((v, i) => {
      if (JSON.stringify(hand_values) === JSON.stringify(v)) straight = true;
    });
    // Values Count
    VALUES_INDEX.forEach((v, i) => {
      let count;
      count = 0;
      hand_values.forEach((val, idx) => {
        if (val === v) count++;
      });
      if (count === 2) {
        if (i >= 10 || i === 0) jacksorbetter = true;
        if (pair1 === true) pair2 = true;
        else pair1 = true;
      }
      if (count === 3) triple = true;
      if (count === 4) quad = true;
    });
    // Suits Count
    SUITS_INDEX.forEach((v, i) => {
      let count;
      count = 0;
      hand_suits.forEach((val, idx) => {
        if (val === v) count++;
      });
      if (count === 5) flush = true;
    });
    // Scoring
    if (royal && flush) {
      return {
        status: "royalflush",
        win: bet * 800,
      };
    } else if (straight && flush) {
      return {
        status: "straightflush",
        win: bet * 50,
      };
    } else if (quad) {
      return {
        status: "4kind",
        win: bet * 25,
      };
    } else if (triple && pair1) {
      return {
        status: "fullhouse",
        win: bet * 9,
      };
    } else if (flush) {
      return {
        status: "flush",
        win: bet * 6,
      };
    } else if (straight || royal) {
      return {
        status: "straight",
        win: bet * 4,
      };
    } else if (triple) {
      return {
        status: "3kind",
        win: bet * 3,
      };
    } else if (pair1 && pair2) {
      return {
        status: "2pair",
        win: bet * 2,
      };
    } else if (jacksorbetter) {
      return {
        status: "jacksbetter",
        win: bet * 1,
      };
    } else if (pair1) {
      return {
        status: "lowpair",
        win: 0,
      };
    }
    return {
      status: "ulose",
      win: 0,
    };
  };

// console.log(VALUES_INDEX, STRAIGHTS_LIST, ROYAL_STRAIGHT)
module.exports = {
  Score,
  VALUES_INDEX,
  SUITS_INDEX,
  STRAIGHTS_LIST,
  ROYAL_STRAIGHT,
};
