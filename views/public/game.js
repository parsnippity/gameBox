    let turn = document.getElementById("turn");
    let color = document.getElementById("color");
    let board = document.getElementById("board");
    let message = document.getElementById("message");
    let newGame = document.getElementById("newGame");
    let quitGame = document.getElementById("quitGame");
    let playerName = document.getElementById("quietName").innerHTML;
    let guestName = sessionStorage.getItem("guestName");
    console.log(guestName);
    let quitTime = false;
    let final = false;
    let people = [playerName, guestName];
    let colors = ["Yellow", "Red"];
    let createNewGame = function() {
        quitGame.removeAttribute("href");
        quitTime = false;
        final = false;
        let whoseTurn = people[0];
        let whoseColor = colors[0];
        let won = false;
        message.innerHTML = "";
        turn.innerHTML = `${whoseTurn}'s Turn!`
        color.innerHTML = whoseColor;
        color.classList.remove("text" + colors[0], "text" + colors[1]);
        color.classList.add("text" + whoseColor);
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
            box.setAttribute("src", "https://res.cloudinary.com/daiu5iwi1/image/upload/v1697574888/empty_plteyy.png");
            board.appendChild(box);
        }
        for(let i = 0; i < 7; i++) {
            let thisColumn = document.querySelectorAll(`.column${i + 1}`);
            thisColumn.forEach((item) => {
                item.addEventListener("click", async function(e) {
                    message.innerHTML = "";
                    quitGame.removeAttribute("href");
                    quitTime = false;
                    if(won == false) {
                        let done = false;
                        let change = true;
                        for(let i = 0; i < thisColumn.length; i++) {
                            if((thisColumn[i].classList.contains("Red") || thisColumn[i].classList.contains("Yellow")) && i == 0) {
                                change = false;
                                done = true;
                                message.innerHTML = "You can't go there! Try again";
                            } else if((thisColumn[i].classList.contains("Red") || thisColumn[i].classList.contains("Yellow")) && i != 0 && !done){
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
                            //not like it should
                            let rightUpOne = takenArray.some((j) => (j.contains(`row${myRow - 1}`) && j.contains(`column${myColumn + 1}`)));
                            let leftUpOne = takenArray.some((j) => (j.contains(`row${myRow - 1}`) && j.contains(`column${myColumn - 1}`)));
                            let rightDownOne = takenArray.some((j) => (j.contains(`row${myRow + 1}`) && j.contains(`column${myColumn + 1}`)));
                            let leftDownOne = takenArray.some((j) => (j.contains(`row${myRow + 1}`) && j.contains(`column${myColumn - 1}`)));
                            let rightUpTwo = takenArray.some((j) => (j.contains(`row${myRow - 2}`) && j.contains(`column${myColumn + 2}`)));
                            let leftUpTwo = takenArray.some((j) => (j.contains(`row${myRow - 2}`) && j.contains(`column${myColumn - 2}`)));
                            let rightDownTwo = takenArray.some((j) => (j.contains(`row${myRow + 2}`) && j.contains(`column${myColumn + 2}`)));
                            let leftDownTwo = takenArray.some((j) => (j.contains(`row${myRow + 2}`) && j.contains(`column${myColumn - 2}`)));
                            let rightUpThree = takenArray.some((j) => (j.contains(`row${myRow - 3}`) && j.contains(`column${myColumn + 3}`)));
                            let leftUpThree = takenArray.some((j) => (j.contains(`row${myRow - 3}`) && j.contains(`column${myColumn - 3}`)));
                            let rightDownThree = takenArray.some((j) => (j.contains(`row${myRow + 3}`) && j.contains(`column${myColumn + 3}`)));
                            let leftDownThree = takenArray.some((j) => (j.contains(`row${myRow + 3}`) && j.contains(`column${myColumn - 3}`)));
                            switch (true) {
                                case (leftUpOne && leftUpTwo && leftUpThree):
                                    won = true;
                                    break;
                                case (rightUpOne && rightUpTwo && rightUpThree):
                                    won = true;
                                    break;
                                case (leftDownOne && leftDownTwo && leftDownThree):
                                    won = true;
                                    break;
                                case (rightDownOne && rightDownTwo && rightDownThree):
                                    won = true;
                                    break;
                                case (leftUpOne && leftUpTwo && rightDownOne):
                                    won = true;
                                    break;
                                case (leftUpOne && rightDownOne && rightDownTwo):
                                    won = true;
                                    break;
                                case (rightUpOne && rightUpTwo && leftDownOne):
                                    won = true;
                                    break;
                                case (rightUpOne && leftDownOne && leftDownTwo):
                                    won = true;
                                    break;
                                default:
                                    console.log("fail");
                                    break;
                            }
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
                            color.classList.remove("text" + colors[0], "text" + colors[1]);
                            color.classList.add("text" + whoseColor);
                        }
                    }
                    if(won && !final) {
                        final = true;
                        turn.innerHTML = `${whoseTurn} won!`;
                        await axios.get("/users/won", {});
                    }
                })
            })
        }
    }
createNewGame();
newGame.addEventListener("click", createNewGame);
quitGame.addEventListener("click", function(e) {
        if(quitTime) {
            location.assign("/")
            quitTime = false;
        } else {
            message.innerHTML = "Are you sure you want to quit to the home screen?";
            quitTime = true;
        }
})