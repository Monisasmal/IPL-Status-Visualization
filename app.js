async function fetchIPLData() {
    try {
        const response = await fetch("https://ipl-status-visualization.onrender.com/ipl-stats");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        
        // Filter valid player data
        const validPlayers = data.filter(player => player.fours && player.sixes);

        // Extract players, fours, and sixes
        const players = validPlayers.map(player => player.player);
        const fours = validPlayers.map(player => parseInt(player.fours, 10));
        const sixes = validPlayers.map(player => parseInt(player.sixes, 10));

        // Render Chart
        renderChart(players, fours, sixes);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function renderChart(players, fours, sixes) {
    const ctx = document.getElementById("iplChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: players,
            datasets: [
                {
                    label: "Fours",
                    data: fours,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                },
                {
                    label: "Sixes",
                    data: sixes,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Fetch and display data on page load
fetchIPLData();
