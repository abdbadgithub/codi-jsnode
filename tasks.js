/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
  console.log("type help to know the commands");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
//var arraydata = [1, 2, 3];
const fs = require("fs");
var object = [
  {
    name: 1,
    done: false,
  },
  {
    name: 2,
    done: true,
  },
];

function onDataReceived(text) {
  let input = text.trim().replace("\n", "").split(" ");

  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (
    text === "hello\n" ||
    text.trim().replace("\n", "").split(" ")[0] === "hello"
  ) {
    hello(text);
  } else if (text === "help\n") {
    help();
  } else if (text === "add\n") {
    console.log("error please insert a value");
  } else if (input[0] === "add" && input[1] != null) {
    add(input[1], object);
    displayobject(object);
  } else if (text === "remove\n") {
    object.pop();
    displayobject(object);
  } else if (input[0] === "remove" && input[1] != null) {
    remove(object, input[1]);
    displayobject(object);
  } else if (text === "edit\n") {
    console.log("please insert a value to edit");
  } else if (input[0] === "edit" && input[1] != null && input[2] == null) {
    edit(object, input[1]);
    displayobject(object);
  } else if (input[0] === "edit" && input[1] != null && input[2] != null) {
    editwithnumber(object, input[1], input[2]);
    displayobject(object);
  } else if (text === "list\n") {
    displayobject(object);
  } else if (text === "check\n") {
    console.log("error please enter a number to check");
  } else if (input[0] === "check" && input[1] != null) {
    check(object, input[1]);
    displayobject(object);
  } else if (text === "uncheck\n") {
    console.log("error please enter a number to check");
  } else if (input[0] === "uncheck" && input[1] != null) {
    uncheck(object, input[1]);
    displayobject(object);
  } else if (
    input[0] === "node" &&
    input[1] === "tasks.js" &&
    input[2] === null
  ) {
    save();
    load();
  } else if (
    input[0] === "node" &&
    input[1] === "tasks.js" &&
    input[2] != null
  ) {
    savewithfilename(input[2]);
    loadwithfilename(input[2]);
    console.log("filename");
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  console.log(text.replace("\n", "") + "!");
}
function add(element, arraydata) {
  arraydata.push({ name: element, done: false });
  //arraydata.name.push(element);
  //arraydata.done.push(false);
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}
function help() {
  console.log("the commands are \nhello \nexit \nquit\nlist\nadd\nremove");
}
function remove(arraydata, input) {
  arraydata.splice(input - 1, 1);
}
function edit(arraydata, input) {
  arraydata.pop();
  arraydata.push({ name: input, done: false });
}
function editwithnumber(arraydata, index, input) {
  arraydata.splice(index - 1, 1, { name: input, done: false });
}
function check(object, input) {
  object[input - 1].done = true;
}
function uncheck(object, input) {
  object[input - 1].done = false;
}
function displayobject(object) {
  for (let i = 0; i < object.length; i++) {
    if (object[i].done === true) {
      console.log("[✓] " + object[i].name);
    } else {
      console.log("[ ] " + object[i].name);
    }
  }
}
function save() {
  var jsondata = JSON.stringify(object);
  try {
    fs.writeFileSync("database.json", jsondata);
    console.log("JSON data is saved.");
  } catch (error) {
    console.error(err);
  }
}
function load() {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    // parse JSON object
    object = JSON.parse(data.toString());

    // print JSON object
  });
}
function savewithfilename(input) {
  var jsondata = JSON.stringify(object);
  try {
    fs.writeFileSync(input, jsondata);
    console.log("JSON data is saved.");
  } catch (error) {
    console.error(err);
  }
}
function loadwithfilename(input) {
  fs.readFile(input, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    // parse JSON object
    object = JSON.parse(data.toString());

    // print JSON object
  });
}

// The following line starts the application
startApp("Abdallah badra");
