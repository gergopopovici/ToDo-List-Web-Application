class Tree<T> {
  value: T;
  children: Tree<T>[];
  constructor(value: T) {
    this.value = value;
    this.children = [];
  }
  addChildren(child: Tree<T>): void {
    this.children.push(child);
  }
}
function readTreeJson<T>(json): Tree<T> {
  let newTree = new Tree<T>(json.value);
  let treeArray = [{ node: newTree, json: json }];
  while (treeArray.length > 0) {
    let current = treeArray.pop();
    if (current) {
      for (let child of current?.json.children) {
        let newChild = new Tree<T>(child.value);
        treeArray.push({ node: newChild, json: child });
        current.node.addChildren(newChild);
      }
    }
  }
  return newTree;
}
