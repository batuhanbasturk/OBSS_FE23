document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  function showCards() {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("appear");
      }, index * 200);
    });
  }
  showCards();
});
