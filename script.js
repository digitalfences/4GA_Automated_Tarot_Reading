/**
 * Automated Augury
 * By Galen Emanuel
 * 
 * This site will render Tarot cards and tell your fortune 
 * 
 */









/*
Tarot API
https://github.com/ekelen/tarot-api
By EKelen

Used here to power the augury part of my app


cards returns an array of all cards
example fetch
let card = res[0];
card.type == "major"
card.name == "the Magician"
card.value == "1";
card.value_int == 1;
card.meaning_up = meaning in the upright position
card.meaning_rev = meaning in the reversed position
card.desc = a description of the card, usually in great detail

*/
let url = "https://rws-cards-api.herokuapp.com/api/v1/cards";