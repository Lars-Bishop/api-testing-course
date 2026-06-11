import json

print ('Homework 7')

array = [4, 4, 8, 3, 3, 3, 2, 4, 4]

print (array)

print ('Task 1.1')
for i in array:
    print(i)

print ('Task 1.2')
for i in range(3):
    print(array[i])

print ('Task 1.3')
total = 0
for number in array:
    total += number
print(total)

print ('Task 1.4')
total = 0
for number in array:
    if number != 4:
        total += number
print(total)

print ('Task 2')
with open("lists.json", "r", encoding="utf-8") as file:
    data = json.load(file)

for item in data["lists"]:
    print(item["id"], item["name"])