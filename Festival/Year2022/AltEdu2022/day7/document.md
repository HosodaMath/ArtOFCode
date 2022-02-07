# AltEdu2022 Day7の解説記事

今日のテーマは全画面でアニメーションするコードを書いてみてください。完成したらしばらく表示してみてくださいでした。

コードのライセンスはCC BY-NC-SA 3.0です。

実装した成果物は以下にあります。

[GitHub](https://github.com/HosodaMath/ArtOFCode/tree/main/Festival/Year2022/AltEdu2022/day7)

デモは以下にあります。

[Demo](https://hosodamath.github.io/fullScreenAnimation/)

今回はWebGLモードで作成しました。
circleの大きさを少しづつ変化させて回転するアニメーションを作成しました。

```ts
const divValue = 3;
const radius = 5;
const shiftX = radius;
const multi = 30;
const frameCount = p.frameCount * 0.005;
const scaleMax = 10;
p.push();
p.beginShape();
p.translate(0, 0, 0);
[...Array(DEGREE_MAX).keys()].forEach((degree) => {
  [...Array(scaleMax).keys()].forEach((scale) => {
    if (degree % divValue === 0) {
      const radian = degTorad(degree);
      const position = p.createVector(
        p.cos(radian * frameCount) * scale * multi,
        p.sin(radian * frameCount) * scale * multi,
        0
        );
      const radianMulti = 10;
      const radius2 = radius * Math.cos(radian * radianMulti) + shiftX;
      p.push();
      p.fill(p.color(scale * 30, scale * 30, 250, 200));
      p.ellipse(position.x, position.y, radius2, radius2);
      p.pop();
    }
  });
});
p.endShape();
p.pop();
```

本日は以上です。