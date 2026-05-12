const API = "http://localhost:5000";

async function loadMemories() {

  const res = await fetch(`${API}/memories`);

  const memories = await res.json();

  const timeline = document.getElementById("timeline");

  timeline.innerHTML = "";

  memories.reverse().forEach(mem => {

    const date = new Date(mem.id)
      .toLocaleDateString();

    timeline.innerHTML += `

      <div
        class="card"
        onclick='openModal(
          "${API}${mem.image}",
          "${mem.title}",
          "${mem.description}",
          "${date}",
          "${mem.location}",
          "${mem.voice || ""}"
        )'
      >

        <img src="${API}${mem.image}">

        <div class="card-content">

          <h3>${mem.title}</h3>

          <p>${mem.description}</p>

          <small>📍 ${mem.location}</small>

          <div class="actions">

            <button class="like-btn">
              ❤️ ${mem.likes || 0}
            </button>

            <small>${date}</small>

          </div>

        </div>

      </div>
    `;
  });
}

async function addMemory() {

  const title =
    document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  const location =
    document.getElementById("location").value;

  const imageFile =
    document.getElementById("imageFile").files[0];

  const voiceFile =
    document.getElementById("voiceFile").files[0];

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  formData.append("image", imageFile);

  if (voiceFile) {
    formData.append("voice", voiceFile);
  }

  await fetch(`${API}/memories`, {

    method: "POST",

    body: formData
  });

  loadMemories();

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("location").value = "";
  document.getElementById("imageFile").value = "";
  document.getElementById("voiceFile").value = "";
}

function openModal(
  image,
  title,
  description,
  date,
  location,
  voice
) {

  document.getElementById("memoryModal")
    .style.display = "block";

  document.getElementById("modalImage")
    .src = image;

  document.getElementById("modalTitle")
    .innerText = title;

  document.getElementById("modalDescription")
    .innerText = description;

  document.getElementById("modalDate")
    .innerText = date;

  document.getElementById("modalLocation")
    .innerText = `📍 ${location}`;

  const voicePlayer =
    document.getElementById("modalVoice");

  if (voice) {

    voicePlayer.style.display = "block";

    voicePlayer.src = `${API}${voice}`;

  } else {

    voicePlayer.style.display = "none";
  }
}

function closeModal() {

  document.getElementById("memoryModal")
    .style.display = "none";
}

function enterMuseum() {

  window.scrollTo({

    top: 500,

    behavior: "smooth"
  });
}

function toggleMusic() {

  const music =
    document.getElementById("bgMusic");

  if (music.paused) {

    music.play();

  } else {

    music.pause();
  }
}

loadMemories();