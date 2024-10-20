class Tree<T>{
    value:T;
    children:Tree<T>[];
    constructor(value:T){
        this.value = value;
        this.children = [];
    }
    addChildren(child: Tree<T>): void {
        this.children.push(child);
    }
}