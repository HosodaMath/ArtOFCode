# AltEdu2022 Day3の解説記事

## 何を作ったか？

節分と豆というタイトルでただ豆をクリックして落とさないようにする非常にシンプルなゲームを作りました。

## 何で作ったか？

p5.jsとTypeScriptで作成しました。

ソースコードは以下にあります。

ゲームプレイはこちらから

## 構成要素

ソースコード量はそれほど多くなく機能も比較的シンプルです。
- main.ts
- stage
  - Stage.ts
  - backgroundPicture.ts
- window
  - fullScreen.ts
  - startWindow.ts
  - gameOverWindow.ts
- setubun 
  -  GameObject.ts
     -  Bean.ts
        - CharacterBeans.ts  
     -  NPCBeans.ts

ベクトルなどはp5.jsの機能を使っています。

## 作る上で必要な知識

最低2つは必要になります

1つめはDOM（Document Object Model）の基本操作が必要になります、またDOMは後述するゲームの状態管理（ここでは状態管理とはゲームプレイ状態かゲームオーバー状態かということです）と密接な連携が不可欠になります。

具体的には

### Document Object Model

#### ゲーム開始画面

最初に生成される画面です。

![GameStartWidnow](スクリーンショット%20(582).png)

body要素（厳密にはgameBody要素ですがここではbodyとします）にdivタグを動的に追加しています。

DOMの構成要素は
- body 
  - div
    - h1
    - p
    - button 

のようになっています。


中央にあるGame Startのボタンを押すと画面は動的に削除されゲームプレイ画面に移行します。

#### ゲームプレイ画面

ゲームプレイ画面はDOM操作を気にする必要はなくp5.jsが勝手にcanvas要素をbody要素に追加します。Canvas APIやWebGLあるいはWebGPUをそのまま使おうとするとこうは行かないと思います。

DOMの構成要素は
- body
  -  canvas

![Game Play Window](スクリーンショット%20(583).png)

#### ゲームオーバー画面

ゲームオーバー画面はキャラクターが下画面外に出ると動的に追加されます。このときcanvas要素の上に乗せるように生成されなければなりません。そのためcanvas要素に以下のCSSコードを記述すると良いかもしれません。

```css
canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
```

![](スクリーンショット%20(584).png)

マウスをクリックするとゲームプレイ画面に復帰できます。このときゲームオーバー画面は動的に削除されます。

DOMの構成要素は
- body
  - canvas
  - div
    -  h1
    -  h2
    -  p

#### フルスクリーン画面

フルスクリーン画面はゲームにおいて必須ではありませんが画面が大きいと楽しいだろうなと思い実装しました。

ボタンをクリックするとフルスクリーンになります。

コードは以下になります。

```ts
export const createFullScreen = (gameBody: HTMLElement) => {
  const button = document.createElement("button");
  button.className = "fullScreenButton";
  button.textContent = "fullScreen";
  gameBody.appendChild(button);

  button.addEventListener("click", () => {
    gameBody.requestFullscreen();
  });
};
```

### ゲームプログラミング

すべてp5.jsとTypeScriptで実装されています。
以下に主要なものだけあげます。

#### NPCBeans

背景で流れていく豆NPCクラスです。NPCなので操作などはできません。

生成は以下のように一定間隔で生成されます。

```ts
if (this.p.frameCount % 120 === 1) {
  this.addMobBeans();
}
```

また無限ループ下での生成のため画面外に出たならば削除を行います。厳密には削除ではなく配列の再生成です。

```ts
this.beans = this.beans.filter((bean) => bean.isBeanRemove());
```

### CharacterBean

操作するキャラクタークラスです。これがないと何も始まりません。

CharacterBeanは重力で下へと行こうとします、そこで画面をクリックすると上へと行き落ちないようにします。

重力を加えるコード
```ts
public applyGravity(): void {
  const gravity = 0.15;
  this.velocity.y += gravity;
}
```
ジャンプ力を加えるコード
```ts
public applyJump(): void {
  const jump = -5;
  this.velocity.y = jump;
}
```
### Stage


NPCBeansとCharacterBeanを呼び出しているクラスです。

座標の更新や描画などを行っています。最終的にはStageクラスはmain.tsに呼び出されています。



## 何が難しかったか？

1つだけかなり苦戦しました

### ゲームオーバー画面からの復帰

ゲームプレイ中は無限ループ状態なのでそのままゲームオーバー画面を呼び出せば必要以上に画面が生成されてしまった。解決策としてp5.jsの関数である```loop()```と```noLoop()```を使い分けてることによって解決した。ここが正直1番時間を取られました。

## 今後は？

1日限りという制限付きでやっています。day4もがんばります。