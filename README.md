## vrsources

> 为vr-panorama生成全景图, 基于gm

### 准备工作

安装 graphicsmagick

``` bash
brew install graphicsmagick
```

clone项目

```bash
git clone https://github.com/fightingm/vrsources.git
```

安装依赖

```bash
yarn / npm i
```

### 将全景图切割成碎片图

在目录下准备一张sphere.jpg,执行`npm run sphere`
切割好的图片就会在sphere目录中

### 将立方体的六个面拼接成全景图

在目录下新建cube文件夹，放入六个面的图片，命名规则：
假设我们现在在盒子内部中心点，面向屏幕外
```
pano1: 背面图
pano2: 右面图
pano3: 前面图
pano4: 左面图
pano5: 下面图
pano6: 上面图
```
然后执行`npm run cube`
会生成一个拼接好的图片cube.jpg
