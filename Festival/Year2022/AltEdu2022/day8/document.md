# AltEdu2022 Day8の解説記事

今日のテーマはお気に入りの曲を聞きながらコードを書いてください。書いている途中で踊っても構いません。

実装した成果物は以下にあります。

[GitHub]()

デモは以下にあります。

[Demo]()

聞いていた曲はTRUEさんのWILLとDREAM SOLISTERです。

作成したものはWeb Audio APIでp5.jsを使って作成したスケッチ自体を動かしています。

canvas要素をCSSのTransformで動かしています。アニメーションはrequestAnimationFrameを使っています。動かしているコードは下記に記載します。

```ts
 const canvasAnimation = () => {
  analyzer.getByteTimeDomainData(data);
  [...Array(data.length).keys()].forEach((count) => {
    const value = data[count] / 128;
    const canvasScale = value * 1.0;

    const x = Math.abs(Math.cos(frameCount * 0.005) * window.innerWidth * 0.5);
    const y = window.innerHeight * 0.5 - canvasHarfSizeY;
    const angle = Mathematics.degTorad(frameCount * 0.5);
    canvas.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) scale(${canvasScale}, ${canvasScale})`;
    });

  frameCount = requestAnimationFrame(canvasAnimation);
};
```

本日は以上です。