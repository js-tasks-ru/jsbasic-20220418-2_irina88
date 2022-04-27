function getMinMax(str) {
 
  let array = str.split(' ').map((el)=>+el)
  let arr = array.filter(el=>!isNaN(el))
  let sorted = arr.sort((a,b)=>a-b)

  const obj = {
      min: sorted[0],
      max: sorted[sorted.length-1]
  }

  return obj
}