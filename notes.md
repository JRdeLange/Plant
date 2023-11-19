##### Growth algorithm #####

### Loose ideas

- Branch width influences branch/leaf spawn rates
- Nonlinear growth















##### Tree graph datastructure #####

Trees are made up of branches and leaves. leaves form on leaf branches.
The bottom of the tree is a root node


### Root

The root is the starting point for the first branch.
This branch starts out growing straight up.

# Data

- Position
- Child (the first branch)


### Branches

Branches should grow in length and thickness over time. 
Branches have a probablity to sprout new branches. 
- The maximum amount of child branches 
- If the new branch is the first child branch of this branch, it should have a very small offset angle (it grows fairly straight)
- If the new branch is not the first child of this branch, it should have a larger offset (plus/minus 40 to 100 degrees), so that it branches out.
Branches that do not have branch childres can sprout leaves

# Data

- Length
- Thickness
- Offset of angle to parent branch
- Children (branches)
- Children (leaves)
- Parent


### Leaves

Leaves are created by branches without any branch child nodes. 
Leaves start out very small but grow over time
Leaves have a relatively large angle offset to ensure they grow away from the branch (plus/minus 40 to 140 degrees)

# Data

- Age
- Size
- Offset of angle to parent branch
- Location (0-1, along on the parent branch)
- Parent (branch)





##### Tree json ####

Trees are composed of a root, branches, and leaves. This structure is defined using IDs to maintain parent-child relationships.

### Root

Represents the base of the tree and the starting point for the first branch.

#### Data

- **ID:** Unique identifier for the root.
- **Position:** Coordinates where the root is located (e.g., `{ "x": 100, "y": 300 }`).

### Branches

Branches grow in length and thickness and can sprout new branches and leaves.

#### Data

- **ID:** Unique identifier for the branch.
- **Parent:** Parent node
- **Length:** Current length of the branch.
- **Thickness:** Current thickness of the branch.
- **Angle Offset:** Angle of the branch relative to its parent.

### Leaves

Leaves are created by branches and grow in size over time.

#### Data

- **ID:** Unique identifier for the leaf.
- **Parent:** Parent branch.
- **Size:** Current size of the leaf.
- **Angle Offset:** Angle of the leaf relative to its parent branch.
- **Location:** Position on the parent branch, represented as a value between 0 and 1.