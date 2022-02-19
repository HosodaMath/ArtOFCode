import * as Keybord from "../keyboard";
import { Sound } from "../../sound";
import { sketch0 } from "../../../sketch/sketch0";
const pressedNote: Map<number, OscillatorNode> = new Map();
/**
 * @class KeybordOscillator
 * @description オシレーターの作成
 */
export class KeyboradOscillator {
  /**
   *
   * @param key
   * @param oscType
   */
  static playKey = (
    key: number,
    oscType: OscillatorType = "triangle",
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext
  ) => {
    const audioContext = new window.AudioContext();
    const analyzer = audioContext.createAnalyser();

    // オシレーターの作成
    const osc = audioContext.createOscillator();

    // ゲインノードの作成
    // 音量の調節などに用いられる
    const noteGainNode = audioContext.createGain();

    // ゲインノードに接続する
    noteGainNode.connect(audioContext.destination);

    const zeroGain = 0.00001;
    const maxGain = 0.5;
    const sustainedGain = 0.001;

    noteGainNode.gain.value = zeroGain;

    /**
     * @todo 調べる
     * @description
     */
    const setAttack = () => {
      // ゲインノードにexponentialRampToValueAtTimeを接続する
      /**
       *
       * AudioParam InterfaceのexponentialRampToValueAtTime()メソッドは、
       * AudioParamの値を徐々に指数関数的に変化させます。
       * この変化は、前のイベントで指定された時間に始まり、
       * valueパラメータで指定された新しい値まで指数関数的に上昇し、
       * endTimeパラメータで指定された時間に新しい値に到達します。
       */
      noteGainNode.gain.exponentialRampToValueAtTime(
        maxGain,
        audioContext.currentTime + 0.01
      );
    };

    /**
     * @todo 調べる
     * @description
     */
    const setDecay = () => {
      // ゲインノードにexponentialRampToValueAtTimeを接続する
      noteGainNode.gain.exponentialRampToValueAtTime(
        sustainedGain,
        audioContext.currentTime + 1.0
      );
    };

    /**
     * @todo 調べる
     * @description
     */
    const setRelease = () => {
      // ゲインノードにexponentialRampToValueAtTimeを接続する
      noteGainNode.gain.exponentialRampToValueAtTime(
        zeroGain,
        audioContext.currentTime + 2.0
      );
    };

    setAttack();
    setDecay();
    setRelease();

    osc.connect(noteGainNode).connect(analyzer);

    osc.type = oscType;

    const frequency = Sound.calcHz(
      Keybord.keyData[key].note,
      (Keybord.keyData[key].octaveOffset || 0) + 3
    );
    /*
    console.log(
      frequency,
      Keybord.keyData[key].note,
      (Keybord.keyData[key].octaveOffset || 0) + 3
    );*/

    // オシレーターの周波数を設定
    if (Number.isFinite(frequency)) {
      osc.frequency.value = frequency;
    }

    Keybord.keyData[key].element.classList.add("pressed");
    pressedNote.set(key, osc);
    pressedNote.get(key)?.start();

    // ここでWebGL2のスケッチを呼び出す
    sketch0(analyzer, canvas, gl);
  };

  static stopKey = (key: number) => {
    if (!Keybord.keyData[key]) {
      return;
    }

    Keybord.keyData[key].element.classList.remove("pressed");
    const osc = pressedNote.get(key);

    if (osc) {
      setTimeout(() => {
        osc.stop();
      }, 2000);

      pressedNote.delete(key);
    }
  };
}
