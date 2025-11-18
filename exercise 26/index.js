// Blocking Example
function blockingMessage() {
    alert("Blocking for 2 seconds...");
    return "Blocking done";
}

console.log("Start blocking example");
const blockMsg = blockingMessage();
console.log(blockMsg);
console.log("End blocking example");

// Non-Blocking Example
function nonBlockingMessage(callback) {
    setTimeout(() => callback("Non-blocking done"), 2000);
}

console.log("Start non-blocking example");
nonBlockingMessage(msg => console.log(msg));
console.log("End non-blocking example");
