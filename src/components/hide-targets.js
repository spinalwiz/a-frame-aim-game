const AFRAME = window.AFRAME;

AFRAME.registerComponent('hide-targets', {
    schema: {

    },

    init: function() {
        let data = this.data;
        let el = this.el;

        el.addEventListener("model-loaded", e =>{
            let tree3D = el.getObject3D('mesh');
            if (!tree3D){return;}
            tree3D.traverse(function(node){
                if (node.isMesh){
                    if (node.name === 'spawn'){
                        node.visible = false;
                    }
                }
            });


        });


        let tiers = {};
        let positions = [];

        let sceneTiers = scene.children.find(function(child){
            return child.name === "spawnPoints";
        });

        // then for each tier find its individual spawn points
        sceneTiers.children.forEach(function(tier){
            var transforms = tier.children.map(function(child){
                child.visible = false;
                return obj3DtoTransform(child);
            }.bind(this));

            let transforms_depth_copy = [];

            for (var i = 0; i < transforms.length; i++) {
                transforms_depth_copy.push(duplicateDepth(transforms[i], 2));
                transforms_depth_copy.push(duplicateDepth(transforms[i], 3));
                transforms_depth_copy.push(duplicateDepth(transforms[i], 0));
            }

            tiers[tier.name] = transforms;
            positions = positions.concat(transforms);
            positions = positions.concat(transforms_depth_copy);
        }.bind(this));

        for (let i = 0; i < positions.length; i++) {
            positions[i].position.x += sceneTiers.position.x;
            positions[i].position.y += sceneTiers.position.y;
            positions[i].position.z += sceneTiers.position.z;
        }
    }
});

function obj3DtoTransform(obj){
    //TODO: fix and flip this from editor
    obj.rotation.y += Math.PI;

    let data = {
        mobileSpawnPoint: false,
        position: obj.position.add(obj.parent.position),
        rotation: obj.rotation,
        scale: obj.scale,
        occupied: false,
        distance: obj.userData.distance,
        depth: obj.userData.depth,
        angle: obj.userData.angle
    };

    if(obj.children !== undefined && obj.children.length !== 0){
        data.children = obj.children.map(function(child){
            return {
                position: child.position,
                rotation: child.rotation,
                scale: child.scale
            };
        });
        data.mobileSpawnPoint = true;
    }

    return data;
}

//------------------------------------------------------------------------------
//Duplicates a target at a different depth
function duplicateDepth(obj, depth_tier){
    let data = {
        mobileSpawnPoint: obj.mobileSpawnPoint,
        //position: {x: obj.position.x, y: obj.position.y, z: obj.position.z - ((depth_tier-1)*10)},
        position: new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z - ((depth_tier-1)*10)),
        rotation: obj.rotation,
        scale: obj.scale,
        occupied: obj.occupied,
        distance: obj.distance,
        depth: obj.depth+depth_tier-1,
        angle: obj.angle
    };

    return data;
}
//------------------------------------------------------------------------------
