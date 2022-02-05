# AltEdu2022 Day5の解説記事

厳密には線ではなく線分ですがここでは線としておきます。

今日のテーマは線を使わないで線を書いてみてくださいでした。

実装した成果物は以下にあります。

[GitHub]()

デモは以下にあります。

[Demo]()

何で作ったかといいますと、p5.jsの標準のvertexを使っています。p5.jsの標準のline関数は使っていません。最初はrectを細めて使おうとしましたがrectは座標の個数が4個なので細めても線のように動かすのは無理だと思いvertexを用いました。

今回作ったものは左右で微妙にずれて動かす線を作成しました。

左右で微妙なずれて動かすコードは以下のように作成しました。

```ts
const value1 = this.p.floor(this.p.random(1, 10));
const value2 = this.p.floor(this.p.random(1, 10));
const frameCount1 = this.p.frameCount % value1;
const frameCount2 = this.p.frameCount % value2;

if (frameCount1 === 1) {
  this.move1.velocity1.y = 1;
  this.move1.position1.add(this.move1.velocity1);
}

if (frameCount2 === 1) {
  this.move2.velocity2.y = 1;
  this.move2.position2.add(this.move2.velocity2);
}
```

コードを考えるのに少し手間取りました。

本日は以上です。
