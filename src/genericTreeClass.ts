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

export async function treeReader<T>(url: string): Promise<Tree<T>> {
  const response = await fetch(url);
  const json = await response.json();
  return readTreeJson<T>(json);
}
export function drawTree<T>(tree: Tree<T>, canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const offsetX = 100;
    const offsetY = 80;
    const x = canvas.width / 2;
    const y = 30;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(tree.value.toString(), x, y + 5);
    let children = x - ((tree.children.length - 1) * offsetX) / 2;
    tree.children.forEach((child) => {
      ctx.beginPath();
      ctx.moveTo(x, y + 20);
      ctx.lineTo(children, y + offsetY);
      ctx.stroke();
      drawTree(child, canvas);
      children += offsetX;
    });
  }
}
