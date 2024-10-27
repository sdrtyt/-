document.addEventListener('DOMContentLoaded', () => {
    const budgetItems = [];
    const expenses = [];

    const currencySelector = document.getElementById('currency');
    let currencySymbol = '₽'; // По умолчанию

    currencySelector.addEventListener('change', () => {
        const currencyValue = currencySelector.value;
        switch (currencyValue) {
            case 'USD': currencySymbol = '$'; break;
            case 'EUR': currencySymbol = '€'; break;
            case 'GBP': currencySymbol = '£'; break;
            case 'JPY': currencySymbol = '¥'; break;
            default: currencySymbol = '₽'; // Рубль
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
            budgetItems.push({ category, amount });
            const listItem = document.createElement('li');
            listItem.textContent = `${category} - ${amount} ${currencySymbol}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            removeBtn.onclick = () => {
                budgetItemsList.removeChild(listItem);
                budgetItems.splice(budgetItems.indexOf(item), 1);
                updateBudget();
            };
            listItem.appendChild(removeBtn);
            budgetItemsList.appendChild(listItem);
            budgetCategoryInput.value = '';
            budgetAmountInput.value = '';
            updateBudget();
        }
    }

    function addExpense() {
        const category = expenseCategoryInput.value;
        const amount = parseFloat(expenseAmountInput.value);
        if (category && !isNaN(amount)) {
            expenses.push({ category, amount });
            const listItem = document.createElement('li');
            listItem.textContent = `${category} - ${amount} ${currencySymbol}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            removeBtn.onclick = () => {
                expensesList.removeChild(listItem);
                expenses.splice(expenses.indexOf(expense), 1);
                updateExpenses();
            };
            listItem.appendChild(removeBtn);
            expensesList.appendChild(listItem);
            expenseCategoryInput.value = '';
            expenseAmountInput.value = '';
            updateExpenses();
        }
    }

    addBudgetBtn.addEventListener('click', addBudget);
    addExpenseBtn.addEventListener('click', addExpense);
});
