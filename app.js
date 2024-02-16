//JSON Data
const companies = require("./data/Companies.json");
const guests = require("./data/Guests.json");
const messages = require("./data/Messages.json");
//Packages
const parse = require("json-templates");
const prompt = require("prompt");

//Goal: render message based on state variables
//state variables
let companyId = 1;
let guestId = 2;
// Time dependent variables
let greeting = "Hi";
// get time from timestamp
const arrivalTimeStamp = guests[guestId - 1].reservation.startTimestamp;
const dateTime = new Date(arrivalTimeStamp);
//adjust for local time to company
const timeZone = {
  timeZone: companies[companyId - 1].timezone,
  timeZoneName: "long",
};
const arrivalTime = dateTime.toLocaleTimeString("en-US", timeZone);
// determine greeting and meal based on time
let currentTime = arrivalTime;

const hour = parseInt(currentTime);
if (currentTime.includes("AM")) {
  greeting = "Good morning";
} else if (currentTime.includes("PM") && hour > 6) {
  greeting = "Good evening";
} else {
  greeting = "Good afternoon";
}

// compile all relavent information into one object
const reservationInfo = {
  company: companies[companyId - 1].company,
  city: companies[companyId - 1].city,
  firstName: guests[guestId - 1].firstName,
  lastName: guests[guestId - 1].lastName,
  roomNumber: guests[guestId - 1].reservation.roomNumber,
  arrivalTime: arrivalTime,
  greeting: greeting,
};
// submit object into template
// render message
prompt.start();
console.log(
  "Choose what kind of message you'd like to send your guest, (1) room is ready, (2) welcome to the city, (3) room is not ready, (4) food recommendations, or (5) custom"
);
prompt.get(["messageNo"], function (err, result) {
  if (parseInt(result.messageNo) < 5) {
    const messageTemplate = parse(messages[result.messageNo - 1].message);
    console.log(messageTemplate(reservationInfo));
  } else {
    console.log(
      `Write your message to ${reservationInfo.firstName} ${reservationInfo.lastName} in room ${reservationInfo.roomNumber} at ${reservationInfo.company}`
    );
    prompt.get(["message"], function (err, result) {
      console.log(result.message);
    });
  }
});
