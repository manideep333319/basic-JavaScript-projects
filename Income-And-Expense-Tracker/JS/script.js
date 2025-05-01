//
const addBtnElement = document.getElementById("add-btn");
const historyListElement = document.getElementById("history-list");
const inputTextElement = document.getElementById("input-text");
const inputAmtElement = document.getElementById("input-amt");
const expAmtElement = document.getElementById("exp-amt");
const incAmtElement = document.getElementById("inc-amt");
const noTransactionMsgElement = document.getElementById("no-transaction-msg");

//
const updateValues = (transactions) => {
  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });
  const totalIncome = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0);
  const totalExpense =
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0) * -1;
  incAmtElement.innerText = `${totalIncome.toFixed(2)} Rs`;
  expAmtElement.innerText = `${totalExpense.toFixed(2)} Rs`;
};

//
const deleteTransaction = (transactionId) => {
  const transactions = JSON.parse(localStorage.getItem("TRANSACTIONS"));
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.id != transactionId;
  });
  localStorage.setItem("TRANSACTIONS", JSON.stringify(filteredTransactions));
  document.getElementById(`transaction-${transactionId}`).remove();
  if(!filteredTransactions.length)
  {
      noTransactionMsgElement.classList.remove("hide")
  }
  updateValues(filteredTransactions);
};

//
const showTransaction = (transaction) => {
  const transactionClass = transaction.amount < 0 ? "minus" : "plus";
  historyListElement.insertAdjacentHTML(
    "beforeend",
    `<li class="${transactionClass}" id="transaction-${transaction.id}">
        <span>${transaction.text}</span>
        <span>${transaction.amount} Rs</span>
        <button class="delete-btn">x</button>
        
    </li>`
  );
  const deleteButtonElement =
    historyListElement.lastElementChild.querySelector(".delete-btn");
  deleteButtonElement.addEventListener("click", () => {
    deleteTransaction(transaction.id);
  });
  inputAmtElement.value = "";
  inputTextElement.value = "";
};

//
const addTransaction = () => {
  const inputText = inputTextElement.value;
  const inputAmt = +(+inputAmtElement.value).toFixed(2);
  const id = new Date().getTime().toString();
  if (!inputText.trim() || inputAmt === 0) {
    alert("Please enter both valid transaction description and valid transaction amount");
  } else {
    const transaction = {
      id,
      text: inputText,
      amount: inputAmt,
    };
    const transactions = JSON.parse(localStorage.getItem("TRANSACTIONS")) || [];
    transactions.push(transaction);
    localStorage.setItem("TRANSACTIONS", JSON.stringify(transactions));
    showTransaction(transaction);
    updateValues(transactions);
    noTransactionMsgElement.classList.add("hide");
  }
};

//
addBtnElement.addEventListener("click", addTransaction);

//
window.addEventListener("DOMContentLoaded", () => {
  const transactions = JSON.parse(localStorage.getItem("TRANSACTIONS")) || [];
  if (transactions.length) {
    updateValues(transactions);
    transactions.forEach((transaction) => {
      showTransaction(transaction);
    });
  } else {
    noTransactionMsgElement.classList.remove("hide");
  }
});
