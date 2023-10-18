let test = async function() {
    let numbers = document.getElementById("numbers");
    const {data} = await axios.get("/users/topTen");
    let orderedData = data.toSorted((a, b) => b.wins-a.wins);
    let clippedData = orderedData.slice(0, 10);
    for(let i = 0; i < clippedData.length; i++) {
        let p = document.createElement("p");
        p.innerHTML = (i + 1) + ". " + clippedData[i].firstName + " " + clippedData[i].lastName + ". Wins: " + clippedData[i].wins;
        numbers.appendChild(p);
    }
}
test();