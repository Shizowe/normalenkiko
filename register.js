async function registerName(name) {
    const { endpoints, headers } = API_CONFIG;

    try {
        // 1️⃣ Fetch existing names
        const response = await fetch(endpoints.latest, { headers });
        const data = await response.json();
        const list = data.record || [];

        // 2️⃣ Add the new name
        list.push({ name, time: new Date().toISOString() });

        // 3️⃣ Save the updated list
        await fetch(endpoints.update, {
            method: "PUT",
            headers,
            body: JSON.stringify(list),
        });

        alert("✅ Successfully registered!");
    } catch (error) {
        console.error("❌ Error saving:", error);
        alert("⚠️ Failed to save name!");
    }
}

// Function for admin.html — loads all names
async function loadNames() {
    const { endpoints, headers } = API_CONFIG;

    try {
        const res = await fetch(endpoints.latest, { headers });
        const data = await res.json();
        const list = data.record || [];

        const container = document.getElementById("namesList");
        container.innerHTML = "";

        list.forEach((entry, i) => {
            const li = document.createElement("li");
            li.textContent = `${i + 1}. ${entry.name} (${new Date(entry.time).toLocaleString()})`;
            container.appendChild(li);
        });
    } catch (error) {
        console.error("⚠️ Error loading data:", error);
    }
}

