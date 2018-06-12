## vrsources

> 为vr-panorama生成全景图, 基于gm

### 使用方法

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

将目录中test.jpg换成你的全景图，然后执行

```bash
node index.js
```

切割好的图片就会在dest目录中