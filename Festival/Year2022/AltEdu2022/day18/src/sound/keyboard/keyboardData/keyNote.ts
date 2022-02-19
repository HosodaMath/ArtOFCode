export const getElementByNote = (note: string) => {
  const data = note && document.querySelector(`[note="${note}"]`);
  if (!data) {
    throw new Error("Error!! keyboradデータが読み込まれていません。");
  }

  return data;
};