let balance = document.querySelector(".totalBalance h3");
let income = document.querySelector(".totalIncome h3");
let expense = document.querySelector(".totalExpense h3");


let transactionTitle = document.querySelector(".transactionTitle input");
let transactionAmount = document.querySelector(".transactionAmount input");
let category = document.querySelector(".category select").value;
let addTransactionBtn = document.querySelector(".addButton button");
let date = document.querySelector(".date input");

let totalIncome = 0;
let totalExpense = 0;
let totalBalance = 0;


addTransactionBtn.addEventListener("click", function () {
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
});
