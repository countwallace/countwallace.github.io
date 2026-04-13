"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author: Kelvin Wallace
      Date: 4/7/2026

      Filename: js08.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   // Reference buttons and images within the Poker Game page
   let dealButton = document.getElementById("dealB");
   let drawButton = document.getElementById("drawB");
   let standButton = document.getElementById("standB");
   let resetButton = document.getElementById("resetB");
   let statusBox = document.getElementById("status");
   let betSelection = document.getElementById("bet");
   let bankBox = document.getElementById("bank");
   let cardImages = document.querySelectorAll("img.cardImg");
   //set initial values
   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;
   //create and shuffle deck of cards
   let myDeck = new pokerDeck();
   myDeck.shuffle();

   //create empty poker hand
   let myHand = new pokerHand(5);

   //display current bank
   bankBox.value = pokerGame.currentBank;

   //change bet
   betSelection.onchange = function(){
      pokerGame.currentBet = parseInt(this.value);
   }
   
   dealButton.addEventListener("click", function() {
   if (pokerGame.currentBank >= pokerGame.currentBet) {
      // Enable the Draw and Stand buttons after the initial deal
      dealButton.disabled = true;        // Turn off the Deal button
      betSelection.disabled = true;      // Turn off the Bet Selection list
      drawButton.disabled = false;       // Turn on the Draw button
      standButton.disabled = false;      // Turn on the Stand Button
      statusBox.textContent = "";        // Erase any status messages
      //reduce bank by the bet amount
      bankBox.value = pokerGame.placeBet();
      //if deck has less than 10 cards, get a new deck
      if(myDeck.cards.length < 10){
         myDeck = new pokerDeck();
         myDeck.shuffle();
      }
      //deal with 5 cards
      myDeck.dealTo(myHand);
      //console.log(myDeck, myHand);
      //display cards on table
      for(let i = 0; i < cardImages.length; i++){
         cardImages[i].src = myHand.cards[i].cardImage();
         //flip card when clicked
         cardImages[i].onclick = function(){
            if (this.src.includes("cardback.png")){
               this.src = myHand.cards[i].cardImage();
            }
            else{
               this.src = "cardback.png";
            }
         }
      }
   }
   else{
      statusBox.textContent = "Insufficient Funds";
   }
});
   
   
   drawButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to draw new cards
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button
      
      //replace cards that are turned over
      for(let i = 0; i < cardImages.length; i++){
         if(cardImages[i].src.includes("cardback.png")){
            myHand.replaceCard(i, myDeck);
            cardImages[i].src = myHand.cards[i].cardImage();
         }
      }
      //evaluate the player's hand
      statusBox.textContent = myHand.getHandValue();
      //update bank
      bankBox.value = pokerGame.payBet(statusBox.textContent);
   });
   
    
   standButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to stand with their hand 
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button  

      //evaluate the player's hand
      statusBox.textContent = myHand.getHandValue();
      //update bank
      bankBox.value = pokerGame.payBet(statusBox.textContent);
      
   });
   
   
   // Reload the current page when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      location.reload();
   });
}