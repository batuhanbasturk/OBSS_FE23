function showCards() {
  const cards = document.querySelectorAll("#apiData .card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("appear");
    }, index * 200);
  });
}
