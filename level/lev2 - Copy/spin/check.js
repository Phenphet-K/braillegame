// ไฟล์ .js เพื่อทำการตรวจสอบการกดปุ่ม spin

// กำหนดตัวแปร
let lastSpinTime = null;

// ฟังก์ชันตรวจสอบการกดปุ่ม spin
function checkSpin() {
  // ตรวจสอบว่าเวลาปัจจุบันห่างจากเวลากดปุ่ม spin ก่อนหน้าน้อยกว่า 24 ชั่วโมงหรือไม่
  if (lastSpinTime && (new Date() - lastSpinTime) < (24 * 60 * 60 * 1000)) {
    // แสดงข้อความแจ้งให้รอ
    alert("กรุณารอ 24 ชั่วโมงก่อนกดปุ่ม spin อีกครั้ง");
    return false;
  }

  // บันทึกเวลากดปุ่ม spin
  lastSpinTime = new Date();

  // อนุญาตให้กดปุ่ม spin ได้
  return true;
}

// เรียกใช้ฟังก์ชันตรวจสอบการกดปุ่ม spin
let result = checkSpin();

// แสดงผลลัพธ์
if (result) {
  // กดปุ่ม spin ได้
  alert("สามารถกดปุ่ม spin ได้");
} else {
  // ห้ามกดปุ่ม spin
  alert("กรุณารอ 24 ชั่วโมงก่อนกดปุ่ม spin อีกครั้ง");
}
