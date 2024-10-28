document.addEventListener('DOMContentLoaded', () => {
    let budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const currencySelector = document.getElementById('currency');
    let currencySymbol = '₽'; // Default currency

    currencySelector.addEventListener('change', () => {
        const currencyValue = currencySelector.value;
        switch (currencyValue) {
            case 'USD': currencySymbol = '$'; break;
            case 'EUR': currencySymbol = '€'; break;
            case 'GBP': currencySymbol = '£'; break;
            case 'JPY': currencySymbol = '¥'; break;
            default: currencySymbol = '₽';
        }
        updateBudget();
        updateExpenses();
    });

    const budgetCategoryInput = document.getElementById('budgetCategory');
    const budgetAmountInput = document.getElementById('budgetAmount');
    const addBudgetBtn = document.getElementById('addBudgetBtn');
    const budgetItemsList = document.getElementById('budgetItemsList');
    const totalBudgetEl = document.getElementById('totalBudget');

    const expenseCategoryInput = document.getElementById('expenseCategory');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const expensesList = document.getElementById('expensesList');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const remainingBudgetEl = document.getElementById('remainingBudget');

    function updateBudget() {
        const totalBudget = budgetItems.reduce((total, item) => total + item.amount, 0);
        totalBudgetEl.textContent = `Итоговый бюджет: ${totalBudget} ${currencySymbol}`;
        updateRemainingBudget();
    }

    function updateExpenses() {
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        totalExpensesEl.textContent = `Итоговые расходы: ${totalExpenses} ${currencySymbol}`;
        updateRemainingBudget();
    }

    function updateRemainingBudget() {
        const totalBudget = budgetItems.reduce((total, item) => total + item.amount, 0);
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        const remainingBudget = totalBudget - totalExpenses;
        remainingBudgetEl.textContent = `Остаток бюджета: ${remainingBudget} ${currencySymbol}`;
    }

    function addBudget() {
        const category = budgetCategoryInput.value;
        const amount = parseFloat(budgetAmountInput.value);
        if (category && !isNaN(amount)) {
            const item = { category, amount };
            budgetItems.push(item);
            saveDataToLocalStorage();
            renderBudgetItem(item);
            budgetCategoryInput.value = '';
            budgetAmountInput.value = '';
            updateBudget();
        }
    }

    function addExpense() {
        const category = expenseCategoryInput.value;
        const amount = parseFloat(expenseAmountInput.value);
        if (category && !isNaN(amount)) {
            const expense = { category, amount };
            expenses.push(expense);
            saveDataToLocalStorage();
            renderExpenseItem(expense);
            expenseCategoryInput.value = '';
            expenseAmountInput.value = '';
            updateExpenses();
        }
    }

    function renderBudgetItem(item) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.category} - ${item.amount} ${currencySymbol}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Удалить';
        removeBtn.onclick = () => {
            budgetItemsList.removeChild(listItem);
            budgetItems = budgetItems.filter(i => i !== item);
            saveDataToLocalStorage();
            updateBudget();
        };
        listItem.appendChild(removeBtn);
        budgetItemsList.appendChild(listItem);
    }

    function renderExpenseItem(expense) {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.category} - ${expense.amount} ${currencySymbol}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Удалить';
        removeBtn.onclick = () => {
            expensesList.removeChild(listItem);
            expenses = expenses.filter(e => e !== expense);
            saveDataToLocalStorage();
            updateExpenses();
        };
        listItem.appendChild(removeBtn);
        expensesList.appendChild(listItem);
    }

    function saveDataToLocalStorage() {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadDataFromLocalStorage() {
        budgetItems.forEach(renderBudgetItem);
        expenses.forEach(renderExpenseItem);
        updateBudget();
        updateExpenses();
    }

    function createReport() {
        const report = {
            budgetItems,
            expenses,
            totalBudget: budgetItems.reduce((total, item) => total + item.amount, 0),
            totalExpenses: expenses.reduce((total, expense) => total + expense.amount, 0),
            remainingBudget: budgetItems.reduce((total, item) => total + item.amount, 0) - expenses.reduce((total, expense) => total + expense.amount, 0)
        };
        alert(`Отчет:\nБюджет: ${report.totalBudget} ${currencySymbol}\nРасходы: ${report.totalExpenses} ${currencySymbol}\nОстаток: ${report.remainingBudget} ${currencySymbol}`);
    }

    addBudgetBtn.addEventListener('click', addBudget);
    addExpenseBtn.addEventListener('click', addExpense);
    document.getElementById('createReportBtn').addEventListener('click', createReport);

    loadDataFromLocalStorage();
});
