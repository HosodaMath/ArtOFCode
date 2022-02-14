# AltEdu2022 Day14の解説記事

今日のテーマは#つぶやきProcessingに挑戦してみましょう！1ツイートに収まらなくても構いませんでした。

実装したコードは以下にあります。

[GitHub](https://github.com/HosodaMath/ArtOFCode/blob/main/Festival/Year2022/AltEdu2022/day14/green/green.pde)

```java
int i,j;float x,y;void setup(){size(512,512);background(230,230,255);for(i=0;i<1000;i++){x=random(-1,1);y=random(-1,1);for(j=0;j<1000;j++){fill(i*0.5,250,100);circle(noise(x*1.5,y*2.5)*512,noise(x*3.5,y*2.5)*512,5);}}filter(BLUR,2.0);filter(POSTERIZE,4);}
```

工夫して1ツイートに収まりました。

本日は以上です。