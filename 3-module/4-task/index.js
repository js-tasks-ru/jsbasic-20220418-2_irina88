function showSalary(users, age) {
  let array = users.filter(user=>user["age"]<=age)
  let arr = array.map(element => `${element["name"]}, ${element["balance"]}`);
  let newArr = arr.join('\n')
  return newArr
}
