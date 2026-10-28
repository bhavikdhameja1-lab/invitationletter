const home = document.querySelector(".home");
const invitation = document.querySelector("#invitation");
const openButton = document.querySelector("#open-invite");
const replayButton = document.querySelector("#replay-invite");
const animationStatus = document.querySelector("#animation-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let openingTimer;

function showInvitation() {
  window.clearTimeout(openingTimer);
  home.hidden = true;
  home.classList.remove("is-opening", "is-leaving");
  invitation.hidden = false;
  invitation.querySelector("h2").focus();
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
}

function replayInvitation() {
  invitation.hidden = true;
  home.hidden = false;
  home.classList.remove("is-opening", "is-leaving");
  openButton.setAttribute("aria-expanded", "false");
  openButton.disabled = false;
  openButton.focus();
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
}

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  openButton.setAttribute("aria-expanded", "true");
  home.classList.add("is-opening");
  animationStatus.textContent = "Opening the matchbox…";

  if (reduceMotion.matches) {
    showInvitation();
    return;
  }

  window.setTimeout(() => {
    animationStatus.textContent = "Strike a spark…";
  }, 650);

  window.setTimeout(() => {
    animationStatus.textContent = "Lighting up your invitation…";
  }, 1700);

  openingTimer = window.setTimeout(() => {
    home.classList.add("is-leaving");
    openingTimer = window.setTimeout(showInvitation, 550);
  }, 3050);
});

replayButton.addEventListener("click", replayInvitation);
