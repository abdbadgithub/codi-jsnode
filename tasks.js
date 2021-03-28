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
var arraydata = [1, 2, 3];
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
    add(input[1], arraydata);
  } else if (text === "remove\n") {
    arraydata.pop();
  } else if (input[0] === "remove" && input[1] != null) {
    remove(arraydata, input[1]);
  } else if (text === "list\n") {
    console.log(arraydata);
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
  arraydata.push(element);
  console.log(element + " is added");
  console.log(arraydata);
}
function display(tasks) {
  console.log(tasks);
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
  if (input < arraydata.length) {
    arraydata.splice(input - 1, 1);
  }
}

// The following line starts the application
startApp("Abdallah badra");
