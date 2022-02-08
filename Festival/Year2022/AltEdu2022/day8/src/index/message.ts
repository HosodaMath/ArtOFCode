/**
 * @description 上部にあるメッセージBOXを作成
 * @param main
 */
export const createMessage = (main: HTMLElement) => {
  // 上部にあるメッセージBOXを作成
  const descriptionSection = document.createElement("section");
  descriptionSection.className = "sketchContents wrapper";

  // ページタイトル
  const pageTitle = document.createElement("h2");
  pageTitle.textContent = "Sketch";
  pageTitle.className = "pageTitle";

  // メッセージ本文の作成
  const contentsMessage = document.createElement("div");
  contentsMessage.className = "contentsMessage";

  // ここからcontentsMessageの子要素
  const contentsTitle = document.createElement("h3");
  contentsTitle.textContent = "Message";

  // message1
  const contentsMessage1 = document.createElement("p");
  const message1 = `
  これはAltEdu2022 Day8で作った成果物です。主にp5.jsとCSSアニメーションを組み合わせて作成しました。
  p5.jsで生成されるsketchはリアルタイム生成です。
  `;
  contentsMessage1.textContent = message1;

  // ここまでがcontentsMessageの子要素

  // 変数定義をもとに作成
  main.appendChild(descriptionSection);
  descriptionSection.appendChild(pageTitle);
  descriptionSection.appendChild(contentsMessage);
  contentsMessage.appendChild(contentsTitle);
  contentsMessage.appendChild(contentsMessage1);
};
