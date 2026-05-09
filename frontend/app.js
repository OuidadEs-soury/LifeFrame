const API = "http://localhost:5000";


async function loadMemories() {

  const res =
    await fetch(`${API}/memories`);

  const memories =
    await res.json();

  const timeline =
    document.getElementById("timeline");

  timeline.innerHTML = "";

  memories.reverse().forEach(mem => {

    const date =
      new Date(mem.id).toLocaleDateString();

    timeline.innerHTML += `

      <div
        class="card"
        onclick='openModal(
          "${API}${mem.image}",
          "${mem.title}",
          "${mem.description}",
          "${date}"
        )'
      >

        <img src="${API}${mem.image}">

        <h3>${mem.title}</h3>

        <p>${mem.description}</p>

        <small>${date}</small>

      </div>

    `;
  });
}


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

  document.getElementById("title").value = "";

  document.getElementById("description").value = "";

  document.getElementById("imageFile").value = "";
}


function enterMuseum() {

  window.scrollTo({

    top: 500,

    behavior: "smooth"
  });
}


function openModal(
  image,
  title,
  description,
  date
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
    "modalDate"
  ).innerText = date;
}


function closeModal() {

  document.getElementById(
    "memoryModal"
  ).style.display = "none";
}


loadMemories();