import Leaf from './tree_leaf.js';

export default class Branch {
    constructor(id, parent, length, thickness, angle_offset, graph, grow_chance) {
        this.id = id;
        this.parent = parent;
        this.max_length = 22;
        this.length = length;
        this.thickness = thickness;
        this.angle_offset = angle_offset;
        this.graph = graph;
        this.grow_chance = grow_chance;
        this.children = { branches: [], leaves: [] };
        this.n_descendants = 0;

        // let n_leafs = 4;

        // for (let n = 0; n < Math.floor(Math.random() * n_leafs); n++) {
        //     this.sprout_leaf()
        // }

    }

    grow(){
        this.length += ((this.max_length + 10 * Math.sqrt(this.n_descendants)) - this.length) / 1000;
        this.thickness += (Math.sqrt(this.n_descendants) - this.thickness) / 500;
        
        if (this.children.branches.length < 6
            //&& this.children.leaves.length == 0
            && Math.random() < this.grow_chance){
            this.graph.add_branch(Math.random(), this.id, 1, Math.random() + 1, Math.random() * 0.8 - 0.4, this.grow_chance * 0.6)
        }
        
        
        this.children.branches.forEach(branch => {
            branch.grow()
        })

        this.children.leaves.forEach(leaf => {
            leaf.grow();
        })

    }

    update_stats(){
        let total = 1;
        this.children.branches.forEach(branch => {
            total += branch.update_stats();
        })
        this.n_descendants = total;
        return total;
    }

    sprout_leafs(){
        let n_leafs = 6;
        for (let n = 0; n < Math.floor(Math.random() * n_leafs); n++) {
            let size = Math.floor(Math.random() * 7 + 5)
            let angle_offset = Math.random() / 2 + 0.25
            if (Math.random() < .5){ angle_offset *= -1 }
            let location = 1 - Math.pow(Math.random(), 3);
            console.log(location)
            this.graph.add_leaf(Math.random(), this.id, size, angle_offset, location)
        }
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