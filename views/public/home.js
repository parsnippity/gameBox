let playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", function(e) {
    sessionStorage.setItem("guestName", document.getElementById("guestName").value);
})

// let playerOne = document.getElementById("playerOne");
// let playerTwo = document.getElementById("playerTwo");
// let signedInOne = sessionStorage.getItem("signedInOne");
// let signedInTwo = sessionStorage.getItem("signedInTwo");
// let guestOne = false;
// let guestTwo = false;
// let insertGuest = function(addOn, div) {
//     let name = document.createElement("h2");
//     name.innerHTML = `Guest${addOn}`;
//     let button = document.createElement("button");
//     button.innerHTML = "Sign In";
//     button.addEventListener("click", signIn());
//     div.appendChild(name);
//     div.appendChild(button);
// }
// let signedOut = function(div, num) {
//     let name = document.createElement("h2");
//     name.innerHTML = `Player ${num}`;
//     let buttonOne = document.createElement("button");
//     buttonOne.innerHTML = "Sign In";
//     buttonOne.addEventListener("click", signIn);
//     let buttonTwo = document.createElement("button");
//     buttonTwo.innerHTML = "Play as Guest";
//     buttonTwo.addEventListener("click", guest);
//     div.appendChild(name);
//     div.appendChild(buttonOne);
//     div.appendChild(buttonTwo);
// }
// let signIn = function() {
//     console.log("sign in");
// }
// let guest = function() {
//     console.log("guest")
// }
// if(guestOne && guestTwo) {
//     insertGuest(" One", playerOne);
//     insertGuest(" Two", playerTwo);
// }
// if(!signedInOne && !guestOne){
//     signedOut(playerOne, "One");
// } else if(guestOne) {
//     insertGuest("", playerOne);
// } else {
//     insertPlayer(signedInOne);
// }
// if(!signedInTwo && !guestTwo){
//     signedOut(playerTwo, "Two");
// } else if(guestTwo) {
//     insertGuest("", playerTwo);
// } else {
//     insertPlayer(signedInTwo);
// }