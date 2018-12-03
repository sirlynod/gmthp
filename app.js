var express = require("express");
var app = express();
var prompt = require('prompt');



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
 
}

//Specifies a dealt card to discard and sends to the discard pile
function dCard(choice){
    
    let decide = choice;
    
    let rejectCard = dealt.splice((decide-1), 1);
    disCard.push(rejectCard);
    
    return disCard;
    
}

//Order all the remaining cards in the deck into the default order
//Leave cards in the discard pile where they are
function order(){
    let tmpArr = [...deck];
    
    deck = deck2.filter((card) => tmpArr.includes(card));
    
    return deck;
}
   

//Cut the deck - Specifies a location where to split the deck of cards into two and puts the bottom half on top of the top half
function cut(card) {
    
       let cutPoint = card;
       var bottomDeck = deck.slice(0, cutPoint);
       var topDeck = deck.slice(cutPoint);    
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
        tmpDeck = deck;
        return deck;
    } 

//Rebuild the deck - Puts the deck back into the default sort order with an empty discard pile 
function rebuildDeck(){
    deck = [];
    disCard = [];
    dealt = [];
    cutCard = [];
    nDeck();
    return deck;
}




app.get("/url", (req, res, next) => {
    res.json(nDeck());
});


app.get("/shuffle", (req, res, next) => {
    res.json(shuffle());
});

app.get("/deal", (req, res, next) => {
    res.json(deal());
});

app.get("/discard/:choice", (req, res, next) => {
    const choice = req.params.choice
    res.json(dCard(choice));

});

app.get("/order", (req, res, next) => {
    res.json(order());
});

app.get("/cut/:card", (req, res, next) => {
    const card = req.params.card;
    res.json(cut(card));
});

app.get("/rebuild", (req, res, next) => {
    res.json(rebuildDeck());
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
