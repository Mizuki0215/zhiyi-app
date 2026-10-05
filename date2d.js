const FR = {
  herIdle: "assets/her-idle.png",
  herHold: "assets/her-hold.png",
  herGive: "assets/her-give.png",
  himIdle: "assets/him-idle.png",
  himTake: "assets/him-take.png",
  himSoft: "assets/him-soft.png"
};
const DateRoom = {
  init() {
    const face = document.getElementById("him-face");
    if (!face || face.dataset.bound) return;
    face.dataset.bound = "1";
    face.addEventListener("click", () => {
      DateRoom.react("tap-him");
      if (window.onDateTap) window.onDateTap("him");
    });
  },
  react(kind) {
    const her = document.querySelector(".ch.her");
    const him = document.getElementById("him-face");
    if (!her || !him) return;
    if (DateRoom._timer) clearInterval(DateRoom._timer);
    if (kind !== "gift") {
      him.src = FR.himIdle;
      her.src = FR.herIdle;
      him.classList.add("touched");
      setTimeout(() => him.classList.remove("touched"), 700);
      return;
    }
    const frames = [
      [FR.herIdle, FR.himIdle],
      [FR.herHold, FR.himIdle],
      [FR.herGive, FR.himIdle],
      [FR.herGive, FR.himTake],
      [FR.herIdle, FR.himSoft]
    ];
    let i = 0;
    const step = () => {
      her.src = frames[i][0];
      him.src = frames[i][1];
      i += 1;
      if (i >= frames.length) clearInterval(DateRoom._timer);
    };
    step();
    DateRoom._timer = setInterval(step, 700);
  }
};
