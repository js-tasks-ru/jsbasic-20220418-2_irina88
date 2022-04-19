function ucFirst(str) {
  if (str) {
    let firstSym = str[0].toUpperCase()
    let rest = str.slice(1,str.length)
    return firstSym+rest
  } else return str

}
