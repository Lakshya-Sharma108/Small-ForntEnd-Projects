let balance = document.querySelector(".totalBalance h3");
let income = document.querySelector(".totalIncome h3");
let expense = document.querySelector(".totalExpense h3");


let transactionTitle = document.querySelector(".transactionTitle input");
let transactionAmount = document.querySelector(".transactionAmount input");
let addTransactionBtn = document.querySelector(".addButton button");
let date = document.querySelector(".date input");

// let cardAmount = document.querySelector(".transactionDetails p");

let totalIncome = 0;
let totalExpense = 0;
let totalBalance = 3000;


expense.textContent = `₹${totalExpense}`;
income.textContent = `₹${totalIncome}`;
balance.textContent = `₹${totalBalance}`;

addTransactionBtn.addEventListener("click", function () {
    let type = document.querySelector("#type").value;
    let category = document.querySelector(".category select").value;

    let historyCard = document.createElement("div");
    historyCard.innerHTML = `<div class="transaction">
                <div class="transactionDetails">
                    <h4>${transactionTitle.value}</h4>
                    <p>₹${transactionAmount.value}</p>
                    <button>Delete</button>
                </div>
                <div class="transactionDate">
                    <p>${date.value}</p>
                </div>
            </div>`;

    document.querySelector(".TransactionHistory").append(historyCard);


    if (type == "expense") {
        console.log("hello ji");
        if (balance.textContent == "₹0" || parseInt(balance.textContent.slice(1)) <= parseInt(transactionAmount.value)) {
            alert("You don't have enough balance to add an expense!");
        } else {
            totalExpense += parseInt(transactionAmount.value);
            expense.textContent = `₹${totalExpense}`;
            totalBalance -= parseInt(transactionAmount.value);
            balance.textContent = `₹${totalBalance}`;
            historyCard.querySelector(".transactionDetails p").style.color = "red";
        }
    } else if (type == "income") {
        totalIncome += parseInt(transactionAmount.value);
        income.textContent = `₹${totalIncome}`;
        totalBalance += parseInt(transactionAmount.value);
        balance.textContent = `₹${totalBalance}`;
        historyCard.querySelector(".transactionDetails p").style.color = "green";
    }

    // Clear input fields after adding transaction
    transactionTitle.value = "";
    transactionAmount.value = "";
    date.value = "";
});

