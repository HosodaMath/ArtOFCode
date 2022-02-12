export const plusButtonControl = (gainNode: GainNode) => {
  const plusButton = document.querySelector(".audioGainPlusButton");
  if (!(plusButton instanceof HTMLButtonElement)) {
    throw new Error("Error");
  }

  plusButton.addEventListener("click", () => {
    if (gainNode.gain.value < 1) {
      gainNode.gain.value += 0.05;
    }
    // console.log(gainNode.gain.value);
  });
};
