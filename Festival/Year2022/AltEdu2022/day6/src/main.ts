/**
 * AltEdu2022
 * CC BY-NC-SA 3.0
 */
import P5 from "p5";
import { Sketch } from "./Sketch";
import {
  createFullScreen,
  createStartWindow,
  createAudioController,
} from "./window/window";
import Sample from "./beat.wav";
import "sanitize.css";
import "./main.css";

const gameBody = document.body;
const startSystem = createStartWindow(gameBody);
createFullScreen(gameBody);
startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);
  createAudioController(gameBody);

  let isPlaying = false;
  let sampleSource: AudioBufferSourceNode;
  let gainNode: GainNode;

  /**
   * @description 音源サンプルの読み込み
   * @param audioCtx
   * @returns
   */
  const loadSample = async (audioCtx: AudioContext): Promise<AudioBuffer> => {
    const response = await fetch(Sample);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    return audioBuffer;
  };

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

  const main = () => {
    const playButton = document.querySelector(".audioPlayButton");
    if (!(playButton instanceof HTMLButtonElement)) {
      throw new Error("Error");
    }

    // 再生と同時にスケッチを呼び出す
    playButton.addEventListener("click", async () => {
      const audioContext = new AudioContext();

      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      const bufferLength = analyzer.frequencyBinCount;
      const data = new Uint8Array(bufferLength);
      analyzer.getByteTimeDomainData(data);

      gainNode = audioContext.createGain();

      if (isPlaying === true) {
        return;
      }

      const sample = await loadSample(audioContext);

      playSample(audioContext, sample, analyzer);

      const sketch = new Sketch(analyzer, data);
      new P5(sketch.sketch);
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
  };

  main();
});
