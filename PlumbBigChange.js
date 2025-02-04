function doPost(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Fix List');
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, 30).getDisplayValues()[0]
  var token = 'l741646aXESX4uccfbxufMPFF2ELkMGZv220h3uD65I'
  var shorterUrl = UrlFetchApp.fetch("http://tinyurl.com/api-create.php?url=" + data[29], { muteHttpExceptions: true }).getContentText();
  var msg = "++++++++++++++++ \n\n" + "สถานที่: " + data[1] + '\n\n' + "รายละเอียดสถานที่: " + data[5] + "\n\n" +"ประเภทปัญหา: " + data[15] + '\n\n' + "คําอธิบาย: "+ data[4] + "\n\n"+ "เวลา: " + data[7] +"\n" + "วันที่: " + data[6] + "\n\n" + "ผู้เเจ้ง: " + data[10] + "\n\n" +"ลิงก์รูปภาพ: " + shorterUrl
  var options = {
    method : "post",
    payload : "message=" + msg,
    headers : {"Authorization" : "Bearer " + token}
  };
  var response = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  Logger.log(response.getContentText()); // Log the response content for debugging purposes
}

