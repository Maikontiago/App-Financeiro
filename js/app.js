const btnIn =  document.querySelector('.btnIn');
const tbody = document.querySelector('tbody');
const desc = document.querySelector('.desc');
const amount = document.querySelector('.amount');
const type = document.querySelector('.type');

const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const total = document.querySelector('.total');

let items;

btnIn.onclick = () => {
  if(desc.value === "" || amount.value === "" || type.value === "") {
    return alert('Preencha todos os campos');
  }
  items.push({
    desc: desc.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
  });

  setItensBD();

  loadItens();

  desc.value = "";
  amount.value = "";
};

function deleteItem (index) {
  items.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem (item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `<td>${item.desc}</td>
  <td>R$ ${item.amount}</td>
  <td class="columnType">${item.type === "Entrada"
    ? '<i class="bx bxs-chevron-up-circle"></i>'
    : '<i class="bx bxs-chevron-down-circle"></i>'
  }</td>
  <td class="columnAction">
    <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
  </td>`;

  tbody.appendChild(tr);
}

function loadItens () {
  items = getItensBD();
  tbody.innerHTML = "";
  items.forEach((item,index) => {
    insertItem(item, index);
  });

  getTotals ();
}

function getTotals () {
  const amountIncomes = items
  .filter((item) => item.type === "Entrada")
  .map((transaction) => Number(transaction.amount));

  const amountExpenses = items
  .filter((item) => item.type === "Saida")
  .map((transaction) => Number(transaction.amount));

  const toalIncomes = amountIncomes
  .reduce((acc,cur) => acc + cur, 0)
  .toFixed(2);

  const totalExpenses = Math.abs(amountExpenses.reduce((acc, cur) => acc + cur, 0))
  .toFixed(2);

  const totalItems = (toalIncomes - totalExpenses).toFixed(2);

  incomes.innerHTML = toalIncomes;
  expenses.innerHTML = totalExpenses;
  total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () => localStorage.setItem("db_items", JSON.stringify(items));

loadItens();


