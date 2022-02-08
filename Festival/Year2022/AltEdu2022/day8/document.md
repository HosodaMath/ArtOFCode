# AltEdu2022 Day8の解説記事

今日のテーマはお気に入りの曲を聞きながらコードを書いてください。書いている途中で踊っても構いません。

実装した成果物は以下にあります。

[GitHub](https://github.com/HosodaMath/ArtOFCode/tree/main/Festival/Year2022/AltEdu2022/day8)

デモは以下にあります。

今回は比較検討のため簡単なランディングページになっています。

[Demo](https://hosodamath.github.io/canvasSound/)

聞いていた曲はTRUEさんのWILLとDREAM SOLISTERです。

今回はWebに関わる複数のAPIを使って実装しているので実装は若干難しかったです。

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

今回はCSSのみを使っていますが今度はWebGLあるいはWebGPUとDOMを組み合わせたものにも挑戦したいと思います。

本日は以上です。