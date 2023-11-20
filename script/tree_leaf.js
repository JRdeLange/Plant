// leaf.js

export default class Leaf {
    constructor(id, parent, max_size, angle_offset, location, graph) {
        this.id = id;
        this.parent = parent;
        this.age = 0; // Age will be incremented to simulate growth over time
        this.max_size = max_size;
        this.size = this.max_size / 10;
        this.angle_offset = angle_offset;
        this.location = location; // A value from 0 to 1 representing the position on the parent branch
        this.graph = graph;
        this.color = this.generateRandomGreenColor();
    }

    generateRandomGreenColor() {
        // Randomly generate the red and blue components (keeping them lower)
        let red = Math.floor(Math.random() * 40);
        let blue = Math.floor(Math.random() * 40);
    
        // Keep the green component high to ensure the color is predominantly green
        let green = Math.floor(Math.random() * 70 + (256 - 100));
    
        return `rgb(${red}, ${green}, ${blue})`;
    }
  
    // Function to simulate leaf growth over time
    grow() {
        let animation_poppiness = 70;
        this.size += (this.max_size - this.size) / (1000 / animation_poppiness);
    }
}