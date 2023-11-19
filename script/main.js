import TreeGraph from "./tree_graph.js"
import Renderer from "./renderer.js"
import TreeJsonParser from "./tree_json_parser.js"


let renderer = new Renderer()
let tree_graph = null

// This function is called once the JSON is successfully loaded
function handleTreeData(jsonData) {
    const treeParser = new TreeJsonParser(jsonData);
    tree_graph = treeParser.parse();
    renderer.set_tree_graph(tree_graph)
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('./mini_test.json') // Make sure the path is correct relative to your HTML file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(handleTreeData)
        .catch(error => {
            console.error('Error loading tree data:', error);
        });
    
        loop()
});


function loop(){
    if (tree_graph){
        tree_graph.grow()
    }
    renderer.render()
    window.requestAnimationFrame(loop)
}

