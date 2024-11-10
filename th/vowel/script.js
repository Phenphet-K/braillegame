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

/**
 * TRANSLATE (index.html)
 */
const trans = document.querySelector("#translate");

const alphabet = /[ก-ฮ]/;
const braille = /[\0E01-\0E55]/;

trans.addEventListener("input", (e) => {
  let translation = "";
  const val = document.querySelector("#translate").value;

  if (val.match(alphabet) != null && val.match(braille) != null) {
    console.log("bordel");
    return;
  }

  if (val.match(alphabet) != null) {
    console.log("lettre");
    for (const letter of val) {
      if (letter === " ") {
        translation += " ";
      } else {
        console.log(l2b[letter.toUpperCase()], letter);
        translation += l2b[letter.toUpperCase()];
      }
    }
    document.querySelector("#translated").innerText = translation;
  }
  if (val.match(braille) != null) {
    console.log("braille");

    for (const letter of val) {
      console.log(b2l[letter]);
      translation += b2l[letter];
    }
  }
});
