//This code is in .gs, Google AppScript's programming language.
//Enter your BotFather telegram bot token ID in the "" below, ensure you do not share this information with anyone!
var token = "";
//Enter your Google SpreadSheet ID in the "" below
// Get this from the sheet url between "https://docs.google.com/spreadsheets/d/" and "/edit#gid=0"
var SheetID = "";

//This checks for inputs from the Telegram chat and responds accordingly
function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);
 
    if(updates.message.text){
      sendText(updates.message.chat.id,SearchFromSheet(updates.message.text)); 
    }
}

//This creates the object
function GetSheet1(){
  var rangeName = 'Sheet1!A2:C';
  var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
  return rows;
}

//You can use this for another sheet in the same spreadsheet document
function GetSheet2(){
  var rangeName = 'Sheet2!A2:C';
  var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
  return rows;
}

/*This creates the main output, comparing either row one or two of your sheet to your input in telegram and outputting the information from rows 1,2, and 3 to the same
telegram chatbot */
function SearchFromSheet(IDitem){
  var dataitem = GetSheet1(); 
  for (var row = 0; row < dataitem.length; row++) {
    if(dataitem[row][0]==IDitem || dataitem[row][1]== IDitem){ 
      return  "Serial number : " + dataitem[row][0] + "\n" +
              "Name : " + dataitem[row][1] + "\n" +
             "Image : " + dataitem[row][2] + "\n" ;
             
    }
  }
  
//Again, same thing if you want to expand to another sheet
  var dataitem = GetSheet2(); 
  for (var row = 0; row < dataitem.length; row++) {
    if(dataitem[row][0]==IDitem){ 
      return "Serial number : " +dataitem[row][0] + "\n" +
              "Name : " + dataitem[row][1] + "\n" +
             "Quantity : " + dataitem[row][2] + "\n" + 
             "Image  : " + dataitem[row][3];
    }
// For some reason I don't know why I can't get this  Item not found work, please feel free to tell me why
    else {
      return "Error 404." +"\n"+ "Item not found.";
    }
  }
  return "Error 404." +"\n"+ "Item not found.";
}

//This is the syntax for parsing the JSON file from Google AppScript to Telegram
function sendText(chatid,text,replymarkup){
var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
