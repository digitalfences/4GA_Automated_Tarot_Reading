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
card.name_short == "ar01"
card.value == "1";
card.value_int == 1;
card.meaning_up = meaning in the upright position
card.meaning_rev = meaning in the reversed position
card.desc = a description of the card, usually in great detail

*/
let url = "https://rws-cards-api.herokuapp.com/api/v1/";
/*
The structural html pieces we need to access
*/
let querent = document.querySelector(".querent");
let situation = document.querySelector(".situation");
let foundation = document.querySelector(".foundation");
let past = document.querySelector(".past");
let shortTerm = document.querySelector(".short-term");
let presentProblem = document.querySelector(".present-problem");
let outsideInfluence = document.querySelector(".outside-influence");
let insideInfluence = document.querySelector(".internal-influence");
let hopesAndFears = document.querySelector(".hopes-and-fears");
let longTermOutcome = document.querySelector(".long-term-outcome");

/*
The internal data structures I will use to store the information on the cards
*/


async function getCardData(i){
    let url = "https://rws-cards-api.herokuapp.com/api/v1/";
    const response = await fetch(url)
    const res = await response.json();
    const cards = res.cards;
    let card = new TarotCard(cards[i].name,cards[i].meaning_up, cards[i].meaning_rev, cards[i].desc, cards[i].name_short);
    return card;
}

class TarotCard{
    constructor(name, meaningUp, meaningDown,desc,imgPath){
        this.name = name;
        this.meaningUp = meaningUp;
        this.meaningDown = meaningDown;
        this.desc = desc;
        this.imgPath = "./img/"+imgPath+".jpg";
    }
}

class TarotDeck{
    constructor(){
        this.deck =[];
        this.makeDeck();
        console.log(this.deck);
    }
    /* The Fisher Yates shuffle algorithm as explained here
    https://www.frankmitchell.org/2015/01/fisher-yates/ */
    shuffleDeck(){
        let temp = null;
        let j = 0;
        for(let i = this.deck.length -1; i > 0; i-=1){
            j = Math.floor(Math.random()*(i + 1));
            temp = this.deck[i];
            this.deck[i]= this.deck[j];
            this.deck[j] = temp;
        
        }
    }
    makeDeck(){
        for(let i = 0; i < 78; i++){
            this.deck.push(getCardData(i));
        }
    }
}

myDeck = new TarotDeck();