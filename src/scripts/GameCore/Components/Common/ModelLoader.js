import * as THREE from 'three';

// ECS
import Component from '@EntityComponentCore/Component';

class ModelLoader extends Component {
    constructor(params) {
        super();
        this._Init(params);
    }

    _Init(params) {
        this._params = params;
        this._LoadModels();
    }

    InitComponent() {
        this._RegisterHandler('update.position', (m) => {
            this._OnPosition(m);
        });
        this._RegisterHandler('update.rotation', (m) => {
            this._OnRotation(m);
        });
    }

    _OnPosition(m) {
        if (this._target) {
            this._target.position.set(
                m.value.x,
                m.value.y,
                m.value.z 
            );
        }
    }
    
    _OnRotation(m) {
        if (this._target) {
            this._target.rotation.copy(m.value);
        }
    }

    _LoadModels() {
        // Create the projective grometry and material
        const geometry = new THREE.SphereBufferGeometry(.4, 32, 32);
        const material = new THREE.MeshLambertMaterial({ color: this._params.color});
        const projectile = new THREE.Mesh(geometry,material);
        // Add the projectile to the scene
        this._params.scene.add(projectile);

    }

    Update(timeDelta) {}
};

export default ModelLoader;