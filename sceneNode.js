/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
    
        
        var localTransform = this.trs.getTransformationMatrix();
        var newModelMatrix = MatrixMult(modelMatrix, localTransform);
    
        
        var newModelViewMatrix = MatrixMult(modelView, localTransform);
    
        
        var newMvpMatrix = MatrixMult(mvp, localTransform);
    
        
        var newNormalMatrix = getNormalMatrix(newModelViewMatrix);
    
        var transformedMvp = newMvpMatrix;
        var transformedModelView = newModelViewMatrix;
        var transformedNormals = newNormalMatrix;
        var transformedModel = newModelMatrix;
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Draw all children nodes
        for (var child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    

}