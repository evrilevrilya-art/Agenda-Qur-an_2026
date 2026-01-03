document.addEventListener("DOMContentLoaded", function() {
    const suratList = [
        "Al-Fatihah", "Al-Baqarah", "Al-‘Imran", "An-Nisa'", "Al-Ma’idah", 
        "Al-An’am", "Al-A’raf", "Al-Anfal", "At-Taubah", "Yunus"
    ];

    const agendaForm = document.getElementById("agendaForm");
    const totalSuratElem = document.getElementById("totalSurat");
    const belumSuratElem = document.getElementById("belumSurat");
    const targetInput = document.getElementById("target");

    let suratStatus = JSON.parse(localStorage.getItem('suratStatus')) || {};

    // Inisialisasi surat list
    function loadSuratList() {
        const suratContainer = document.querySelector(".surat-list");
        suratContainer.innerHTML = ''; // Clear existing list

        suratList.forEach((surat, index) => {
            const suratDiv = document.createElement('div');
            suratDiv.classList.add('surat-item');

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = "surat" + index;
            checkbox.checked = suratStatus[surat] || false;

            checkbox.addEventListener('change', function() {
                suratStatus[surat] = checkbox.checked;
                updateProgress();
                localStorage.setItem('suratStatus', JSON.stringify(suratStatus));
            });

            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.innerText = surat;

            suratDiv.appendChild(checkbox);
            suratDiv.appendChild(label);
            suratContainer.appendChild(suratDiv);
        });
    }

    // Update progress display
    function updateProgress() {
        const totalSurat = Object.values(suratStatus).filter(status => status === true).length;
        const belumSurat = suratList.length - totalSurat;

        totalSuratElem.textContent = totalSurat;
        belumSuratElem.textContent = belumSurat;
    }

    // Menyimpan target yang diinput oleh pengguna
    targetInput.addEventListener('input', function() {
        const target = parseInt(targetInput.value);
        if (isNaN(target) || target <= 0) return;

        alert(`Target hari ini: ${target} surat`);
    });

    // Initialize the list
    loadSuratList();
    updateProgress();
});
