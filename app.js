document.getElementById('app').innerHTML = `
  <div class="card">
    <h1>Money Tracker App</h1>
    <div>
      <div>Your Bank Balance: $<span id="bank-balance">500</span></div>
      <div>
        <input type="text" id="new-friend" placeholder="Add a friend">
        <button onclick="addFriend()">Add Friend</button>
      </div>
      <div>
        <select id="friend-list"></select>
        <input type="number" id="amount" placeholder="Amount">
        <button onclick="lendMoney()">Lend</button>
        <button onclick="borrowMoney()">Borrow</button>
      </div>
      <div>
        <input type="number" id="income-amount" placeholder="Income Amount">
        <button onclick="addIncome()">Add Income</button>
      </div>
      <div id="friends-list"></div>
    </div>
  </div>
  <div class="card">
    <h2>Money Lent/Borrowed</h2>
    <div id="lent-borrowed"></div>
    <div>Total Lent: $<span id="total-lent">0</span></div>
    <div>Total Borrowed: $<span id="total-borrowed">0</span></div>
  </div>
`;

let bankBalance = 500;
let friends = [];

function addFriend() {
  const newFriend = document.getElementById('new-friend').value.trim();
  if (newFriend !== '') {
    friends.push({ name: newFriend, balance: 0 });
    document.getElementById('new-friend').value = '';
    updateFriendsList();
  }
}

function updateFriendsList() {
  const friendList = document.getElementById('friend-list');
  friendList.innerHTML = '<option value="">Select a friend</option>';
  friends.forEach(friend => {
    const option = document.createElement('option');
    option.value = friend.name;
    option.textContent = friend.name;
    friendList.appendChild(option);
  });
  updateLentBorrowedList();
}

function updateFriendBalance(action) {
  const selectedFriend = document.getElementById('friend-list').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (selectedFriend && !isNaN(amount)) {
    friends = friends.map(friend => 
      friend.name === selectedFriend
        ? { ...friend, balance: friend.balance + (action === 'lend' ? amount : -amount) }
        : friend
    );
    bankBalance += action === 'lend' ? -amount : amount;
    document.getElementById('bank-balance').textContent = bankBalance.toFixed(2);
    document.getElementById('amount').value = '';
    updateLentBorrowedList();
  }
}

function lendMoney() {
  updateFriendBalance('lend');
}

function borrowMoney() {
  updateFriendBalance('borrow');
}

function addIncome() {
  const incomeAmount = parseFloat(document.getElementById('income-amount').value);
  if (!isNaN(incomeAmount)) {
    bankBalance += incomeAmount;
    document.getElementById('bank-balance').textContent = bankBalance.toFixed(2);
    document.getElementById('income-amount').value = '';
  }
}

function updateLentBorrowedList() {
  const lentBorrowedList = document.getElementById('lent-borrowed');
  lentBorrowedList.innerHTML = '';
  let totalLent = 0;
  let totalBorrowed = 0;
  friends.forEach(friend => {
    const div = document.createElement('div');
    div.textContent = `${friend.name}: $${Math.abs(friend.balance).toFixed(2)} ${friend.balance > 0 ? '(Lent)' : '(Borrowed)'}`;
    lentBorrowedList.appendChild(div);
    if (friend.balance > 0) {
      totalLent += friend.balance;
    } else {
      totalBorrowed -= friend.balance;
    }
  });
  document.getElementById('total-lent').textContent = totalLent.toFixed(2);
  document.getElementById('total-borrowed').textContent = totalBorrowed.toFixed(2);
}

updateFriendsList();
