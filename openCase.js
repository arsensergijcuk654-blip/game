function openCase(cost, minP, tier, color) {
    if(score < cost) return alert("НЕДОСТАТНЬО DNA!");
    score -= cost;
    
    // Шанс на особливу мутацію (15% для Ultra, 5% для інших)
    const specialChance = tier === 'Ultra' ? 0.15 : 0.05;
    let specialEffect = null;
    let name = tier + " Gen";
    let finalPower = minP + Math.floor(Math.random() * (lvl * 5));

    if(Math.random() < specialChance) {
        const effects = ["CRIT", "SPEED", "MULTI"];
        specialEffect = effects[Math.floor(Math.random() * effects.length)];
        name = "🧬 " + specialEffect + " Mutation";
        finalPower *= 2; // Спеціальні мутації вдвічі сильніші
    }
    
    const newItem = { n: name, p: finalPower, c: color, effect: specialEffect };
    inventory.push(newItem);
    
    // Візуальний ефект випадіння
    playSfx(440, 'sawtooth', 0.6);
    alert(`ОТРИМАНО: ${name} (Сила: +${finalPower})`);
    updateUI();
}