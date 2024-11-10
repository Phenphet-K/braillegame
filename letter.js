const b = document.querySelectorAll(".braille_btn");
const v = document.querySelector(".valid");
const newl = document.querySelector(".new");
const retry = document.querySelector(".retry");
const reveal = document.querySelector(".reveal");
const target = document.querySelector("#target");

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
  "0": "⠴",
  "1": "⠂",
  "2": "⠆",
  "3": "⠒",
  "4": "⠲",
  "5": "⠢",
  "6": "⠖",
  "7": "⠶",
  "8": "⠦",
  "9": "⠔",
  A: "⠁",
  B: "⠃",
  C: "⠉",
  D: "⠙",
  E: "⠑",
  F: "⠋",
  G: "⠛",
  H: "⠓",
  I: "⠊",
  J: "⠚",
  K: "⠅",
  L: "⠇",
  M: "⠍",
  N: "⠝",
  O: "⠕",
  P: "⠏",
  Q: "⠟",
  R: "⠗",
  S: "⠎",
  T: "⠞",
  U: "⠥",
  V: "⠧",
  W: "⠺",
  X: "⠭",
  Z: "⠵",
  "]": "⠻",
  "#": "⠼",
  Y: "⠽",
  ")": "⠾",
  "=": "⠿"
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
  const a = "abcdefghijklmnopqrstuvwxyz";
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
      // หน่วงเวลา 0.5 วินาที แล้วไปยังคำถามถัดไป
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

function updateScore(nb = 0) {
  if (nb) {
    score += nb;
  }

  document.querySelector(".score").innerText = score;
  document.querySelector(".scoreno").innerText = score;
  document.querySelector(".scoreui").innerText = score;

  if (score >= 26) {
    // แสดงกล่องแจ้งเตือน
    const userConfirmed = window.confirm("ยินดีด้วยคุณผ่านด่านแล้ว คุณต้องการไปที่ด่านถัดไปหรือไม่?");

    if (userConfirmed) {
      // ทำการเปลี่ยนหน้าหรือทำการนำผู้เล่นไปยังหน้าถัดไป
      window.location.href ="https://krootoi.rf.gd/braillegame/number/number.html"; // เปลี่ยน "หน้าถัดไป.html" เป็น URL หน้าถัดไปที่คุณต้องการ
    }
  }
}

document.querySelector(".anew").addEventListener("click", () => {
  newLetter();
  close();
});

updateScore();
console.log(12);

async function ah() {
  // 20 - 350
  const response = await fetch("https://api.quotable.io/random?maxLength=20");
  const ahh = await response.json();
  console.log(ahh.content);
}

ah();
