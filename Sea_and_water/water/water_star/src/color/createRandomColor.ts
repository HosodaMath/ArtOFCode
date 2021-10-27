export const createRandomColor = () => {
  const colorParts = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let colorData = "#";
  [...Array(6).keys()].forEach((_count) => {
    colorData += colorParts[Math.ceil(Math.random() * 15)];
  });

  return colorData;
};