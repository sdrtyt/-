document.addEventListener('DOMContentLoaded', () => {
    const budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let currencySymbol = '₽';

    const currencySelector = document.getElementById('currency');
    currencySelector.addEventListener('change', () => {
        const currencyValue = currencySelector.value;
        currencySymbol = currencyValue === 'USD' ? '$' :
                         currencyValue === 'EUR' ? '€' :
                         currencyValue === 'GBP' ? '£' :
                         currencyValue === 'JPY' ? '¥' : '₽';
        updateDisplay();
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

    function updateDisplay() {
        const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
        totalBudgetEl.textContent = `Итоговый бюджет: ${totalBudget} ${currencySymbol}`;
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpensesEl.textContent = `Итоговые расходы: ${totalExpenses} ${currencySymbol}`;
        remainingBudgetEl.textContent = `Остаток бюджета: ${totalBudget - totalExpenses} ${currencySymbol}`;
        renderLists();
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function renderLists() {
        budgetItemsList.innerHTML = '';
        expensesList.innerHTML = '';
        budgetItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.category}: ${item.amount} ${currencySymbol}`;
            budgetItemsList.appendChild(li);
        });
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.category}: ${expense.amount} ${currencySymbol}`;
            expensesList.appendChild(li);
        });
    }

    addBudgetBtn.addEventListener('click', () => {
        const category = budgetCategoryInput.value;
        const amount = parseFloat(budgetAmountInput.value);
        if (category && !isNaN(amount)) {
            budgetItems.push({ category, amount });
            budgetCategoryInput.value = '';
            budgetAmountInput.value = '';
            updateDisplay();
        }
    });

    addExpenseBtn.addEventListener('click', () => {
        const category = expenseCategoryInput.value;
        const amount = parseFloat(expenseAmountInput.value);
        if (category && !isNaN(amount)) {
            expenses.push({ category, amount });
            expenseCategoryInput.value = '';
            expenseAmountInput.value = '';
            updateDisplay();
        }
    });

    document.getElementById('generateReportBtn').addEventListener('click', () => {
        const reportContent = document.getElementById('reportContent');
        reportContent.classList.toggle('visible');
        reportContent.innerHTML = `<p>Отчет по бюджету: ${JSON.stringify(budgetItems, null, 2)}</p>
                                   <p>Отчет по расходам: ${JSON.stringify(expenses, null, 2)}</p>`;
    });

    updateDisplay();
});
