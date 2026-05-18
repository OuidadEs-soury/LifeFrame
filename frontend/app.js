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

  memories.reverse().forEach((mem, index) => {

    const side =
      index % 2 === 0
      ? "left"
      : "right";

    timeline.innerHTML += `

      <div
        class="card ${side}"

        onclick='openCinema(
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

  const formData =
    new FormData();

  formData.append(
    "title",
    title
  );

  formData.append(
    "description",
    description
  );

  formData.append(
    "location",
    location
  );

  formData.append(
    "image",
    imageFile
  );

  if (voiceFile) {

    formData.append(
      "voice",
      voiceFile
    );
  }

  await fetch(`${API}/memories`, {

    method: "POST",

    body: formData
  });

  loadMemories();
}

/* CINEMA MODE */

function openCinema(
  image,
  title,
  description,
  location,
  voice
) {

  const modal =
    document.getElementById(
      "cinemaModal"
    );

  modal.style.display = "flex";

  document.getElementById(
    "cinemaImage"
  ).src = image;

  document.getElementById(
    "cinemaTitle"
  ).innerText = title;

  document.getElementById(
    "cinemaDescription"
  ).innerText = description;

  document.getElementById(
    "cinemaLocation"
  ).innerText = `📍 ${location}`;

  const player =
    document.getElementById(
      "cinemaVoice"
    );

  if (voice) {

    player.src =
      `${API}${voice}`;

    player.style.display =
      "block";

    player.play();

  } else {

    player.style.display =
      "none";
  }
}

/* CLOSE */

function closeCinema() {

  document.getElementById(
    "cinemaModal"
  ).style.display = "none";

  document.getElementById(
    "cinemaVoice"
  ).pause();
}

/* SCROLL */

function scrollTimeline() {

  window.scrollTo({

    top: 900,

    behavior: "smooth"
  });
}

/* START */

loadMemories();