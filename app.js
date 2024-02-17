//JSON Data
const companies = require("./data/Companies.json");
const guests = require("./data/Guests.json");
const messages = require("./data/Messages.json");
//Packages
const parse = require("json-templates");
const prompt = require("prompt");

//----- Goal: render message based on state variables defined by input from user -----//
//prompt input for company, guest, and message using prompt package
prompt.start();
console.log(
  `Please input the id number of the hotel (# 1-${companies.length}) and guest (# 1-${guests.length}) you would like to contact. Then decide which of the following messages you would like to send: (1) Room is ready, (2) Welcome to the city, (3) Room is not ready, (4) Food recommendations, (5) Custom message`
);
prompt.get(["companyId", "guestId", "messageId"], function (err, result) {
  if (err) console.log("prompt error:", err);
  //state variables
  const companyId = result.companyId;
  const guestId = result.guestId;
  const messageId = result.messageId;
  // ----- now need to determine time for greeting ----- //
  let greeting = "Hi"; // the default greeting

  // get time from timestamp
  const currentTimeStamp = new Date();
  //adjust for local time to company
  const timeZone = {
    timeZone: companies[companyId - 1].timezone,
    timeZoneName: "long",
  };
  const currentTime = currentTimeStamp.toLocaleTimeString("en-US", timeZone);

  // determine greeting based on time
  const hour = parseInt(currentTime);
  if (currentTime.includes("AM")) {
    greeting = "Good morning";
  } else if (currentTime.includes("PM") && hour >= 6) {
    greeting = "Good evening";
  } else {
    greeting = "Good afternoon";
  }

  // ------ compile all relavent information into one object ------ //
  const reservationInfo = {
    company: companies[companyId - 1].company,
    city: companies[companyId - 1].city,
    firstName: guests[guestId - 1].firstName,
    lastName: guests[guestId - 1].lastName,
    roomNumber: guests[guestId - 1].reservation.roomNumber,
    currentTime: currentTime,
    greeting: greeting,
  };
  // ----- Render Message or Ask for Input for Custom Message ---- //
  if (parseInt(messageId) < 5) {
    const messageTemplate = parse(messages[messageId - 1].message);
    console.log(messageTemplate(reservationInfo));
  } else {
    // provide user with guest and company info
    console.log(
      `Write your message to ${reservationInfo.firstName} ${reservationInfo.lastName} in room ${reservationInfo.roomNumber} at ${reservationInfo.company}`
    );
    // provide user with input for custom message
    prompt.get(["message"], function (err, result) {
      if (err) console.log("prompt error:", err);
      // log that message back for them
      console.log(result.message);
    });
  }
});
