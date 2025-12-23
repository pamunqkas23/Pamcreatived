fetch("stats.csv")
.then(response => response.text())
.then(csv => {
    const rows = csv.trim().split("\n");
    const tbody = document.querySelector("#dataTable tbody");

    const headers = ["Name","Impressions","Clicks","CTR","CPM","Revenue"];

    rows.forEach((row, index) => {
        const cols = row.split(",");

        // Baris UPDATE
        if (cols[0] === "UPDATE") {
            document.getElementById("updateTime").innerText =
                "Update: " + cols[1];
            return;
        }

        // Skip header CSV
        if (index === 1) return;

        const tr = document.createElement("tr");

        cols.forEach((col, colIndex) => {
            const td = document.createElement("td");

            // Kolom Name
            if (colIndex === 0) {
                const parts = col.split(" - ");
                td.textContent = parts.length >= 2 ? parts[1] : col;
            } else {
                td.textContent = col;
            }

            // tambahkan data-label untuk mobile card
            td.setAttribute("data-label", headers[colIndex]);

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
});

// SEARCH DATA
document.getElementById("searchInput").addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    document.querySelectorAll("#dataTable tbody tr").forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(filter)
            ? "" : "none";
    });
});
