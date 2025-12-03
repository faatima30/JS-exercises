async function fetchData() {
    console.log("fetching data....")
    const data=await fetch("https://jsonplaceholder.typicode.com/users")
    const result=await data.json()
    console.log(result)
}
fetchData();