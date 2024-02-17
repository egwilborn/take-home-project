## Introduction

Take a look at my message generator. If you input a company, guest, and message type, you'll get a quick message you can send to your guest to check in with their experience.

## Instructions

How to run program using Node.js

1. Clone take-home-project repository to local environment
2. Run "npm install" to install program dependencies
3. Run "node app.js" in your terminal
4. Follow the prompts!

## Design Decisions

Overall, my goal was to make something that is simple for the user and relatively simple to make. For this reason, I tried to follow a model-view-controller design pattern. I also decided to incorporate prompts within the terminal so that the user can easily put in their options and have a message generated. This also simplifies the coding for me so that I can just have one app.js file that retrieves the data, processes that information, and generates the message.

## JavaScript

I decided to write this in JavaScript because this is the language I am most comfortable in when it comes to making simple MVC-type programs. My goal was to make something that meets the requirements but is simple for me and the user. I chose a Node environment so that I can easily test my code each step of the way by executing the file. Node also allowed me to use additional packages as helpful tools for processing.

## Testing

My process for verifying that the program was working as I was building it was to divide the project into smaller sections and goals. So first I focused in importing json data correctly, then found a package that could parse json files for variables, then finally worked on incorporating user input with prompts. My current process for testing is to log the result of each function and compare the result to what I'm hoping to see and handling errors along the way.

## What to add?

If I'd had more time, I would have incorporated clearer error messaging. Right now, if the user inputs a letter or word, a javascript error is thrown. I would like to add custom messages to clarify for the user what is needed from them.

In addition, I would like to add a few unit tests to make sure that the inputs are being handled properly and all functions are working as expected.
