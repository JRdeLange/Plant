import Root from "./tree_root.js";
import Branch from "./tree_branch.js";
import Leaf from "./tree_leaf.js";
import TreeGraph from "./tree_graph.js"

export default class TreeJsonParser {
    constructor(json_data) {
        this.json_data = json_data;
        this.tree_graph = new TreeGraph();
    }

    parse() {
        this.create_root();
        this.create_branches();
        this.create_leaves();
        return this.tree_graph; // Assuming "root_1" is the ID of the root
    }

    create_root() {
        let root_data = this.json_data.root;
        this.tree_graph.add_root(root_data.id, root_data.position);
    }

    create_branches(){
        let branch_data = this.json_data.branches;
        branch_data.forEach(branch => {
            this.tree_graph.add_branch(branch.id, branch.parent_id, branch.length, branch.thickness, branch.angle_offset, 0.01, false);
        });
    }

    create_leaves(){
        let leaf_data = this.json_data.leaves;
        leaf_data.forEach(leaf => {
            console.log(leaf.angle_offset)
            this.tree_graph.add_leaf(leaf.id, leaf.parent_id, leaf.size, leaf.angle_offset, leaf.location)
        })
    }



}

    

    // parse() {
    //     this.createRoot();
    //     this.createBranches();
    //     this.createLeaves();
    //     return this.nodes["0"]; // Assuming "root_1" is the ID of the root
    // }

    // createRoot() {
    //     const root_data = this.json_data.root;
    //     const root = new Root(root_data.position);
    //     this.nodes[root_data.id] = root;

    //     if (root_data.child) {
    //         root.child = this.nodes[root_data.child];
    //     }
    // }

    // createBranches() {
    //     this.json_data.branches.forEach(branchData => {
    //         console.log(branchData)
    //         const branch = new Branch(
    //             branchData.length,
    //             branchData.thickness,
    //             branchData.angleOffset,
    //             this.nodes[branchData.parent]
    //         );
    //         this.nodes[branchData.id] = branch;

    //         if (branchData.childBranches) {
    //             branch.childBranches = branchData.childBranches.map(childId => this.nodes[childId]);
    //         }

    //         if (branchData.childLeaves) {
    //             branch.childLeaves = branchData.childLeaves.map(leafId => this.nodes[leafId]);
    //         }
    //     });
    // }

    // createLeaves() {
    //     this.json_data.leaves.forEach(leafData => {
    //         const leaf = new Leaf(
    //             leafData.size,
    //             leafData.angleOffset,
    //             leafData.location,
    //             this.nodes[leafData.parent]
    //         );
    //         this.nodes[leafData.id] = leaf;
    //     });
    // }

