int i,j;float x,y;void setup(){size(512,512);background(230,230,255);for(i=0;i<1000;i++){x=random(-1,1);y=random(-1,1);for(j=0;j<1000;j++){fill(i*0.5,250,100);circle(noise(x*1.5,y*2.5)*512,noise(x*3.5,y*2.5)*512,5);}}filter(BLUR,2.0);filter(POSTERIZE,4);
  saveFrame("capture/" + "green" + year() + minute() + second() + millis() + ".png");
}


