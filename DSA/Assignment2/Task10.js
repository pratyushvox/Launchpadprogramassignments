class BSTNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const insertNode = (node, data) => {
      if (!node) return new BSTNode(data);
      if (data < node.data) node.left = insertNode(node.left, data);
      else node.right = insertNode(node.right, data);
      return node;
    };
    this.root = insertNode(this.root, data);
  }

  search(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) return true;
      current = data < current.data ? current.left : current.right;
    }
    return false;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
console.log(bst.search(15)); 
console.log(bst.search(7));  
