function camelize(str) {
  const [first, ...rest] = str.split('-');
  let second = rest.map((el)=>firstUp(el)).join('');
  let all = first + second;
  return all;
}

function firstUp(str) {
  if (str) {
    let firstSym = str[0].toUpperCase();
    let rest = str.slice(1, str.length);
    return firstSym + rest;
  } else {return str;}  
}