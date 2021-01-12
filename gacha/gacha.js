class Card {
constructor(name, chance) {
    this.name = name;
    this.chance = chance;
}
}

let count = 0;
let cards = [
    new Card("1000 dollars from Donald Trump", 0.05),
    new Card("destroyed in chess", 0.05),
    new Card("a diploma from UMD", 0.15),
    new Card("a free meal from Quickway", 0.2),
    new Card("coronavirus", 0.01),
    new Card("a C on your last midterm", 0.1),
    new Card("a 0/10 on your last homework", 0.04),
    new Card("fired from your job", 0.05),
    new Card("another math problem you have no idea how to do", 0.15),
    new Card("another programming assignment you have no motivation for", 0.1),
    new Card("rejected from another internship", 0.10)
];

var rolls = [];

const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
buttons[i].addEventListener("click", roll);
}

function roll() {
    count++;
    let rng = Math.random();
    console.log(rng);
    let rollValue;
    let i = 0;
    while (rng >= cdf(i)) {
        i++;
    }
    rollValue = cards[i].name;
    rolls.push(cards[i]);
    document.getElementById("output").innerHTML = "You got " + rollValue + "!";
    updateRolls(cards[i]);
    document.getElementById("count").innerHTML = "Number of rolls: " + count;
}

function cdf(x) {
    let sum = 0;
    let i;
    for (i = 0; i <= x; i++) {
        sum += cards[i].chance;
    }
    return sum;
}

function updateRolls(card) {
var ul = document.getElementById("rolls");
var li = document.createElement("li");
li.appendChild(document.createTextNode(card.name));
ul.appendChild(li);
}