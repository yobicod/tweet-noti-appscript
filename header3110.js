// function doPost(e) {
//   var row = e.parameter.row
//   var data = SpreadsheetApp.getActive().getSheetByName('Fix List').getRange(row, 1, 1, 28).getDisplayValues()[0]
//   var token = 'AcBJ2o0cWYB3I4rWLd2VRJEm3RHssRCb8djdoRbiJnf'
//   var shorterUrl = UrlFetchApp.fetch("http://tinyurl.com/api-create.php?url="+data[27]).toString()
//   var msg = "++++++++++++++++ \n\n" + "สถานที่: " + data[1] + '\n\n' + "ประเภทปัญหา: " + data[13] + '\n\n' + "คําอธิบาย: "+ data[3] + "\n\n"+ "เวลา: " + data[6] +"\n" + "วันที่: " + data[5] + "\n\n" + "ค่าต้นทุนวัสดุ: " + data[24] + "\n" + "ค่าต้นทุนเเรงงาน: " + data[25] +"\n\n"+"ลิงก์รูปภาพ: " + shorterUrl
//   var options = {
//     method : "post",
//     payload : "message=" + msg,
//     headers : {"Authorization" : "Bearer " + token}
//   };
//   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
// }

// function testtesteteste() {
//   var data = SpreadsheetApp.getActive().getSheetByName('Fix List').getRange(3, 1, 1, 28).getDisplayValues()[0]
//   var test = UrlFetchApp.fetch("http://tinyurl.com/api-create.php?url="+data[27])
//   console.log(typeof(data[27]), data[27])
//   console.log(test.toString())
// }




