/**
 * @description 音源サンプルの読み込み
 * @param audioCtx
 * @returns
 */
export const loadSample = async (
  audioCtx: AudioContext,
  musicDataURL: string
): Promise<AudioBuffer> => {
  const response = await fetch(musicDataURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  return audioBuffer;
};
