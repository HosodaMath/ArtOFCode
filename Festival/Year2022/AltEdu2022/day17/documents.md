# AltEdu2022 Day17の解説記事

今日のテーマは3色の色、3種類の図形だけを使って、コードを書いてくださいでした。

コードは以下にあります。

[GitHub](https://github.com/HosodaMath/ArtOFCode/tree/main/Festival/Year2022/AltEdu2022/day17/src)

デモは以下にあります。

[Demo](https://hosodamath.github.io/three3Sketch/)

3色の色と3種類の図形（円、矩形、三角形）の3つを使い異なるパターンや変化などをスケッチを3つ作成して描きました。

1つめはy軸に大きさの異なる変化をした図形を描きました。

![y軸に大きさの異なる変化をした図形](sketch0.png)

2つめはx軸に大きさの異なる変化をした図形を描きました。

![x軸に大きさの異なる変化をした図形](sketch1.png)

3つめは3つの図形がそれぞれ異なるタイミングで変化する図形を描きました。

![3つの図形がそれぞれ異なるタイミングで変化する図形](sketch2.png)


3つめのコードの変化の割当は以下のようになります。

円の変化は
```ts
 circle(p, shapeSize * p.sin(p.frameCount * 0.005) * y * 0.1 );
```

矩形の変化は
```ts
rect(p, shapeSize * p.cos(p.frameCount * 0.005) * y * 0.1 );
```

三角形の変化は
```ts
triangle(p, shapeSize * p.sin(p.frameCount * 0.005) * x * 0.1 );
```

[sketch2の動画はここにあります](https://www.youtube.com/watch?v=JAe4bd47KLQ)

本日は以上です。