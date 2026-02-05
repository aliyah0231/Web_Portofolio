document.addEventListener('DOMContentLoaded', () => {
    
    // --- POWER SWITCH LOGIC ---
    const powerSwitch = document.getElementById('main-power-switch');
    const body = document.body;
    
    // 1. Cek penyimpanan lokal (localStorage)
    // Jika belum pernah disimpan, default-nya adalah 'true' (Menyala/ON)
    const savedState = localStorage.getItem('systemPower');
    let isSystemOn = savedState === null ? true : (savedState === 'true');

    function toggleSystem(state) {
        if (state) {
            // System ON
            body.classList.remove('system-off');
            // Jalankan animasi terminal jika baru dinyalakan
            runTerminal();
        } else {
            // System OFF
            body.classList.add('system-off');
        }
    }

    // 2. Terapkan status saat halaman dimuat
    toggleSystem(isSystemOn);
    powerSwitch.checked = isSystemOn;

    // 3. Event Listener (Saat tombol diklik)
    powerSwitch.addEventListener('change', (e) => {
        isSystemOn = e.target.checked;
        toggleSystem(isSystemOn);
        
        // Simpan status ke memori browser
        localStorage.setItem('systemPower', isSystemOn);
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- TERMINAL TYPING EFFECT ---
    const terminalLines = document.querySelectorAll('.terminal-content span');
    
    function runTerminal() {
        // Hanya jalankan animasi jika sistem menyala
        if (!isSystemOn) return;

        let delay = 0;
        // Reset opacity dulu agar animasi ulang terlihat rapi
        terminalLines.forEach(line => line.style.opacity = '0');

        terminalLines.forEach(line => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, delay);
            delay += 400; // Kecepatan ketik (ms)
        });
    }

    // Jalankan terminal saat pertama kali load (jika ON)
    if (isSystemOn) {
        setTimeout(runTerminal, 500);
    }
});