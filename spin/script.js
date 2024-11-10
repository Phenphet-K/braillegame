/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 1 },
  { minDegree: 31, maxDegree: 60, value: 2 },
  { minDegree: 0, maxDegree: 30, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 4 },
  { minDegree: 301, maxDegree: 330, value: 5 },
  { minDegree: 271, maxDegree: 300, value: 6 },
  { minDegree: 241, maxDegree: 270, value: 7 },
  { minDegree: 211, maxDegree: 240, value: 8 },
  { minDegree: 181, maxDegree: 210, value: 9 },
  { minDegree: 151, maxDegree: 180, value: 10 },
  { minDegree: 121, maxDegree: 150, value: 11 },
  { minDegree: 91, maxDegree: 120, value: 12 },
  
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      switch (i.value) {
        case 1:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 1 <br><h3>ขนม</h3></p>";
          playWinSound(winsoundcase01);
          break;
        case 2:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 2 <br><h3>นม</h3></p>";
          playWinSound(winsoundcase02);
          break; 
        case 3:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 3 <br><h3>น้ำหวาน</h3></p>";
          playWinSound(winsoundcase03);
          break;
        case 4:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 4 <br><h3>เสียใจด้วยคุณไม่ได้รางวัล</h3></p>";
          playWinSound(winsoundcase04);
          break;
        case 5:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 5 <br><h3>เค้ก</h3></p>";
          playWinSound(winsoundcase05);
          break;
        case 6:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 6 <br><h3>ปีโป้</h3></p>";
          playWinSound(winsoundcase06);
          break;
        case 7:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 7 <br><h3>ลูกอม</h3></p>";
          playWinSound(winsoundcase07);
          break;
        case 8:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 8 <br><h3>เยลลี่</h3></p>";
          playWinSound(winsoundcase08);
          break;
        case 9:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 9 <br><h3>ขนมปี้บ</h3></p>";
          playWinSound(winsoundcase09);
          break;
        case 10:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 10 <br><h3>ลูกโป่ง</h3></p>";
          playWinSound(winsoundcase10);
          break;
        case 11:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 11 <br><h3>น้ำเปล่า</h3></p>";
          playWinSound(winsoundcase11);
          break;
        case 12:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลเบอร์ 12 <br><h3>ช็อคโกแลต</h3></p>";
          playWinSound(winsoundcase12);
          break;
        default:
          text.innerHTML = "<p>ยินดีด้วย, คุณได้รางวัลอะไรนั้น!</p>";
      }    
        // ปิดการใช้งานปุ่ม spin
        spinBtn.disabled = true;
        
        setTimeout(() => {
        // พาผู้ใช้ไปยังหน้าอื่น
        window.location.href = "../letter.html";
      }, 15000);
      //spinBtn.disabled = true;
      break;
    }
  }
};
function playWinSound(sound) {
  sound.play();
}

/* --------------- Audio Elements --------------------- */
const spinSound = new Audio("../spin/sound/spin.wav");
const tickSound = new Audio("../spin/sound/win.wav");
const winsoundcase01 = new Audio("../spin/sound/case/01.wav")
const winsoundcase02 = new Audio("../spin/sound/case/02.wav")
const winsoundcase03 = new Audio("../spin/sound/case/03.wav")
const winsoundcase04 = new Audio("../spin/sound/case/04.wav")
const winsoundcase05 = new Audio("../spin/sound/case/05.wav")
const winsoundcase06 = new Audio("../spin/sound/case/06.wav")
const winsoundcase07 = new Audio("../spin/sound/case/07.wav")
const winsoundcase08 = new Audio("../spin/sound/case/08.wav")
const winsoundcase09 = new Audio("../spin/sound/case/09.wav")
const winsoundcase10 = new Audio("../spin/sound/case/10.wav")
const winsoundcase11 = new Audio("../spin/sound/case/11.wav")
const winsoundcase12 = new Audio("../spin/sound/case/12.wav")
//const case00 = new Audio("/game.krootoi.com/spin/sound/case/01.wav")

/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = false;
  text.innerHTML = "<p>ขอให้โชคดี!</p>";
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let currentRotation = 0; // เพิ่มตัวแปรเก็บค่ามุมปัจจุบัน
  let rotationInterval = window.setInterval(() => {
    playSpinSound();
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    currentRotation += resultValue; // เพิ่มค่ามุมปัจจุบันตามการหมุน
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      playTickSound();
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
  
  function playSpinSound() {
    // ปรับให้เสียง ticking ตามการหมุน
    if (currentRotation % 20 === 0) {
    spinSound.play();
  }
  }
  function playTickSound() {
    
      tickSound.play();
    }
  
});
/* --------------- End Spin Wheel  --------------------- */