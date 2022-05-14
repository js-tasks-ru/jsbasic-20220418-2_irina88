function factorial(n) {
  
  if (n) {
    let answer = 1;
    for (let i = 1; i <= n; i++) {
      answer = answer * i;
    }
    return answer;
  } else {return 1;}

}
