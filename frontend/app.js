const API = "http://localhost:5000";

// LOAD MEMORIES
async function loadMemories() {

  const res = await fetch(`${API}/memories`);

  const memories = await res.json();

  const timeline = document.getElementById("timeline");

  timeline.innerHTML = "";

  memories.forEach(mem => {

    timeline.innerHTML += `
    
      <div class="card">

        <img src="${API}${mem.image}" />

        <h3>${mem.title}</h3>

        <p>${mem.description}</p>

      </div>

    `;
  });
}

// ADD MEMORY
async function addMemory() {

  const title =
    document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  const imageFile =
    document.getElementById("imageFile").files[0];

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", imageFile);

  await fetch(`${API}/memories`, {

    method: "POST",

    body: formData

  });

  loadMemories();
}

// BUTTON ACTION
function enterMuseum() {

  alert("Welcome to LifeFrame 🧠");
}

loadMemories();