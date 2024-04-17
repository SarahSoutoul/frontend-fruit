const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

fruitForm.addEventListener("submit", extractFruit);

let cal = 0;

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = ""
}

// function fetchFruitData(fruit){
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(processResponse)
//         .then(data => addFruit(data))
//         .catch((e) => console.log(e));
// }

async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruity-api-cxtw.onrender.com/fruits/${fruit}`);

        if (resp.ok) {
            const data = await resp.json();
            addFruit(data);
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (e) {
        console.log(e);
    }
}

function processResponse(resp) {
    if (resp.ok) {
        return resp.json();
    } else {
        throw "Error: http status code = " + resp.status;
    }
}
function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name;
    li.addEventListener("click", removeFruit);
    fruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

function removeFruit(e) {
    e.target.remove();
}	