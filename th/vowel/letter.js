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
  ก: "⠛",
  ข: "⠅",
  ฃ: "⠴⠅",
  ค: "⠥",
  ฅ: "⠤⠥",
  ฆ: "⠠⠥",
  ง: "⠻",
  จ: "⠚",
  ฉ: "⠌",
  ช: "⠬",
  ซ: "⠮",
  ฌ: "⠠⠬",
  ญ: "⠠⠽",
  ฎ: "⠠⠙",
  ฏ: "⠠⠳",
  ฐ: "⠠⠞",
  ฑ: "⠠⠾",
  ฒ: "⠤⠾",
  ณ: "⠠⠝",
  ด: "⠙",
  ต: "⠳",
  ถ: "⠞",
  ท: "⠾",
  ธ: "⠴⠾",
  น: "⠝",
  บ: "⠧",
  ป: "⠯",
  ผ: "⠏",
  ฝ: "⠭",
  พ: "⠹",
  ฟ: "⠫",
  ภ: "⠠⠹",
  ม: "⠍",
  ย: "⠽",
  ร: "⠗",
  ล: "⠇",
  ว: "⠺",
  ศ: "⠠⠎",
  ษ: "⠤⠎",
  ส: "⠎",
  ห: "⠓",
  ฬ: "⠠⠇",
  อ: "⠕",
  ฮ: "⠿",
};

const b2n = {
"⠛": "1245",
"⠅": "13",
"⠴⠅": "35613",
"⠥": "136",
"⠤⠥": "36136",
"⠠⠥": "6136",
"⠻": "12456",
"⠚": "245",
"⠌": "34",
"⠬": "346",
"⠮": "2346",
"⠠⠬": "6346",
"⠠⠽": "613456",
"⠠⠙": "6145",
"⠠⠳": "61256",
"⠠⠞": "62345",
"⠠⠾": "623456",
"⠤⠾": "3623456",
"⠠⠝": "61345",
"⠙": "145",
"⠳": "1256",
"⠞": "2345",
"⠾": "23456",
"⠴⠾": "35623456",
"⠝": "1345",
"⠧": "1236",
"⠯": "12346",
"⠏": "1234",
"⠭": "1346",
"⠹": "1456",
"⠫": "1246",
"⠠⠹": "61456",
"⠍": "134",
"⠽": "13456",
"⠗": "1235",
"⠇": "123",
"⠺": "2456",
"⠠⠎": "6234",
"⠤⠎": "36234",
"⠎": "234",
"⠓": "125",
"⠠⠇": "6123",
"⠕": "135",
"⠿": "123456",
};

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
  const a = "กขคงจฉชซดตถทนบปผฝพฟมยรลวสหอ";
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
      updateScore(3);
      openYes();
      // document.querySelector(".r").innerText = "Yess";
      return;
    }
  }

  console.log("No");
  openNo();
  // document.querySelector(".r").innerText =
  //   "Non ! La réponse est" + String(l2b[target.innerText.toUpperCase()]);
});

newLetter();

function updateScore(nb) {
  if (nb) {
    score += nb;
  }
  console.log("BOOM SCORE UP", score);

  document.querySelector(".score").innerText = score;
  document.querySelector(".scoreno").innerText = score;
  document.querySelector(".scoreui").innerText = score;
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

/**
 * TRANSLATE (index.html)
 */
// let trans = document.querySelector("#translate");

// trans.addEventListener("input", () => {
//   console.log(trans);
//   for (let letter of trans.value) {
//     if (b2n.keys().includes(letter)) {
//       console.log("B !!!");
//     }
//   }
// });

async function ah() {
  // 20 - 350
  const response = await fetch("https://api.quotable.io/random?maxLength=20");
  const ahh = await response.json();
  console.log(ahh.content);
}

ah();
