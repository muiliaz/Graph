
const endpoint = 'https://dpg.gg/test/calendar.json';

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        createGraph(data);
    })
    .catch(err => {
        console.error("Ошибка загрузки данных: ", err);
    });

    function createGraph(data) {
        const contributionGraph = document.getElementById('contribution-graph');
        const today = new Date();
    
        for (let col = 50; col >= 0; col--) { // обратный отсчет дней
            for (let row = 0; row < 7; row++) {
                let i = col * 7 + row;
                const cellDate = new Date(today - i * 24 * 60 * 60 * 1000);
                const formattedDate = cellDate.toISOString().slice(0, 10);
                const contributions = data[formattedDate] || 0;
    
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.title = `${formattedDate}: ${contributions} contributions`;
    
                if (contributions === 0) cell.classList.add('level-0');
                else if (contributions < 5) cell.classList.add('level-1');
                else if (contributions < 10) cell.classList.add('level-2');
                else if (contributions < 20) cell.classList.add('level-3');
                else cell.classList.add('level-4');
    
                contributionGraph.appendChild(cell);
            }
        }
    }
