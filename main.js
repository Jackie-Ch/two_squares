import "./style.css";

const canvas = document.querySelector(".canvas");

const wrapper = document.querySelector(".wrapper");

const violet = document.querySelector(".violet");
violet.style.backgroundColor = "rgb(227, 207, 243)";
violet.style.border = "2px solid rgb(188, 58, 188)";
violet.style.borderColor = "rgb(188, 58, 188)";

const green = document.querySelector(".green");
green.style.backgroundColor = "rgb(209, 239, 206)";
green.style.border = "2px solid rgb(99, 211, 89)";
green.style.borderColor = "rgb(99, 211, 89)";

const orange = document.querySelector(".orange");
orange.style.backgroundColor = "rgb(250, 230, 216)";
orange.style.border = "2px solid rgb(249, 157, 91)";
orange.style.borderColor = "rgb(249, 157, 91)";

const resetBtn = document.querySelector(".resetBtn");

const sqr1 = document.createElement("div");
sqr1.classList.add("sqr1", "sqr");
sqr1.style.top = "50px";
sqr1.style.left = "50px";

const sqr2 = document.createElement("div");
sqr2.classList.add("sqr2", "sqr");
sqr2.style.top = "250px";
sqr2.style.left = "500px";

const body = document.body;

canvas.append(sqr1, sqr2);

wrapper.addEventListener("click", (event) => {
  if (event.target === sqr1 || event.target === sqr2) {
    if (!event.target.classList.contains("active")) {
      document
        .querySelectorAll(".sqr")
        .forEach((elem) => elem.classList.remove("active"));
      event.target.classList.add("active");
    } else {
      event.target.classList.remove("active");
    }
  }

  if (
    event.target === violet ||
    event.target === green ||
    event.target === orange
  ) {
    if (document.querySelector(".active")) {
      document.querySelector(".active").style.backgroundColor =
        event.target.style.backgroundColor;
      document.querySelector(".active").style.borderColor =
        event.target.style.borderColor;
    }
  }

  body.addEventListener("mousedown", (event) => {
    event.preventDefault();

    const element = event.target;
    const pickX = event.offsetX;
    const pickY = event.offsetY;

    const moveElem = (event) => {
      event.preventDefault();
      if (element === canvas) return;
      canvas.childNodes.forEach((item) => {
        const activeItem = document.querySelector(".active");
        if (!activeItem) return;
        const sqrs = document.querySelectorAll(".sqr");

        for (let i = 0; i < sqrs.length; i++) {
          let reclI = sqrs[i].getBoundingClientRect();
          for (let j = i + 1; j < sqrs.length; j++) {
            let reclJ = sqrs[j].getBoundingClientRect();
            let sqrCross =
              Math.max(reclI.x, reclJ.x) <=
                Math.min(reclI.x + reclI.width, reclJ.x + reclJ.width) &&
              Math.max(reclI.y, reclJ.y) <=
                Math.min(reclI.y + reclI.height, reclJ.y + reclJ.height);

            if (!item.classList.contains("active")) {
              if (
                !sqrCross &&
                activeItem.offsetTop >= 0 &&
                activeItem.offsetLeft >= 0 &&
                activeItem.offsetTop <= 700 &&
                activeItem.offsetLeft <= 700
              ) {
                activeItem.style.top = `${event.clientY - pickY}px`;
                activeItem.style.left = `${event.clientX - pickX}px`;
              } else {
                if (activeItem.offsetLeft < 0) {
                  activeItem.style.left = `0px`;
                } else if (activeItem.offsetLeft > 600) {
                  activeItem.style.left = `600px`;
                } else if (activeItem.offsetTop < 0) {
                  activeItem.style.top = `0px`;
                } else if (activeItem.offsetTop > 700) {
                  activeItem.style.top = `700px`;
                } else {
                  activeItem.style.top = `${event.clientY - pickY}px`;
                  activeItem.style.left = `${event.clientX - pickX}px`;
                  item.style.top = `${activeItem.offsetTop}px`;
                  item.style.left = `${activeItem.offsetLeft + 100}px`;
                }
              }
            }
            resetBtn.addEventListener("click", () => {
              if (sqrCross) {
                sqr1.style.top = "50px";
                sqr1.style.left = "50px";

                sqr2.style.top = "250px";
                sqr2.style.left = "500px";
              }
              sqrCross = false;
            });
          }
        }
      });
    };
    body.addEventListener("mousemove", moveElem);

    body.addEventListener("mouseup", () => {
      body.removeEventListener("mousemove", moveElem);
    });
  });
});
