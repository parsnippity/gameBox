let turn = document.getElementById("turn");
let color = document.getElementById("color");
let time = document.getElementById("time");
let board = document.getElementById("board");
let message = document.getElementById("message");
let newGame = document.getElementById("newGame");
let people = ["Bree", "Cocoa"];
let colors = ["yellow", "red"];
let createNewGame = function() {
    let whoseTurn = people[0];
    let whoseColor = colors[0];
    let won = false;
    turn.innerHTML = `${whoseTurn}'s Turn!`
    color.innerHTML = whoseColor;
    board.innerHTML = "";
    for(let i = 0; i < 42; i++) {
        let box = document.createElement("img");
        box.classList.add("box");
        let go = true;
        let column = (i + 1);
        if((column - 7) <= 0) {
            go = false;
        }
        while(go){
            column -= 7;
            if((column - 7) <= 0) {
                go = false;
            }
        }
        let row = Math.ceil((i + 1) / 7);
        box.classList.add(`row${row}`);
        box.classList.add(`column${column}`);
        box.setAttribute("src", "./empty.png");
        board.appendChild(box);
    }
    for(let i = 0; i < 7; i++) {
        let thisColumn = document.querySelectorAll(`.column${i + 1}`);
        thisColumn.forEach((item) => {
            item.addEventListener("click", function(e) {
                message.innerHTML = "";
                if(won == false) {
                    let done = false;
                    let change = true;
                    for(let i = 0; i < thisColumn.length; i++) {
                        if((thisColumn[i].classList.contains("red") || thisColumn[i].classList.contains("yellow")) && i == 0) {
                            change = false;
                            done = true;
                            message.innerHTML = "You can't go there! Try again";
                        } else if((thisColumn[i].classList.contains("red") || thisColumn[i].classList.contains("yellow")) && i != 0 && !done){
                            thisColumn[i - 1].classList.add(whoseColor);
                            done = true;
                            message.innerHTML = "";
                        } else if(i == thisColumn.length - 1 && !done) {
                            thisColumn[i].classList.add(whoseColor);
                            message.innerHTML = "";
                            done = true;
                        }
                    }
                    let taken = document.querySelectorAll(`.${whoseColor}`);
                    let takenArray = [];
                    taken.forEach((item) => {
                        takenArray.push(item.classList);
                    })
                    takenArray.forEach((item) => {
                        let sameColumn = takenArray.filter((j) => j.contains(item[2]));
                        sameColumn = sameColumn.map((j) => {
                            return Number(j[1].slice(3));
                        })
                        if(sameColumn.includes(Math.min(...sameColumn) + 1) && sameColumn.includes(Math.min(...sameColumn) + 2) && sameColumn.includes(Math.min(...sameColumn) + 3)){
                            won = true;
                        }
                        let sameRow = takenArray.filter((j) => j.contains(item[1]));
                        sameRow = sameRow.map((j) => {
                            return Number(j[2].slice(6));
                        })
                        if(sameRow.includes(Math.min(...sameRow) + 1) && sameRow.includes(Math.min(...sameRow) + 2) && sameRow.includes(Math.min(...sameRow) + 3)){
                            won = true;
                        }
                        let myRow = Number(item[1].slice(3));
                        let myColumn = Number(item[2].slice(6));
                        let test = takenArray.filter((j) => {
                            return ((j.contains(`row${myRow - 1}`) && j.contains(`column${myColumn - 1}`)) || (j.contains(`row${myRow + 1}`) && j.contains(`column${myColumn + 1}`)) || (j.contains(`row${myRow + 1}`) && j.contains(`column${myColumn - 1}`)) || (j.contains(`row${myRow - 1}`) && j.contains(`column${myColumn + 1}`)));
                        })
                        if(test) {
                            console.log(test);
                        }
                        //i think i need an array of choices or something like that
                        //a switch case would be nice
                        //switch (top right) case one more
                        //there can be one-three on the top right, one-three more on the bottom left, you can't pair the ones with the one or two
                        /*
                        0001
                        0010
                        0200
                        1000
                        
                        0001
                        0020
                        0100
                        1000
                        
                        0001
                        0010
                        0100
                        2000
                        
                        0002
                        0010
                        0100
                        1000
                        */

                        //diagonal is if they're growing or shrinking by the same number row- or column-wise
                        //or like one row up and one column down works too
                        //four directions it can go
                    })
                    if(change == true && !won){
                        if(people.indexOf(whoseTurn) == people.length - 1) {
                            whoseTurn = people[0];
                        } else {
                            whoseTurn = people[people.indexOf(whoseTurn) + 1];
                        }
                        if(colors.indexOf(whoseColor) == colors.length - 1) {
                            whoseColor = colors[0];
                        } else {
                            whoseColor = colors[colors.indexOf(whoseColor) + 1];
                        }
                        turn.innerHTML = `${whoseTurn}'s Turn!`
                        color.innerHTML = whoseColor;
                    }
                }
                if(won) {
                    turn.innerHTML = `${whoseTurn} won!`;
                }
            })
        })
    }
}
createNewGame();
newGame.addEventListener("click", createNewGame);