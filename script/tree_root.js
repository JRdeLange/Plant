import Branch from './tree_branch.js';

export default class Root {
    constructor(id, position, graph) {
        this.id = id;
        this.position = position;
        this.graph = graph;
        this.angle_offset = -0.5;
        this.child = null; // Initially, the root has no child
    }

    grow(){
        this.child.grow();
    }

    update_stats(){
        this.child.update_stats();
    }

    // Function to add the first branch to the root
    add_child_branch(branch) {
        this.child = branch;
    }
}