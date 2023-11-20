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

    render_leaf_queue() {
        const totalLeaves = this.leaf_queue.length;
        let initialBrightness = 1.0; // Maximum brightness
        let brightnessDecay = 0.22; // Decrement value for brightness

        while (this.leaf_queue.length > 0) {
            let leaf_info = this.leaf_queue.pop();
            let queuePosition = this.leaf_queue.length / totalLeaves;
            let brightness = initialBrightness - (brightnessDecay * (queuePosition));
            brightness = Math.max(brightness, 0); // Ensure brightness doesn't go below 0

            this.render_leaf(leaf_info[0], leaf_info[1], leaf_info[2], leaf_info[3], leaf_info[4], brightness);
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
    
    adjustBrightness(color, brightness) {
        // Assuming color is a string like "rgb(0,128,0)"
        let rgb = color.match(/\d+/g).map(Number);
        rgb = rgb.map(component => Math.max(Math.min(component * brightness, 255), 0));
        return `rgb(${rgb.join(",")})`;
    }

    render_leaf(branch, x, y, leaf, angle, brightness) {
        let leafPositionX = x + leaf.location * branch.length * Math.cos(angle * Math.PI);
        let leafPositionY = y + leaf.location * branch.length * Math.sin(angle * Math.PI);

        this.context.save();
        this.context.translate(leafPositionX, leafPositionY);
        this.context.rotate((angle + leaf.angle_offset) * Math.PI);

        // Adjust leaf color based on brightness
        let color = this.adjustBrightness(leaf.color, brightness);
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.ellipse(leaf.size, 0, leaf.size, leaf.size / 2, 0, 0, 2 * Math.PI);
        this.context.fill();

        this.context.restore();
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