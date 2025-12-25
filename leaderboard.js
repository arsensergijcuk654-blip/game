function updateUI() {
    let accs = JSON.parse(localStorage.getItem('mutant_accounts') || '{}');
    
    // Перетворюємо об'єкт в масив та сортуємо за очками (від більшого до меншого)
    let sorted = Object.entries(accs)
        .map(([name, data]) => ({ name, score: data.score }))
        .sort((a, b) => b.score - a.score);

    const leaderList = document.getElementById('leader-list');
    leaderList.innerHTML = ''; // Очищуємо список

    // Виводимо ТОП-10 гравців
    sorted.slice(0, 10).forEach((player, index) => {
        const isMe = player.name === currentUser;
        const row = document.createElement('div');
        
        // Стилізація рядка
        row.style.padding = '3px 0';
        row.style.borderBottom = '1px solid rgba(0, 242, 254, 0.1)';
        if (isMe) row.style.color = 'var(--g)'; // Виділяємо себе зеленим

        // Додаємо іконку для топ-3
        let medal = '';
        if (index === 0) medal = '🥇 ';
        else if (index === 1) medal = '🥈 ';
        else if (index === 2) medal = '🥉 ';
        else medal = `${index + 1}. `;

        row.innerHTML = `
            <span style="float: left;">${medal}${player.name}</span>
            <span style="float: right; color: var(--y); font-weight: bold;">${player.score.toLocaleString()}</span>
            <div style="clear: both;"></div>
        `;
        leaderList.appendChild(row);
    });

    // Оновлення списку друзів та пошуку (залишаємо твою логіку)
    renderFriends(accs);
}

// Окрема функція для друзів, щоб код був чистішим
function renderFriends(accs) {
    document.getElementById('friends-list').innerHTML = friends.map(n => `
        <div class="item-row">
            <span onclick="openChat('${n}')" style="cursor:pointer">💬 ${n}</span>
            <span class="del-btn" onclick="deleteFriend('${n}')">❌</span>
        </div>`).join('');

    document.getElementById('users-to-add').innerHTML = Object.keys(accs)
        .filter(n => n !== currentUser && !friends.includes(n))
        .map(n => `
            <div class="item-row">
                <span>${n}</span>
                <button onclick="addFriend('${n}')" style="background:var(--p); border:none; border-radius:4px; font-size:10px; cursor:pointer; padding: 2px 5px;">+ ДРУГ</button>
            </div>`).join('');
}

// Додамо функцію додавання друга для надійності
function addFriend(name) {
    if (!friends.includes(name)) {
        friends.push(name);
        saveData();
        updateUI();
        playSfx(400, 'sine', 0.2);
    }
}