/* FECHA DE INICIO
   Los meses empiezan en 0:
   enero = 0, diciembre = 11.

   Se utiliza medianoche en la zona horaria del dispositivo.
*/
const startDate = new Date(2022, 11, 31, 0, 0, 0);

/* CAMBIAR ENTRE PÁGINAS */
const pageNames = {
  nosotros: "NOSOTROS",
  carta: "MI CARTA",
  razones: "TE ELIJO",
  futuro: "ALGÚN DÍA",
  musica: "OUR PLAYLIST"
};

const tabs = [...document.querySelectorAll("[data-page]")];
const pages = [...document.querySelectorAll(".spread")];

function showPage(pageId) {
  if (!Object.prototype.hasOwnProperty.call(pageNames, pageId)) {
    return;
  }

  pages.forEach((page) => {
    page.hidden = page.id !== pageId;
  });

  tabs.forEach((button) => {
    if (button.dataset.page === pageId) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  const number = Object.keys(pageNames).indexOf(pageId) + 1;

  document.getElementById("chapter").textContent =
    `CAPÍTULO 0${number} / ${pageNames[pageId]}`;
}

tabs.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

/* BOTÓN QUE ABRE LA CARTA */
document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.open;

    showPage(pageId);

    const heading = document.querySelector(`#${pageId} h2`);

    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });

    document.querySelector(".book").scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

/* MENSAJES DETRÁS DE LOS CORAZONES */
document.querySelectorAll(".reason").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

/* CONTADOR */
function updateCounter() {
  const elapsed = Math.max(
    0,
    Math.floor((Date.now() - startDate.getTime()) / 1000)
  );

  const values = {
    days: Math.floor(elapsed / 86400),
    hours: Math.floor(elapsed / 3600) % 24,
    minutes: Math.floor(elapsed / 60) % 60,
    seconds: elapsed % 60
  };

  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent =
      id === "days"
        ? value.toLocaleString("es")
        : String(value).padStart(2, "0");
  });
}

updateCounter();
setInterval(updateCounter, 1000);

/* LLUVIA SUAVE DE CORAZONES
   Solo se crean 18 elementos.
   CSS los reutiliza continuamente sin acumular corazones.
*/
const heartsContainer = document.getElementById("hearts");

for (let i = 0; i < 18; i++) {
  const heart = document.createElement("span");

  heart.className = "falling-heart";
  heart.textContent = i % 3 === 0 ? "♡" : "♥";

  heart.style.left = `${i * 5.5 + Math.random() * 3}%`;
  heart.style.fontSize = `${20 + Math.random() * 14}px`;

  heart.style.animationDuration = `${16 + Math.random() * 13}s`;
  heart.style.animationDelay = `${-Math.random() * 30}s`;

  heartsContainer.appendChild(heart);
}

/* PAUSAR O REANUDAR CORAZONES */
const motionButton = document.getElementById("motion");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

motionButton.addEventListener("click", () => {
  const paused = document.body.classList.toggle("paused");

  motionButton.setAttribute("aria-pressed", String(paused));

  motionButton.textContent = paused
    ? "Activar corazones"
    : "Pausar corazones";
});

function syncMotionPreference() {
  motionButton.hidden = reducedMotion.matches;
}

syncMotionPreference();
reducedMotion.addEventListener("change", syncMotionPreference);

/* VENTANA SORPRESA */
const surprise = document.getElementById("surprise");
const surpriseButton = document.getElementById("surprise-button");
const closeButton = surprise.querySelector(".close");


surpriseButton.addEventListener("click", () => {
  surprise.showModal();
});

closeButton.addEventListener("click", () => {
  surprise.close();
});

/* Cerrar si se hace clic fuera de la ventana */
surprise.addEventListener("click", (event) => {
  if (event.target !== surprise) return;

  const rectangle = surprise.getBoundingClientRect();

  const outside =
    event.clientX < rectangle.left ||
    event.clientX > rectangle.right ||
    event.clientY < rectangle.top ||
    event.clientY > rectangle.bottom;

  if (outside) {
    surprise.close();
  }
});// JavaScript Document

/* ==========================
   NUESTRA MÚSICA
   Dedicatorias originales y editables.
   ========================== */

const songs = {
  moon: {
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",

    meaning:
      "Para mí, esta canción representa la ilusión de un amor " +
      "que vuelve enorme todo lo que sentimos. Ese impulso de " +
      "imaginar lugares, momentos y una vida que todavía estamos " +
      "por descubrir.",

    dedication:
      "Te la dedico porque, aunque hoy nos separen kilómetros, " +
      "pensarte me lleva mucho más lejos que la distancia. " +
      "Me lleva a ese día en el que por fin pueda tomarte de la " +
      "mano. Si pudiera elegir un lugar para escucharla, no " +
      "elegiría la luna: elegiría estar contigo.",

    search: "Frank Sinatra Fly Me to the Moon"
  },

  tonight: {
    title: "The Way You Look Tonight",
    artist: "Frank Sinatra",

    meaning:
      "Para mí, representa la ternura de guardar a alguien en " +
      "la memoria. Querer conservar una sonrisa, una expresión " +
      "o un instante pequeño para volver a él cuando esa persona " +
      "no está cerca.",

    dedication:
      "Te la dedico pensando en lo bonito que será mirarte " +
      "sin una pantalla entre nosotros. No necesito imaginar " +
      "una noche perfecta ni un lugar extraordinario. Me basta " +
      "con imaginarte ahí, siendo tú, y poder pensar: por fin " +
      "estamos compartiendo el mismo momento.",

    search: "Frank Sinatra The Way You Look Tonight"
  },

  unforgettable: {
    title: "Unforgettable",
    artist: "Nat King Cole",

    meaning:
      "Para mí, esta canción representa la huella que deja " +
      "alguien especial. Hay personas que pasan a formar parte " +
      "de cómo recordamos una época, una fecha y hasta una " +
      "versión de nosotros mismos.",

    dedication:
      "Te la dedico porque el 31 de diciembre ya tiene algo " +
      "tuyo para siempre. Cuando piense en cómo empezó nuestra " +
      "historia, voy a pensar en ti y en todo lo que esa fecha " +
      "llegó a significar. Quería regalarte una canción que " +
      "guardara esa idea: tienes un lugar muy especial " +
      "en mi historia.",

    search: "Nat King Cole Unforgettable"
  },

  love: {
    title: "L-O-V-E",
    artist: "Nat King Cole",

    meaning:
      "Para mí, representa el lado alegre del amor: las ganas " +
      "de compartir, de jugar, de hacer sonreír a la otra " +
      "persona. El cariño también puede ser ligero, espontáneo " +
      "y lleno de pequeñas cosas bonitas.",

    dedication:
      "Te la dedico para que esta parte del libro te saque " +
      "una sonrisa. Porque además de extrañarte y escribirte " +
      "cosas profundas, también quiero reír contigo, inventar " +
      "planes y disfrutar de nosotros. Y porque algún día " +
      "quiero poner esta canción, ofrecerte mi mano y bailar " +
      "contigo, aunque tengamos que aprender los pasos.",

    search: "Nat King Cole L-O-V-E"
  }
};

const songButtons = [
  ...document.querySelectorAll("[data-song]")
];

const songMessage = document.getElementById("song-message");
const musicEmpty = document.getElementById("music-empty");
const songTitle = document.getElementById("song-title");
const songKicker = document.getElementById("song-kicker");
const songMeaning = document.getElementById("song-meaning");
const songDedication = document.getElementById("song-dedication");
const songLink = document.getElementById("song-link");

songButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const song = songs[button.dataset.song];

    if (!song) return;

    songButtons.forEach((otherButton) => {
      otherButton.setAttribute(
        "aria-expanded",
        String(otherButton === button)
      );
    });

    songKicker.textContent = song.artist.toUpperCase();
    songTitle.textContent = song.title;
    songMeaning.textContent = song.meaning;
    songDedication.textContent = song.dedication;

    songLink.href =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(song.search);

    songLink.setAttribute(
      "aria-label",
      `Buscar ${song.title} de ${song.artist} en YouTube`
    );

    musicEmpty.hidden = true;
    songMessage.hidden = false;

    // Reinicia la aparición suave al cambiar de canción.
    songMessage.style.animation = "none";
    void songMessage.offsetWidth;
    songMessage.style.animation = "";

    // Lleva el foco al mensaje para facilitar su lectura.
    songTitle.focus({ preventScroll: true });

    songMessage.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "nearest"
    });
  });
});