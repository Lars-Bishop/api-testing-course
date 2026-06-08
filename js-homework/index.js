console.log("Homework 6")

const fs = require('fs');
const array = [4, 4, 8, 3, 3, 3, 2, 4, 4]

console.log(array)

    console.log("Task 1")

    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
    }

    console.log("Task 2")

    for (let i = 0; i < 3; i++) {
    console.log(array[i])
    }

    console.log("Task 3")

    let task3Sum = 0;
    for (let i = 0; i < array.length; i++) {
        task3Sum += array[i];
    }
    console.log(task3Sum)

    console.log("Task 4")

    let task4Sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 4) {
            task4Sum += array[i];
        }
    }
    console.log(task4Sum)

    console.log("Task 5")

    let file = fs.readFileSync('lists.json', 'utf8')
    let data = JSON.parse(file);
    for (let i = 0; i < data.lists.length; i++) {
    console.log(data.lists[i].id, data.lists[i].name);
}