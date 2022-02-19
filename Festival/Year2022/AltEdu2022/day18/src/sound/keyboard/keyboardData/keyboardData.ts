import { getElementByNote } from "./keyNote";
interface KeybordType {
  element: Element;
  note: string;
  octaveOffset: number;
}

export const keyData: KeybordType[] = [
  {
    element: getElementByNote("C"),
    note: "C",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("C#"),
    note: "C#",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("D"),
    note: "D",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("D#"),
    note: "D#",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("E"),
    note: "E",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("F"),
    note: "F",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("F#"),
    note: "F#",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("G"),
    note: "G",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("G#"),
    note: "G#",
    octaveOffset: 0,
  },
  {
    element: getElementByNote("A"),
    note: "A",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("A#"),
    note: "A#",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("B"),
    note: "B",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("C2"),
    note: "C",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("C#2"),
    note: "C#",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("D2"),
    note: "D",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("D#2"),
    note: "D#",
    octaveOffset: 1,
  },
  {
    element: getElementByNote("E2"),
    note: "E",
    octaveOffset: 1,
  },
];
