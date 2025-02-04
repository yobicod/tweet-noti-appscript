function doPost(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Fix List');
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, 38).getDisplayValues()[0];
  var token = 'BHNeZ17pjgY0e0DJSOzpr9IEdbpjInUqYrRswx9XeoK';
  var shorterUrl = UrlFetchApp.fetch("http://tinyurl.com/api-create.php?url=" + data[29], { muteHttpExceptions: true }).getContentText();
  var problem = "";

  if (data[34] != "") {
    problem = data[34];
  } else if (data[35] != "") {
    problem = data[35];
  } else if (data[36] != "") {
    problem = data[36];
  } else if (data[37] != "") {
    problem = data[37];
  }

  var msg =
    "++++++++++++++++ \n\n" +
    "สถานที่: " + data[1] + '\n\n' +
    "รายละเอียดสถานที่: " + data[5] + "\n\n" +
    "ประเภทปัญหา: " + data[15] + "\n\n" +
    "การดำเนินการ: " + problem + '\n\n' +
    "คำอธิบาย: " + data[4] + "\n\n" +
    "เวลา: " + data[7] + "\n" +
    "วันที่: " + data[6] + "\n\n" +
    "ลิงก์รูปภาพ: " + shorterUrl;

  var options = {
    method: "post",
    payload: { "message": msg },
    headers: { "Authorization": "Bearer " + token }
  };

  var response = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  Logger.log(response.getContentText()); // Log the response content for debugging purposes
}

// function doPost(e) {
//   var row = e.parameter.row
//   var data = SpreadsheetApp.getActive().getSheetByName('Fix List').getRange(row, 1, 1, 38).getDisplayValues()[0]
//   var token = 'BHNeZ17pjgY0e0DJSOzpr9IEdbpjInUqYrRswx9XeoK'
//   // var shorterUrl = UrlFetchApp.fetch("http://tinyurl.com/api-create.php?url="+data[29]).toString()
//   var problem = ""

//   if(data[34] != "") {
//     problem = data[34];
//   } else if(data[35] != "") {
//     problem = data[35];
//   } else if(data[36] != "") {
//     problem = data[36];
//   } else if (data[37] != "") {
//     problem = data[37]
//   }

//   var msg = "++++++++++++++++ \n\n" + "สถานที่: " + data[1] + '\n\n' + "รายละเอียดสถานที่: " + data[5] + "\n\n" + "ประเภทปัญหา: " + data[15] + "\n\n"+"การดําเนินการ: " + problem + '\n\n' + "คําอธิบาย: "+ data[4] + "\n\n"+ "เวลา: " + data[7] +"\n" + "วันที่: " + data[6] + "\n\n" +"ลิงก์รูปภาพ: " + data[29]
//   var options = {
//     method : "post",
//     payload : "message=" + msg,
//     headers : {"Authorization" : "Bearer " + token},
//     muteHttpExceptions: true // Add this option to see the full response

//   };
//   var response = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
//   Logger.log(response.getContentText()); // Log the response for debugging purposes
// }

// function tester9() {
//   var data = SpreadsheetApp.getActive().getSheetByName('Fix List').getRange(60, 1, 1, 37).getDisplayValues()[0]
//   if(data[35] != "") {
//     console.log("Found")
//   } else {
//     console.log("Not Found")
//   }
//   console.log(data[35] + "")
// }