//finding filter itmees based on allowed keys

const filterAllowedKeys = (data, allowedKeys) => {
  const allowed = new Set(allowedKeys);
  return data.filter(item => allowed.has(item.key));
};

const data = [
  { key: 'name', value: 'PRatyush' },
  { key: 'email', value: 'Pratyushkhadka69@gmail.com' },
  { key: 'age', value: 23 },
];
const allowedKeys = ['name', 'age'];

console.log(filterAllowedKeys(data, allowedKeys));
