import Leaf from "./tree_leaf.js"
import Branch from "./tree_branch.js"

export default class Renderer{
    constructor(){
        this.tree_graph = null;
        this.canvas = document.getElementById("treeCanvas");
        this.context = this.canvas.getContext("2d");
    }

    set_tree_graph(tree_graph){
        this.tree_graph = tree_graph;
    }


    render(){
        this.draw_background();
        // console.log("start")
        if (this.tree_graph) {
            this.draw_tree(this.tree_graph.root.child, this.tree_graph.root.position.x, this.tree_graph.root.position.y, -0.5)
        }
        // console.log("end")
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
            //this.render_leaf(leaf);
        });
    }

    
    render_branch(branch, last_x, last_y, last_angle) {
        let angle = last_angle + branch.angle_offset
        // Calculate the end position of the branch based on its angle and length
        const endX = last_x + branch.length * Math.cos(angle);
        const endY = last_y + branch.length * Math.sin(angle);
        
        this.context.save(); // Save the current canvas context
        this.context.translate(last_x, last_y); // Translate to the branch's starting position
        this.context.rotate((angle) * Math.PI); // Rotate the canvas to the branch's angle
        
        // Draw the branch as a brown rectangle
        this.context.fillStyle = '#8b4513';
        this.context.fillRect(0, -branch.thickness / 2, branch.length, branch.thickness);
        
        this.context.restore(); // Restore the canvas context to its original state

        return angle
    }
    
    
    render_leaf(branch, x, y, leaf) {
        const leafPositionX = x + leaf.location * branch.length * Math.cos(branch.angle_offset);
        const leafPositionY = y + leaf.location * branch.length * Math.sin(branch.angle_offset);
        
        this.context.save(); // Save the current canvas context
        this.context.translate(leafPositionX, leafPositionY); // Translate to the leaf's position
        this.context.rotate(leaf.angle_offset); // Rotate the canvas to the leaf's angle
        
        // Draw the leaf as a green ellipse
        this.context.fillStyle = 'green';
        this.context.beginPath();
        this.context.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, 2 * Math.PI);
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