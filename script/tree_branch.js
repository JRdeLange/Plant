import Leaf from './tree_leaf.js';

export default class Branch {
    constructor(id, parent, length, thickness, angle_offset, graph, grow_chance) {
        this.id = id;
        this.parent = parent;
        this.length = length;
        this.thickness = thickness;
        this.angle_offset = angle_offset;
        this.graph = graph;
        this.grow_chance = grow_chance;
        this.children = { branches: [], leaves: [] };
    }

    grow(){
        this.length += (50 - this.length) / 500;
        this.thickness += (10 - this.thickness) / 3500;
        
        if (this.children.branches.length < 4 && Math.random() < this.grow_chance){
            this.graph.add_branch(Math.random(), this.id, 1, Math.random() + 1, Math.random() * 0.6 - 0.3, this.grow_chance * 0.7)
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