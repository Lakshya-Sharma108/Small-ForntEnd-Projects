// ─── State ──────────────────────────────────────────
const STORAGE_KEY = 'fintrack_data';

let state = {
    transactions: [],
    balance: 0,
    totalIncome: 0,
    totalExpense: 0
};

// ─── Category Emoji Map ──────────────────────────────
const categoryEmoji = {
    salary: '💼',
    groceries: '🛒',
    entertainment: '🎬',
    utilities: '💡',
    transportation: '🚗',
    healthcare: '🏥',
    education: '📚',
    miscellaneous: '📦'
};

// ─── DOM References ──────────────────────────────────
const $id = id => document.getElementById(id);

const els = {
    totalBalance: $id('totalBalance'),
    totalIncome:  $id('totalIncome'),
    totalExpense: $id('totalExpense'),
    donutChart:   $id('donutChart'),
    donutLabel:   $id('donutLabel'),
    donutPct:     $id('donutPct'),
    legendIncome: $id('legendIncome'),
    legendExpense:$id('legendExpense'),
    txList:       $id('transactionList'),
    emptyState:   $id('emptyState'),
    historyCount: $id('historyCount'),
    addBtn:       $id('addBtn'),
    resetBtn:     $id('resetBtn'),
    toast:        $id('toast'),
    title:        $id('title'),
    amount:       $id('amount'),
    type:         $id('type'),
    category:     $id('category'),
    date:         $id('date'),
};

// ─── LocalStorage ────────────────────────────────────
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            state = { transactions: [], balance: 0, totalIncome: 0, totalExpense: 0 };
        }
    }
}

// ─── Toast ───────────────────────────────────────────
let toastTimer;
function showToast(msg, isError = false) {
    els.toast.textContent = msg;
    els.toast.style.borderColor = isError ? 'rgba(248,113,113,0.4)' : 'rgba(52,211,153,0.3)';
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2800);
}

// ─── UI Updates ──────────────────────────────────────
function formatCurrency(n) {
    return '₹' + Math.abs(n).toLocaleString('en-IN');
}

function updateSummary() {
    els.totalBalance.textContent  = formatCurrency(state.balance);
    els.totalIncome.textContent   = formatCurrency(state.totalIncome);
    els.totalExpense.textContent  = formatCurrency(state.totalExpense);
    els.legendIncome.textContent  = formatCurrency(state.totalIncome);
    els.legendExpense.textContent = formatCurrency(state.totalExpense);
}

function updateChart() {
    const total = state.totalIncome + state.totalExpense;

    if (total === 0) {
        els.donutChart.style.background = 'conic-gradient(#2a2d3a 0% 100%)';
        els.donutLabel.textContent = 'No Data';
        els.donutPct.textContent = '—';
        return;
    }

    const incPct = (state.totalIncome / total) * 100;
    const expPct = 100 - incPct;

    els.donutChart.style.background =
        `conic-gradient(#34d399 0% ${incPct}%, #f87171 ${incPct}% 100%)`;

    els.donutLabel.textContent = 'Saved';
    const saved = state.totalIncome > 0
        ? Math.max(0, Math.round((state.balance / state.totalIncome) * 100))
        : 0;
    els.donutPct.textContent = `${saved}%`;
}

function updateCount() {
    const n = state.transactions.length;
    els.historyCount.textContent = `${n} transaction${n !== 1 ? 's' : ''}`;
}

function renderTransactions() {
    // Remove all transaction items (keep emptyState in DOM)
    Array.from(els.txList.querySelectorAll('.tx-item')).forEach(el => el.remove());

    if (state.transactions.length === 0) {
        els.emptyState.style.display = 'block';
        return;
    }

    els.emptyState.style.display = 'none';

    // Render newest first
    [...state.transactions].reverse().forEach(tx => {
        els.txList.appendChild(createTxElement(tx));
    });
}

function createTxElement(tx) {
    const isIncome = tx.type === 'income';
    const div = document.createElement('div');
    div.className = 'tx-item';
    div.dataset.id = tx.id;

    div.innerHTML = `
        <div class="tx-icon ${isIncome ? 'income-icon' : 'expense-icon'}">
            ${categoryEmoji[tx.category] || '💳'}
        </div>
        <div class="tx-info">
            <div class="tx-title">${escapeHtml(tx.title)}</div>
            <div class="tx-meta">${tx.category} · ${formatDate(tx.date)}</div>
        </div>
        <div class="tx-amount ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? '+' : '-'}${formatCurrency(tx.amount)}
        </div>
        <button class="tx-delete" title="Delete transaction" data-id="${tx.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
        </button>
    `;

    return div;
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Add Transaction ─────────────────────────────────
els.addBtn.addEventListener('click', () => {
    const title    = els.title.value.trim();
    const amount   = parseFloat(els.amount.value);
    const type     = els.type.value;
    const category = els.category.value;
    const date     = els.date.value;

    // Validation
    if (!title) { showToast('⚠️ Please enter a transaction title.', true); els.title.focus(); return; }
    if (!amount || amount <= 0) { showToast('⚠️ Please enter a valid amount.', true); els.amount.focus(); return; }
    if (!date) { showToast('⚠️ Please select a date.', true); els.date.focus(); return; }

    if (type === 'expense' && amount > state.balance) {
        showToast('❌ Insufficient balance!', true);
        return;
    }

    const tx = {
        id: Date.now().toString(),
        title, amount, type, category, date
    };

    state.transactions.push(tx);

    if (type === 'income') {
        state.totalIncome += amount;
        state.balance += amount;
    } else {
        state.totalExpense += amount;
        state.balance -= amount;
    }

    saveState();
    updateSummary();
    updateChart();
    updateCount();
    renderTransactions();

    // Clear form
    els.title.value = '';
    els.amount.value = '';
    els.date.value = '';

    showToast(`✅ ${type === 'income' ? 'Income' : 'Expense'} added!`);
});

// ─── Delete Transaction ───────────────────────────────
els.txList.addEventListener('click', (e) => {
    const btn = e.target.closest('.tx-delete');
    if (!btn) return;

    const id = btn.dataset.id;
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;

    // Reverse the effect
    if (tx.type === 'income') {
        state.totalIncome -= tx.amount;
        state.balance -= tx.amount;
    } else {
        state.totalExpense -= tx.amount;
        state.balance += tx.amount;
    }

    state.transactions = state.transactions.filter(t => t.id !== id);

    // Animate removal
    const item = els.txList.querySelector(`[data-id="${id}"]`);
    if (item) {
        item.style.transition = 'opacity 0.25s, transform 0.25s';
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        setTimeout(() => item.remove(), 250);
    }

    saveState();
    updateSummary();
    updateChart();
    updateCount();

    if (state.transactions.length === 0) els.emptyState.style.display = 'block';

    showToast('🗑️ Transaction deleted.');
});

// ─── Reset ───────────────────────────────────────────
els.resetBtn.addEventListener('click', () => {
    if (!confirm('Reset all data? This cannot be undone.')) return;
    state = { transactions: [], balance: 0, totalIncome: 0, totalExpense: 0 };
    saveState();
    updateSummary();
    updateChart();
    updateCount();
    renderTransactions();
    showToast('🔄 All data has been reset.');
});

// ─── Set today's date as default ─────────────────────
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    els.date.value = today;
}

// ─── Init ────────────────────────────────────────────
function init() {
    loadState();
    updateSummary();
    updateChart();
    updateCount();
    renderTransactions();
    setDefaultDate();
}

init();