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
  const newTree = new Tree<T>(json.value);
  const treeArray = [{ node: newTree, json }];
  while (treeArray.length > 0) {
    const current = treeArray.pop();
    if (current) {
      const { children } = current.json;
      children.forEach((child) => {
        const newChild = new Tree<T>(child.value);
        current.node.addChildren(newChild);
        treeArray.push({ node: newChild, json: child });
      });
    }
  }
  return newTree;
}

async function treeReader<T>(url: string): Promise<Tree<T>> {
  const response = await fetch(url);
  const json = await response.json();
  return readTreeJson<T>(json);
}
