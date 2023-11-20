import Leaf from "./tree_leaf.js"
import Branch from "./tree_branch.js"

export default class Renderer{
    constructor(){
        this.tree_graphs = [];
        this.canvas = document.getElementById("treeCanvas");
        this.context = this.canvas.getContext("2d");

        this.leaf_queue = [];
    }

    add_tree_graph(tree_graph){
        this.tree_graphs.push(tree_graph);
    }


    render(){
        this.draw_background();

        this.tree_graphs.forEach(tree_graph =>{
            this.draw_tree(tree_graph.root.child, tree_graph.root.position.x, tree_graph.root.position.y, -0.5)
            this.render_leaf_queue()
        })
    }

    draw_tree(current_node, last_x, last_y, last_angle){
        // Recursively walks through the tree and draws it
        // Draw the current node
        let new_angle = this.render_branch(current_node, last_x, last_y, last_angle)
        let new_x = last_x + current_node.length * Math.cos(new_angle * Math.PI);
        let new_y = last_y + current_node.length * Math.sin(new_angle * Math.PI);

        // Recurse through the branches
        current_node.children.branches.forEach(branch => {
            this.draw_tree(branch, new_x, new_y, new_angle);
        });
        // Recurse through the leaves
        current_node.children.leaves.forEach(leaf => {
            this.leaf_queue.push([current_node, last_x, last_y, leaf, new_angle]);
            //this.render_leaf(current_node, last_x, last_y, leaf, new_angle);
        });
    }

    render_leaf_queue(){
        while (this.leaf_queue.length > 0) {
            let leaf_info = this.leaf_queue.pop()
            this.render_leaf(leaf_info[0], leaf_info[1], leaf_info[2], leaf_info[3], leaf_info[4])
        }
    }

    
    render_branch(branch, last_x, last_y, last_angle) {
        let angle = last_angle + branch.angle_offset
        
        this.context.save(); // Save the current canvas context
        this.context.translate(last_x, last_y); // Translate to the branch's starting position
        this.context.rotate((angle) * Math.PI); // Rotate the canvas to the branch's angle
        
        // Draw the branch as a brown rectangle
        this.context.fillStyle = '#8b4513';
        // Multiply length by a bit to fill up gaps in the rendering between angled branches
        this.context.fillRect(0, -branch.thickness / 2, branch.length * 1.03, Math.max(branch.thickness, 1));
        
        this.context.restore(); // Restore the canvas context to its original state

        return angle
    }
    
    
    render_leaf(branch, x, y, leaf, angle) {
        let leafPositionX = x + leaf.location * branch.length * Math.cos(angle * Math.PI);
        let leafPositionY = y + leaf.location * branch.length * Math.sin(angle * Math.PI);
        
        this.context.save(); // Save the current canvas context
        this.context.translate(leafPositionX, leafPositionY); // Translate to the leaf's position
        this.context.rotate((angle + leaf.angle_offset) * Math.PI); // Rotate the canvas to the leaf's angle
        
        // Draw the leaf as a green ellipse
        this.context.fillStyle = leaf.color;
        this.context.beginPath();
        this.context.ellipse(leaf.size, 0, leaf.size, leaf.size / 2, 0, 0, 2 * Math.PI);
        this.context.fill();
        
        this.context.restore(); // Restore the canvas context to its original state
    }
    
    
    draw_background(){
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set the sky background
        this.context.fillStyle = "#87CEEB"; // Sky blue color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the ground
        this.context.fillStyle = "#228B22"; // Forest green color
        this.context.fillRect(0, this.canvas.height - 100, this.canvas.width, 100); // Adjust the ground height as needed
    }

}