const context: AudioContext = new AudioContext();
let sample_audio_source: AudioBufferSourceNode;
let isPlaying = false;

/**
 * Fetch APIを使い音声データを読み込む
 * @description オーディオデータをArrayBufferからAudioBufferに変換する。
 * AudioBuffer形式で出力される
 * @async setupSample
 * @returns audioBuffer
 * @todo AudioBuffer形式になれる
 * @todo オーディオビジュアライゼーションの実装
 * @todo 非同期処理に慣れる
 */
const setupSample = async () => {
  /// async関数のPromiseの解決もしくは拒否を待つ
  const response = await fetch("./sounds/wind1.mp3");
  /// ArrayBufferは固定長のバイナリデータ
  const arrayBuffer = await response.arrayBuffer();
  /// データ変換をおこなう
  /// 扱いしやすいデータ形式は処理系によって異なるので適切な判断をする。
  /// WebAudioAPIで扱えるのデータ形式はAudioBuffer形式なのでArrayBuffer形式からAudioBuffer形式に変換する
  const audioBuffer = await context.decodeAudioData(arrayBuffer);

  return audioBuffer;
};

/**
 *
 * @param context
 * @param audioBuffer
 * @param isLoop
 */
const playSample = (
  context: AudioContext,
  audioBuffer: AudioBuffer,
  isLoop: boolean
) => {
  // AudioBufferSourceNodeの生成
  /// AudioBufferに保存されたインメモリ音声データからなるオーディオソースを表している
  /// -> 再生スタートやループ再生設定、再生停止などが可能
  /// -> 特に再生のタイミングに高い正確性が必要な場合に使う。つまり通常はこれで十分とう言うことだろうか？😟
  /// -> 外部ディスクやネットワークから読み込むにはAudioWorkletNodeを使う必要がある。 -> フムフム🤔
  /// -> 入力はなく出力は1つAudioBufferSourceNode.bufferのチャンネル数に依存する。
  /// これらはすべて親インターフェースのAudioScheduledSourceNodeで定義されている。
  sample_audio_source = context.createBufferSource();

  // AudioBufferに音声データが保存されているのでそれを取り出し音源に設定する
  // AudioBufferに保存されているオーディオソースを音源として設定する
  sample_audio_source.buffer = audioBuffer;

  // What is connect?🤔
  /// connectはAudioNodeのメソッド
  /// connectはNodeの出力をターゲットに接続することができます。
  /// ターゲットは他のAudioNodeあるいはAudioParamを指定する。
  /// ノードの出力データを使ってパラメーターの値を自動的に変化できる。

  // What is destination?🤔
  /// BaseAudioContext(定義のみで直接扱うにはAudioContextを介する)のPropertiesでread only
  /// 最終的な送信先を表すAudioDestinationNodeを返す。
  /// 通常はデバイスのスピーカーなど、音声に関わる機器に接続される。
  /// -> ならばAudioDestinationNodeとは？

  // What is AudioDestinationNode?🤔
  /// AudioDestinationNodeはBaseAudioContext(定義のみで直接扱うにはAudioContextを介する)のAudioContext.destinationプロパティを使って取得が可能
  /// オーディオグラフの最終目的地(デバイスのスピーカーなど)を表している。
  /// OfflineAudioContextと組み合わせてオーディオデータを記録するノードにもなる。
  /// そのため入力は1つあるが出力はなし。 -> 後続のAudioNodeとリンクできない。-> オーディオデータの最終目的地の1つになる。

  // 出力につなげる
  sample_audio_source.connect(context.destination);

  // ループ再生するかどうか（デフォルトはfalse）
  /// trueにするとループ再生が可能
  sample_audio_source.loop = isLoop;

  // 再生開始
  /// 再生開始時間をスケジューリングすることも可能😉
  /// setTimeoutなどを使えば時間をずらすことは可能
  sample_audio_source.start();

  isPlaying = true;
};

export const audioPlay = () => {
  document.querySelector("#play")?.addEventListener("click", async () => {
    if (isPlaying) {
      return;
    }

    const sample = await setupSample();
    playSample(context, sample, true);
  });
};

export const audioStop = () => {
  document.querySelector("#stop")?.addEventListener("click", async () => {
    sample_audio_source.stop();
    isPlaying = false;
  });
};
