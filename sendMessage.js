// Load env
const scriptProperties = PropertiesService.getScriptProperties();

const CHANNEL_ACCESS_TOKEN = scriptProperties.getProperty(
  "CHANNEL_ACCESS_TOKEN"
);
const LINE_MESSAGING_BASE_URL = scriptProperties.getProperty(
  "LINE_MESSAGING_BASE_URL"
);
const SOURCE = "LINE";

const groupId = {
  aircon: scriptProperties.getProperty("AIT_CONDITIO_GROUP_ID"),
};

const GROUP_ID = {
  aircon: scriptProperties.getProperty("AIR_CONDITION_GROUP_ID"),
  civil: scriptProperties.getProperty("CIVIL_GROUP_ID"),
  dev: scriptProperties.getProperty("DEV_GROUP_ID") || "not found",
  elec: scriptProperties.getProperty("ELECTRIC_GROUP_ID"),
  kdmc: scriptProperties.getProperty("KDMC_GROUP_ID"),
  plumber: scriptProperties.getProperty("PLUMBER_GROUP_ID"),
};

const PROBLEM_TYPE = {
  aircon: "อาคารสถานที่ - ปรับอากาศ",
  civil: "อาคารสถานที่ - วัสดุ + ครุภัณฑ์",
  elec: "อาคารสถานที่ - ไฟฟ้า + โทรศัพท์",
  kdmc: "ศูนย์ KDMC - คอมพิวเตอร์เเละอุปกรณ์ต่อพ่วง",
  plumber: "อาคารสถานที่ - ประปา + สุขภัณฑ์",
};

function handleEvent(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Fix List");
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(lastRow, 1, 1, 30).getDisplayValues()[0];
  const shorterUrl = UrlFetchApp.fetch(
    "http://tinyurl.com/api-create.php?url=" + data[29],
    { muteHttpExceptions: true }
  ).getContentText();

  const date = data[6];
  const description = data[4];
  const place = data[1];
  const placeDescription = data[5];
  const problemType = data[15];
  const reporter = data[10];
  const time = data[7];

  let message = "";
  if (problemType === PROBLEM_TYPE.kdmc) {
    const kmdcProblem1 = data[34];
    const kmdcProblem2 = data[35];
    const kmdcProblem3 = data[36];
    const kmdcProblem4 = data[37];
    let operation =
      kmdcProblem1 !== ""
        ? kmdcProblem1
        : kmdcProblem2 !== ""
        ? kmdcProblem2
        : kmdcProblem3 !== ""
        ? kmdcProblem3
        : kmdcProblem4 !== ""
        ? kmdcProblem4
        : "Not found";

    message =
      "++++++++++++++++ \n\n" +
      "สถานที่: " +
      place +
      "\n\n" +
      "รายละเอียดสถานที่: " +
      placeDescription +
      "\n\n" +
      "ประเภทปัญหา: " +
      problemType +
      "\n\n" +
      "การดำเนินการ: " +
      operation +
      "\n\n" +
      "คำอธิบาย: " +
      description +
      "\n\n" +
      "เวลา: " +
      time +
      "\n" +
      "วันที่: " +
      date +
      "\n\n" +
      "ลิงก์รูปภาพ: " +
      shorterUrl;
  } else {
    message =
      "++++++++++++++++ \n\n" +
      "สถานที่: " +
      place +
      "\n\n" +
      "รายละเอียดสถานที่: " +
      placeDescription +
      "\n\n" +
      "ประเภทปัญหา: " +
      problemType +
      "\n\n" +
      "คําอธิบาย: " +
      description +
      "\n\n" +
      "เวลา: " +
      time +
      "\n" +
      "วันที่: " +
      date +
      "\n\n" +
      "ผู้เเจ้ง: " +
      reporter +
      "\n\n" +
      "ลิงก์รูปภาพ: " +
      shorterUrl;
  }

  sendLineMessagingApi("สวัสดีชาวโลก", "dev");

  // DEV
  // const problemType = data[15];
  // sendLineMessagingApi(message, problemType);
}

// Send message Line OA using groupId or userId

function sendLineMessagingApi(text, target) {
  const url = `${LINE_MESSAGING_BASE_URL}/v2/bot/message/push`;
  const channelAccessToken = CHANNEL_ACCESS_TOKEN;
  const payload = {
    to: mapTarget(target), // Group id, User id
    messages: [
      {
        type: "text",
        text: text,
      },
    ],
  };

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + channelAccessToken,
    },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

// Mapped groupId
function mapTarget(target) {
  if (target === PROBLEM_TYPE.aircon) {
    return GROUP_ID.aircon;
  } else if (target === PROBLEM_TYPE.civil) {
    return GROUP_ID.civil;
  } else if (target === PROBLEM_TYPE.elec) {
    return GROUP_ID.elec;
  } else if (target === PROBLEM_TYPE.plumber) {
    return GROUP_ID.plumber;
  } else if (target === PROBLEM_TYPE.kdmc) {
    return GROUP_ID.kdmc;
  } else {
    return GROUP_ID.dev;
  }
}
