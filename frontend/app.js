const API = "http://localhost:5000";

/* LOAD MEMORIES */

async function loadMemories() {

  const res =
    await fetch(`${API}/memories`);

  const memories =
    await res.json();

  const timeline =
    document.getElementById("timeline");

  timeline.innerHTML = "";

  memories.reverse().forEach(mem => {

    timeline.innerHTML += `

      <div
        class="card"
        onclick='openModal(
          "${API}${mem.image}",
          "${mem.title}",
          "${mem.description}",
          "${mem.location}",
          "${mem.voice || ""}"
        )'
      >

        <img src="${API}${mem.image}">

        <div class="card-content">

          <h2>${mem.title}</h2>

          <p>${mem.description}</p>

          <small>
            📍 ${mem.location}
          </small>

        </div>

      </div>
    `;
  });
}

/* ADD MEMORY */

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
}

/* MODAL */

function openModal(
  image,
  title,
  description,
  location,
  voice
) {

  document.getElementById(
    "memoryModal"
  ).style.display = "block";

  document.getElementById(
    "modalImage"
  ).src = image;

  document.getElementById(
    "modalTitle"
  ).innerText = title;

  document.getElementById(
    "modalDescription"
  ).innerText = description;

  document.getElementById(
    "modalLocation"
  ).innerText = `📍 ${location}`;

  const player =
    document.getElementById(
      "modalVoice"
    );

  if (voice) {

    player.src = `${API}${voice}`;

    player.style.display = "block";

  } else {

    player.style.display = "none";
  }
}

/* CLOSE */

function closeModal() {

  document.getElementById(
    "memoryModal"
  ).style.display = "none";
}

/* SCROLL */

function scrollFeed() {

  window.scrollTo({

    top: 700,

    behavior: "smooth"
  });
}

/* START */

loadMemories();