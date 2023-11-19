import Leaf from './tree_leaf.js';

export default class Branch {
    constructor(id, parent, length, thickness, angle_offset, graph) {
        this.id = id;
        this.parent = parent;
        this.length = length;
        this.thickness = thickness;
        this.angle_offset = angle_offset;
        this.graph = graph;
        this.children = { branches: [], leaves: [] };
    }

    grow(){
        this.length += (50 - this.length) / 400;
        this.thickness += (10 - this.thickness) / 600;
        
        if (Math.random() < 0.004){
            this.graph.add_branch(Math.random(), this.id, 1, Math.random() + 1, Math.random() * 0.6 - 0.3)
        }
        
        this.children.branches.forEach(branch => {
            branch.grow()
        })

    }


    // Function to add the first branch to the root
    add_child_branch(branch) {
        this.children.branches.push(branch);
    }

    // Function to add a child leaf
    add_child_leaf(leaf) {
        this.children.leaves.push(leaf);
    }
}