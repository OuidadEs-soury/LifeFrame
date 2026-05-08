const API = "http://localhost:5000/memories";

// Load memories
async function loadMemories() {
  const res = await fetch(API);
  const data = await res.json();

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  data.forEach(mem => {
    timeline.innerHTML += `
      <div class="card">
        <img src="${mem.image}" />
        <h3>${mem.title}</h3>
        <p>${mem.description}</p>
      </div>
    `;
  });
}

// Add memory
async function addMemory() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, image })
  });

  loadMemories();
}

// fake intro action
function enterMuseum() {
  alert("Welcome to your memory museum 🧠");
}

loadMemories();