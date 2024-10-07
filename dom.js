let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); // Fixed class name
let msg = document.querySelector("#msg");

let turn0 = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // Hide winner message
};

// Function to disable all boxes (after a win)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes and reset their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`; // Display winner message
    msgContainer.classList.remove("hide"); // Show the message container
};

// Function to check if there is a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner: " + pos1Val);
                showWinner(pos1Val);
                disableBoxes(); // Disable all boxes after the game ends
                break;
            }
        }
    }
};

// Event listener for box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Event listener for reset button
restbtn.addEventListener("click", resetGame);

// Event listener for new game button
newGameBtn.addEventListener("click", resetGame);
