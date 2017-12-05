function average(arr){
  let sum = 0;
  arr.forEach((val) => {
    sum += val;
  });
  return (Math.round(sum / arr.length));
}

var scores = [40, 63, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores));
