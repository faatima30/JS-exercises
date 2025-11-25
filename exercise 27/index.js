function learnPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("working");
      } else {
        reject("not working");
      }
    }, 2000);
  });
}
learnPromise()
  .then((result) => console.log("the function is ", result))
  .then((error) => console.log("the function is not ", error));
