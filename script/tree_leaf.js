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
    }
  
    // Function to simulate leaf growth over time
    grow() {
        this.size += (this.max_size - this.size) / 150;
    }
}