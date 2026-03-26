"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-03

      Project to create a New Year's Eve countdown clock
      Author: Kelvin Wallace
      Date: 3/25/2026

      Filename:script2.js
*/

let currentTime = document.getElementById("currentTime");
let daysLeftBox = document.getElementById("days");
let hrsLeftBox = document.getElementById("hours");
let minsLeftBox = document.getElementById("minutes");
let secsLeftBox = document.getElementById("seconds");

setInterval(countdown, 1000);
    
function countdown(){
    let now = new Date();
    now.toLocaleString(currentTime);
    let grad = new Date("May 7, 2026");

    let daysLeft = (grad - now) / (1000*60*60*24);
    let hrsLeft = (daysLeft - Math.floor(daysLeft)) * 24;
    let minsLeft = (hrsLeft - Math.floor(hrsLeft)) * 60;
    let secsLeft = (minsLeft - Math.floor(minsLeft)) * 60;

    currentTime.textContent = now;
    daysLeftBox.textContent = Math.floor(daysLeft);
    hrsLeftBox.textContent = Math.floor(hrsLeft);
    minsLeftBox.textContent = Math.floor(minsLeft);
    secsLeftBox.textContent = Math.floor(secsLeft);
}