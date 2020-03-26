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
let url = "https://rws-cards-api.herokuapp.com/api/v1/cards";

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
let fatedCardArray = document.querySelectorAll(".card");
let readingButton = document.querySelector("#start");
let results = document.querySelector('.results');



/*
The internal data structures I will use to store the information on the cards
*/




class TarotCard{
    constructor(name, meaningUp, meaningDown,desc,imgPath){
        this.name = name;
        this.meaningUp = meaningUp;
        this.meaningDown = meaningDown;
        this.desc = desc;
        this.imgPath = "img/"+imgPath+".jpg";
        this.orientation = Math.floor(Math.random()*2);
    }
}
//return new TarotCard(cards[i].name,cards[i].meaning_up, cards[i].meaning_rev, cards[i].desc, cards[i].name_short);

class TarotDeck{
    constructor(){
        this.deck =[];
        this.fatedCards =[];
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
    async makeDeck(){
        let card;
        let cards;
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            cards = res.cards;
            for(let i = 0; i < cards.length; i++){
                card = new TarotCard(cards[i].name,cards[i].meaning_up, cards[i].meaning_rev, cards[i].desc, cards[i].name_short);
                this.deck.push(card);
            }
        })
        .then(res => {
            this.fatedCards.push(...this.augury());
        })
        
        
    }
    /*
    A celtic cross takes 10 cards
    */
    augury(){
        let deal = [];
        this.shuffleDeck();
        for (let i =0; i < 10; i++){
            deal.push(this.deck.pop());
        }
        return deal;
    }

}
let myDeck = new TarotDeck();
myDeck.makeDeck();
console.log(myDeck.fatedCards);
readingButton.addEventListener('click', start);
/* 
<h1>Your Results</h1>: 
<h2>The Querent: </h2>
<p>This card represents you. It's possible meanings ${orientation} are: </p>
<h2>The Situation: </h2>
<p>This card represents the situation itself. It's possible meanings ${orientation} are: </p>
<h2>The Foundation: </h2>
<p>This card represents the context around you. It's possible meanings ${orientation} are:</p>
<h2>The Past: </h2>
<p>This card represents the events that have occurred recently. It's possible meanings ${orientation} are:</p>
<h2>The Short Term Outlook: </h2>
<p>This card represents what will soon unfold. It's possible meanings ${orientation} are:</p>
<h2>The Present Problem: <h2>
<p>This card represents the difficulties you face. It's possible meanings ${orientation} are:</p>
<h2>Outside Influence: </h2>
<p>This card represents the influence of outside forces. It's possible meanings ${orientation} are:</p>
<h2>Internal Influence: </h2>
<p>This card represents the influence of your own thinking. It's possible meanings ${orientation} are:</p>
<h2>Hopes And Fears: </h2>
<p>This card represents your hopes and fears for the situation. It's possible meanings ${orientation} are:</p>
<h2>The Long Term Outlook: </h2>
<p>This card represents the long arc the situation will take. It's possible meanings ${orientation} are:</p>

*/


function start(){
    let results = "";
    for (let i = 0; i < myDeck.fatedCards.length;i++){
        let currentCard = myDeck.fatedCards[i]
        let cardIcon = fatedCardArray[i]
        if(currentCard.orientation == 0){
            cardIcon.style.transform = "rotate(180deg)";
        }
        else{
            cardIcon.style.transform = "rotate(0deg)";
        }
        cardIcon.setAttribute('src',currentCard.imgPath);
    }
    results = "";
    
    
    
    
    

}

