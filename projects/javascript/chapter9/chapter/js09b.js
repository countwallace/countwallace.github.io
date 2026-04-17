"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season 
      Author: 
      Date:   
      
      Filename: js09b.js
 */

//get text string from address bar
let qString = location.search.slice(1);
//replace + with space
qString = qString.replace(/\+/g, " ");
//replace all URI Encoding Characters
qString = decodeURIComponent(qString);

//split strung into field=name pairs in an array
let formData = qString.split(/&/g);

for(let items of formData){
      let fieldValuePair = items.split(/=/);
      let fieldName = fieldValuePair[0];
      let fieldValue = fieldValuePair[1];

      //make label for field name
      let fieldLabel = document.createElement("label");
      fieldLabel.textContent = fieldName;
      document.getElementById("contactInfo").appendChild(fieldLabel);

      //make input controls for field values
      let inputBox = document.createElement("input");
      inputBox.id = fieldName;
      inputBox.name = fieldName;
      inputBox.value = fieldValue;
      inputBox.disabled = true;
      document.getElementById("contactInfo").appendChild(inputBox);
}
//console.log(qString);

//store data to local storage afer user click "sign up"
document.getElementById("signupBtn").onclick = function(){
      //data field to save
      let formFields = document.querySelectorAll("#contactInfo input, input[type=radio], textarea");
      //add each field and value pair to local storage
      for(let fields of formFields){
            localStorage.setItem(fields.name, fields.value);
      }
      console.log(localStorage);
}