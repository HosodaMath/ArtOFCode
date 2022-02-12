// import P5 from "p5";
import { sketch } from "./sketch/sketch";
import {
  createFullScreen,
  createStartWindow,
  createAudioController,
} from "./window/window";
import { loadSample } from "./audio/audio";
import Sample from "./assets/beat.wav";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;
createFullScreen(gameBody);

const startWindow = createStartWindow(gameBody);
startWindow.startButton.addEventListener("click", async () => {
  gameBody.removeChild(startWindow.startWindow);
  createAudioController(gameBody);
  let isPlaying = false;
  let sampleSource: AudioBufferSourceNode;
  let gainNode: GainNode;

  /**
   * @description サンプル音源の再生
   * @param audioCtx
   * @param audioBuffer
   * @param analyzer
   */
  const playSample = (
    audioCtx: AudioContext,
    audioBuffer: AudioBuffer,
    analyzer: AnalyserNode
  ) => {
    sampleSource = audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource
      .connect(gainNode)
      .connect(analyzer)
      .connect(audioCtx.destination);
    sampleSource.start();

    isPlaying = true;
  };

  const playButton = document.querySelector(".audioPlayButton");
  if (!(playButton instanceof HTMLButtonElement)) {
    throw new Error("Error");
  }

  // 再生と同時にスケッチを呼び出す
  playButton.addEventListener("click", async () => {
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();

    gainNode = audioContext.createGain();

    if (isPlaying === true) {
      return;
    }

    const sample = await loadSample(audioContext, Sample);

    playSample(audioContext, sample, analyzer);

    const timeDomainArray = new Float32Array(analyzer.fftSize);
    const frequencyArray = new Float32Array(analyzer.frequencyBinCount);

    sketch(analyzer, timeDomainArray, frequencyArray);
  });

  const stopButton = document.querySelector(".audioStopButton");
  if (!(stopButton instanceof HTMLButtonElement)) {
    throw new Error("Error");
  }

  // 再生停止とともにcanvasを削除 and オーディオ停止のお知らせ
  stopButton.addEventListener("click", async () => {
    const main = document.querySelector("main");
    if (!(main instanceof HTMLElement)) {
      throw new Error("Error");
    }
    gameBody.removeChild(main);

    sampleSource.stop();
    isPlaying = false;
  });

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

  const minusButton = document.querySelector(".audioGainMinusButton");
  if (!(minusButton instanceof HTMLButtonElement)) {
    throw new Error("Error");
  }

  minusButton.addEventListener("click", () => {
    if (gainNode.gain.value > 0.05) {
      gainNode.gain.value -= 0.05;
    }
    // console.log(gainNode.gain.value);
  });
});
