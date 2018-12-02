var express = require("express");
var app = express();


let dealt = [];
let deck = [];
let deck2 = [];
let disCard = [];   
     
const suits = ["spades", "hearts", "clubs", "diamonds"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

//Initializ the deck    
function nDeck() {
    for (let suit in suits) {
        
        for ( let value in values){
            
            deck.push(`${values[value]} of ${suits[suit]}`);
            deck2.push(`${values[value]} of ${suits[suit]}`);
            } 
        }
  return deck;
   
    }

  
//Deal one card from the top of the deck and display hand   
function deal(){
       
       let card = deck.pop();
        dealt.push(card);
    
     return dealt;
    
    displayDiscard();
}

function displayDiscard(){
    return disCard;
}
//Discard the top card from the dealt pile - this needs to be redone to specify which card to discard
function dCard(){
    
    let rejectCard = dealt.pop();
    disCard.push(rejectCard);
    return rejectCard + ' discarded';
}

//Order all the remaining cards in the deck into the default order
//Leave cards in the discard pile where they are
function order(){
    let tmpArr = [...deck];
    
    deck = deck2.filter((card) => tmpArr.includes(card));
    
    return deck;
}

//Cut the deck - needs to be redone to specify the cut location
function cut() {
       
       var bottomDeck = deck.slice(0, Math.floor(deck.length / 2));
       var topDeck = deck.slice(Math.floor(deck.length / 2), deck.length);    
       var cutDeck = topDeck.concat(bottomDeck);
       
    deck = cutDeck;
    
    return deck;   
}


//Randomize all the cards remainingin the deck and that are in the discard pile
function shuffle () {
    let tmpDeck = deck.concat(disCard);   
      
        let m = deck.length, i;

        while (m){
               i = Math.floor(Math.random() * m--);

                [deck[m], deck[i]] = [deck[i], deck[m]];
               }
        disCard = [];
        tmpDeck - deck;
        return deck;
    } 

//Rebuild the deck - Puts the deck back into the default sort order with an empty discard pile 
function rebuildDeck(){
    deck = [];
    disCard = [];
    dealt = [];
    nDeck();
    return deck;
}




app.get("/url", (req, res, next) => {
    res.json('This is my API');
});

app.get("/new_deck", (req, res, next) => {
    res.json(nDeck());
});

app.get("/shuffle", (req, res, next) => {
    res.json(shuffle());
});

app.get("/deal", (req, res, next) => {
    res.json(deal());
});

app.get("/discard", (req, res, next) => {
    res.json(dCard());
});

app.get("/order", (req, res, next) => {
    res.json(order());
});

app.get("/cut_deck", (req, res, next) => {
    res.json(cut());
});

app.get("/rebuild", (req, res, next) => {
    res.json(rebuildDeck());
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
