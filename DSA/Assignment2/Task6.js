//grouping the related data by category 
const grpCategory = (products) => {
  const grouped = {};

  for (let product of products) {
    const category = product.categoryId;

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(product);
  }

  return grouped;
};

const products = [
  { id: 1, name: 'Phone', categoryId: 2 },
  { id: 2, name: 'Shirt', categoryId: 1 },
  { id: 3, name: 'Charger', categoryId: 2 }
];

console.log(grpCategory(products));
