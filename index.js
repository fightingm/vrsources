const gm = require('gm');
const fs = require('fs');

const arg = process.argv.splice(2)[0];

const SPHERE_INFO = {
    src: './sphere.jpg',
    dest: './sphere'
};
const CUBE_INFO = {
    src: './cube.jpg',
    dest: './cube'
};


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

function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if(err) {
                fs.mkdir(dir, err => {
                    console.log(err);
                });
            }
            resolve();
        })
    })
}

// 将球面全景图切割成碎片图
async function sphereSlice(objInfo) {
    const { src, dest } = objInfo;
    await mkdir(dest);
    const { width, height } = await size(src);
    const sliceWidth = width / 8;
    const sliceHeight = height / 4;
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 4; j++) {
            const destImg = `${dest}/pano${i}-${j}.jpg`;
            const x = i * sliceWidth;
            const y = j * sliceHeight;
            crop(src, destImg, sliceWidth, sliceHeight, x, y);
        }
    }
}

// 将立方体的每一个面拼接成全景图
async function cubeSlice(objInfo) {
    const { src, dest } = objInfo;
    let arr = [];
    for(let i = 1; i < 7; i++) {
        arr.push(`${dest}/pano${i}.jpg`)
    }
    gm(arr.splice(0, 1)).append(...arr, true).write(src, err =>{
        console.log(err);
    });
}

if(arg === 'cube') {
    cubeSlice(CUBE_INFO)
} else {
    sphereSlice(SPHERE_INFO)
}