let wheel = document.querySelector('.taichi_wheel');
let title = document.querySelector('.taichi_title');

// 最大转速degree/s
const maxAngularSpeed = 1800;

// 角加速度degree/s^2
const acceleration = 6;

// 1秒帧数
const frame = 60;

// 每帧秒数
const secPerFrame = 1000 / frame;

// 每帧角加速度
const accPerFrame = acceleration / frame

// 当前转动的角度
let currentRotation = 0;

// 当前角速度
let angularSpeed = 0;

let spinInterval;
let stopInterval;

function changeRotateStatus() {
    currentRotation += angularSpeed;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    title.innerText = `${(angularSpeed * frame).toFixed(0).toString()}°/s`;
}

wheel.onmouseenter = () => {
    if (stopInterval) {
        clearInterval(stopInterval);
    }

    spinInterval = setInterval(() => {  
        // 匀加速至最大转速
        if (angularSpeed * frame < maxAngularSpeed) {
            angularSpeed += accPerFrame;
        }

        changeRotateStatus();
    }, secPerFrame);
}

wheel.onmouseleave = () => {
    clearInterval(spinInterval);
    stopInterval = setInterval(() => {
        if (angularSpeed > 1e-6) {
            // 匀减速至0
            angularSpeed -= accPerFrame;
            changeRotateStatus();
        } else {
            angularSpeed = 0;
            clearInterval(stopInterval);
            title.innerText = "Stop"
        }
    }, secPerFrame);
}





