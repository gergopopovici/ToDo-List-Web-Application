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
function drawTree<T>(tree: Tree<T>, canvas: HTMLCanvasElement, x: number, y: number, level: number): void {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const offsetX = 400 / level;
    const offsetY = 100;
    ctx.beginPath();
    ctx.arc(x, y + 10, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.font = '11px Arial';
    ctx.fillText(tree.value.toString(), x, y + 15);
    let childrenX = x - ((tree.children.length - 1) * offsetX) / 2;
    tree.children.forEach((child) => {
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(childrenX, y + offsetY);
      ctx.stroke();
      drawTree(child, canvas, childrenX, y + offsetY, level + 1);
      childrenX += offsetX;
    });
  }
}

async function main() {
  const tree = await treeReader('./tree.json');
  const canvas = document.getElementById('genericTree') as HTMLCanvasElement;
  console.log(canvas);
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(tree);
  }
  drawTree(tree, canvas, canvas.width / 2, 20, 1);
}

window.addEventListener('DOMContentLoaded', main);
