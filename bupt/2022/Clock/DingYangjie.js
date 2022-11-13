const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const drawClock = (size, ctx, clockd) => {
  ctx.clearRect(0, 0, size, size); // 清空矩形区域

  //绘制白色矩形
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.rect(0, 0, size, size);
  ctx.fill();
  ctx.closePath();


  indicator(size, ctx, clockd); //绘制钟表12个点位标志
  timeAdd((size / 2), size / 5 * 3, size, ctx, clockd); //绘制钟表内的数字时钟
  dateAdd((size / 2), size / 5 * 3 + size / 10, size, ctx, clockd);//绘制日期

  const now = new Date();
  const timeOff = 0; //是否有偏移，有的话加上
  now.setTime(now.getTime() + timeOff * 1000);
  const milisec = now.getMilliseconds(); //获取当前时间的秒分时
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours() % 12;
  let startAngle = -1.57 + sec * 0.1046 + milisec / 1000 * 0.1046;//开始弧度 
  let endAngle = -1.569 + sec * 0.1046 + milisec / 1000 * 0.1046;//结束弧度

  
  ctx.fillStyle = clockd['secondHandColor'] ; //设置填充颜色
  ctx.strokeStyle =clockd['secondHandColor'] ;//设置画笔颜色
  ctx.lineCap = 'round'; // 线段末端以圆形结束。

  //绘制秒针短端
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo((size / 2), (size / 2));
  ctx.arc((size / 2), (size / 2), size / 3, startAngle, endAngle, 0);//每秒走过的弧度 顺时针绘制秒针短端
  ctx.stroke();
  ctx.closePath();

  //绘制秒针长端
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo((size / 2), (size / 2));
  startAngle = 1.57 + sec * 0.1046 + milisec / 1000 * 0.1046;
  endAngle = 1.569 + sec * 0.1046 + milisec / 1000 * 0.1046;
  ctx.arc((size / 2), (size / 2), size / 15, startAngle, endAngle, 1); //逆时针绘制秒针长端
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = clockd['minuteHandColor'] 
  ctx.strokeStyle =clockd['minuteHandColor'] 
  ctx.lineCap = 'round';// 线段末端以圆形结束。
  startAngle = -1.57 + min * 0.1046 + sec / 60 * 0.1046;
  endAngle = -1.569 + min * 0.1046 + sec / 60 * 0.1046;
  //绘制分针
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo((size / 2), (size / 2));
  ctx.arc((size / 2), (size / 2), size / 3, startAngle,endAngle , 0);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = clockd['hourHandColor'] ;
  ctx.strokeStyle = clockd['hourHandColor'];
  ctx.lineCap = 'round';

  //绘制时针
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo((size / 2), (size / 2));
  ctx.arc((size / 2), (size / 2), size / 4, -1.57 + hour * 0.523 + min / 60 * 0.523, -1.569 + hour * 0.523 + min / 60 * 0.523, 0);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle =clockd['dial1Color'];
  ctx.strokeStyle =  clockd['dial1Color'];
  ctx.lineCap = 'round';

  //绘制中心圆点
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.arc((size / 2), (size / 2), size / 80, 0, 6.28, 0);
  ctx.fill();
  ctx.closePath();

  //每隔50ms执行一次
  clockd.timer = setTimeout(function () {
    drawClock(size, ctx, clockd)
  }, 50);
}

//绘制钟表12个点位标志
const indicator = (size, ctx, clockd) => {
  //设置画笔颜色和线宽
  ctx.strokeStyle = clockd['indicateColor'];
  ctx.lineWidth = 2;
  let ekstra

  //绘制12个线段来表示1-12点
  for (let a = 0; a < 12; a++) {
    const r = parseInt(a) * 0.523;
    const calc = Math.cos(r - 1.57);
    const y = Math.sin(r - 1.57);

    if (a % 3 == 0) {
       ekstra = size / 50;
    } else {
       ekstra = 0;
    }
    ctx.beginPath();
    ctx.moveTo(calc * (size / 3 + ekstra) + (size / 2), y * (size / 3 + ekstra) + (size / 2));
    ctx.lineTo(calc * size / 3.25 + (size / 2), y * size / 3.25 + (size / 2));
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

//绘制数字时钟
const timeAdd = (x, y, size, ctx, clockd) => {
  //获取当前时间和数字时钟的显示格式
  const now = new Date();
  const timeOff = 0;
  now.setTime(now.getTime() + timeOff * 1000);
  let sec = now.getSeconds();
  let min = now.getMinutes();
  let hour = clockd['time24h']? now.getHours() : now.getHours() % 12;

  if (hour == 0) {
    hour = 12;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }

  //绘制数字
  ctx.lineWidth = 1;
  ctx.fillStyle = clockd['timeAddColor'];
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = size / 15 + 'px Arial';

  switch (parseInt(clockd['timeAdd'])) {
    case 1:
      ctx.fillText(hour + ':' + min + ':' + sec, x, y);
      break;
    case 2:
      ctx.fillText(hour + ':' + min, x, y);
      break;
    case 3:
      hour = now.getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      ctx.fillText(hour + ':' + min + ':' + sec, x, y);
      break;
    default:
      hour = now.getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      ctx.fillText(hour + ':' + min, x, y);
  }
}

//绘制日期
const dateAdd = (x, y, size, ctx, clockd) => {
  if (!clockd.hasOwnProperty('dateAdd')) {
    return;
  }

  const now = new Date();
  const timeOff = 0;
  now.setTime(now.getTime() + timeOff * 1000);
  let day = now.getDate();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  if ((month) < 10) {
    month = '0' + (month);
  }
  if (day < 10) {
    day = '0' + day;
  }

  ctx.lineWidth = 1;
  ctx.fillStyle = clockd['dateAddColor'];
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = size / 20 + 'px Arial';

  //根据配置样式绘制日期
  switch (parseInt(clockd['dateAdd'])) {
    case 1:
      ctx.fillText(day + '/' + month + '/' + year, x, y);
      break;
    case 2:
      ctx.fillText(month + '/' + day + '/' + year, x, y);
      break;
    case 3:
      day = now.getDay();
      ctx.fillText(dayArr[day], x, y);
      break;
    case 4:
      month = now.getMonth();
      ctx.fillText(monthArr[month] + ' ' + day, x, y);
      break;
    default:
      month = now.getMonth();
      ctx.fillText(day + ' ' + monthArr[month], x, y);
  }
}

