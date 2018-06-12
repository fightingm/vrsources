const gm = require('gm');
const fs = require('fs');

function size(srcImg) {
    return new Promise((resolve, reject) => {
        gm(srcImg).size(function(err, value){
            resolve(value);
        })
    })
}

function crop(srcImg, destImg, width, height, x, y) {
    gm(srcImg).crop(width, height, x, y).write(destImg, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function mkdir() {
    return new Promise((resolve, reject) => {
        fs.stat('dest', (err, stats) => {
            if(err) {
                fs.mkdir('dest', err => {
                    console.log(err);
                });
            }
            resolve();
        })
    })
}



async function sliceImg(srcImg) {
    await mkdir();
    const { width, height } = await size(srcImg);
    const sliceWidth = width / 8;
    const sliceHeight = height / 4;
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 4; j++) {
            const destImg = `./dest/pano${i}-${j}.jpg`;
            const x = i * sliceWidth;
            const y = j * sliceHeight;
            crop(srcImg, destImg, sliceWidth, sliceHeight, x, y);
        }
    }
}

sliceImg('./test.jpg');