export const createGameOverWindow = (gameBody: HTMLElement) => {
  const gameOverWindow = document.createElement("div");
  gameOverWindow.className = "gameOverWindow";

  const gameTitle = document.createElement("h1");
  gameTitle.textContent = "節分と豆";

  const gameOver = document.createElement("h2");
  gameOver.textContent = "Game Over!!";

  const gameDescription = document.createElement("p");
  gameDescription.textContent = "マウスをクリックすると再開します。";

  gameBody.appendChild(gameOverWindow);
  gameOverWindow.appendChild(gameTitle);
  gameOverWindow.appendChild(gameOver);
  gameOverWindow.appendChild(gameDescription);

  return gameOverWindow;
};
