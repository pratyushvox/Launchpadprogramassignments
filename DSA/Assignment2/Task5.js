const equalobj = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);


  if (keys1.length !== keys2.length) return false;


  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false; 
    }
  }

  return true; 
};

const d1 = { name: 'John', email: 'john@example.com', age: 20 };
const d2 = { name: 'John', email: 'john@example.com', age: 20 };
const d3 = { name: 'Jane', email: 'jane@example.com', age: 20 };

console.log(equalobj(d1, d2)); 
console.log(equalobj(d1, d3));
