let b = document.querySelectorAll(".braille_btn");
let v = document.querySelector(".valid");
let newl = document.querySelector(".new");
let retry = document.querySelector(".retry");
let reveal = document.querySelector(".reveal");
let target = document.querySelector("#target");

let score = 0;

const yes = document.querySelector(".yes");
const no = document.querySelector(".no");
const ans = document.querySelector(".ans");
const bg = document.querySelector(".modal_bg");
function openYes() {
  yes.style.visibility = "visible";
  bg.style.visibility = "visible";
}

function openNo() {
  no.style.visibility = "visible";
  bg.style.visibility = "visible";
}

function openAnswer() {
  ans.style.visibility = "visible";
  bg.style.visibility = "visible";
}

function close() {
  yes.style.visibility = "hidden";
  no.style.visibility = "hidden";
  bg.style.visibility = "hidden";
  ans.style.visibility = "hidden";
  for (const elt of b) {
    elt.classList.toggle("dot", false);
  }
}

const l2b = {
  1: "⠁",
  2: "⠃",
  3: "⠉",
  4: "⠙",
  5: "⠑",
  6: "⠋",
  7: "⠛",
  8: "⠓",
  9: "⠊",
  0: "⠚",
  number: "⠼",
  ".": "⠻",
  ",": "⠔",
  ";": "⠔",
  "!": "⠔",
  "?": "⠔",
  "%": "⠔",
  ":": "⠔",
  "<": "⠔",
  ">": "⠔",
  "=": "⠔",
  "-": "⠔",
  "+": "⠔",
  "@": "⠔",
  "_": "⠔",
  
};

const b2n = {
  "⠴": "245",
  "⠂": "2",
  "⠆": "23",
  "⠒": "25",
  "⠲": "256",
  "⠢": "26",
  "⠖": "235",
  "⠶": "2356",
  "⠦": "236",
  "⠔": "35",
  "⠁": "1",
  "⠃": "12",
  "⠉": "14",
  "⠙": "145",
  "⠑": "15",
  "⠋": "124",
  "⠛": "1245",
  "⠓": "125",
  "⠊": "24",
  "⠚": "245",
  "⠅": "13",
  "⠇": "123",
  "⠍": "134",
  "⠝": "1345",
  "⠕": "135",
  "⠏": "1234",
  "⠟": "12345",
  "⠗": "1235",
  "⠎": "234",
  "⠞": "2345",
  "⠥": "136",
  "⠧": "1236",
  "⠺": "2456",
  "⠭": "1346",
  "⠽": "13456",
  "⠵": "1356"
};

/*------------------ function countdown ----------------------- */

document.addEventListener('DOMContentLoaded', function () {
  let timer;
  let countdown = 15;

  function startCountdown() {
    clearInterval(timer); // ให้ตั้งค่าเวลาเป็น 15 ทุกครั้งที่เริ่มนับถอยหลังใหม่
    timer = setInterval(function () {
      countdown--;
      if (countdown < 0) {
        clearInterval(timer);
        endGame();
      }
      document.querySelector('.time-display').innerText = countdown;
    }, 1000);
  }

  function resetGame() {
    resetTimer();
    resetScore();
  }

  function resetScore() {
    // รีเซ็ตคะแนนของคุณ (ถ้ามี)
  }

  function startTimer() {
    startCountdown();
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function endGame() {
    stopTimer();
    setTimeout(function () {
      resetGame();
      startTimer();
      window.location.href = "https://krootoi.rf.gd/braillegame/level/lev1/number/number.html";
    }, 5000);
  }

  function resetTimer() {
    countdown = 15;
    document.querySelector('.time-display').innerText = countdown;
  }

  document.querySelector('.ui_btn.valid').addEventListener('click', function () {
    resetGame();
    startTimer();
  });

  // เริ่มต้นนับถอยหลังเมื่อหน้า HTML โหลดเสร็จ
  startTimer();
});


/*------------------End of function countdown ------------------ */

function playCorrectSound() {
  const correctSound = document.getElementById('correctSound');
  correctSound.play();
}

function playIncorrectSound() {
  const incorrectSound = document.getElementById('incorrectSound');
  incorrectSound.play();
}

function inverse(obj) {
  var retobj = {};
  for (var key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}

const n2b = inverse(b2n);
const b2l = inverse(l2b);

let wrongAnswers = [];
let currentAlphabetIndex = 0;

function newLetter() {
  const a = "0123456789";
  target.innerText = a[currentAlphabetIndex];
  currentAlphabetIndex = (currentAlphabetIndex + 1) % a.length;
  console.log(target.innerText);
  close();
}

newl.addEventListener("click", () => {
  newLetter();
});

for (let i = 0; i < b.length; i++) {
  b[i].addEventListener("click", () => {
    b[i].classList.toggle("dot");
  });
  b[i].braille = i + 1;
}

v.addEventListener("click", () => {
  let code = "";
  for (const i of b) {
    if (i.classList[1] === "dot") {
      code += i.braille.toString();
      // console.log(i.braille);
    }
  }
  console.log("->", code, n2b[code], b2l[n2b[code]]);
  if (b2l[n2b[code]]) {
    if (b2l[n2b[code]].toLowerCase() === target.innerText) {
      console.log("Yes");
      playCorrectSound();  // เล่นเสียงเมื่อถูก
      updateScore(1);
      openYes();
      //return;
      // หน่วงเวลา 1 วินาที แล้วไปยังคำถามถัดไป
      setTimeout(() => {
        newLetter();
        target.focus(); // ตั้งโฟกัสที่ Element ที่ต้องการ
        //close();
      }, 500);

    } else {
      console.log("No");
      playIncorrectSound();  // เล่นเสียงเมื่อผิด
      updateScore(0);
      openNo();
      newLetter();
      target.focus(); // ตั้งโฟกัสที่ Element ที่ต้องการ
      //return;

    }
  }
});

newLetter();

function customConfirm(message, callback) {
  const confirmation = document.createElement("div");
  confirmation.className = "confirmation";
  confirmation.innerHTML = `
    <div class="message">${message}</div>
    <button class="confirm">ตกลง</button>
    <button class="cancel">ยกเลิก</button>
  `;

  document.body.appendChild(confirmation);

  const confirmButton = confirmation.querySelector(".confirm");
  const cancelButton = confirmation.querySelector(".cancel");

  confirmButton.addEventListener("click", () => {
    document.body.removeChild(confirmation);
    callback(true);
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(confirmation);
    callback(false);
  });
}

function updateScore(nb) {
  if (nb) {
    score += nb;
  }

  document.querySelector(".score").innerText = score;
  document.querySelector(".scoreno").innerText = score;
  document.querySelector(".scoreui").innerText = score;

  if (score > 10) {
    // แสดงกล่องแจ้งเตือน
    const userConfirmed = window.confirm("ยินดีด้วยคุณผ่านด่านแล้ว คุณต้องการไปยังหน้าหมุนกงล้อเพื่อเสียงโชคหรือไม่?");
    
    if (userConfirmed) {
      // ทำการเปลี่ยนหน้าหรือทำการนำผู้เล่นไปยังหน้าถัดไป
      window.location.href = "https://krootoi.rf.gd/braiilegame/spin/index.html"; // เปลี่ยน "หน้าถัดไป.html" เป็น URL หน้าถัดไปที่คุณต้องการ
    }
  }
}

document.querySelector(".anew").addEventListener("click", () => {
  newLetter();
  close();
});

updateScore();
console.log(12);

retry.addEventListener("click", () => {
  updateScore(-1);
  close();
});

reveal.addEventListener("click", () => {
  updateScore(-2);
  close();
  document.querySelector(".answer").innerText =
    l2b[target.innerText.toUpperCase()];
  openAnswer();
});

async function ah() {
  // 20 - 350
  const response = await fetch("https://api.quotable.io/random?maxLength=20");
  const ahh = await response.json();
  console.log(ahh.content);
}

ah();
