//JSON Data
const companies = require("./Companies.json");
const guests = require("./Guests.json");
const messages = require("./Messages.json");
//Packages
const parse = require("json-templates");

//testing variables
const greeting = "hi";
const firstName = "hayley";
const company = "Hilton";
const roomNumber = "304";

// using package
const template = parse(messages[0].message);
console.log(
  template({
    greeting: greeting,
    firstName: firstName,
    roomNumber: roomNumber,
    company: company,
  })
);
