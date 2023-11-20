import Root from './tree_root.js';
import Branch from './tree_branch.js';
import Leaf from './tree_leaf.js';

export default class TreeGraph {
    constructor() {
        this.nodes = {};
        this.root = null;
    }

    update(){
        this.root.grow();
        
        this.root.update_stats();
    }

    grow(){
        this.root.grow();
    }


    get_node_with_id(id){
        return this.nodes[id];
    }

    add_root(id, position){
        this.root = new Root(id, position, this);
        this.nodes[id] = this.root;
    }

    // Function to add a branch to the tree
    add_branch(id, parent_id, length, thickness, angle_offset, grow_chance, add_leafs=true) {
        let parent = this.get_node_with_id(parent_id)
        let branch = new Branch(id, parent, length, thickness, angle_offset, this, grow_chance);
        parent.add_child_branch(branch);
        this.nodes[id] = branch;
        if (add_leafs){ branch.sprout_leafs() }
    }

    // Function to add a leaf to the tree
    add_leaf(id, parent_id, size, angle_offset, location) {
        let parent = this.get_node_with_id(parent_id)
        let leaf = new Leaf(id, parent, size, angle_offset, location, this);
        parent.add_child_leaf(leaf);
        this.nodes[id] = leaf;
    }

}