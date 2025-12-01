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

async function run() {
  try {
    const result = await learnPromise();
    console.log("The function is", result);
  } catch (error) {
    console.log("The function is not", error);
  }
}

run();
