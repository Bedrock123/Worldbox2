import * as THREE from 'three';

// ECS
import Component from '@EntityComponentCore/Component';

const mapSize = 200;

class TileGenerator extends Component {
    constructor(params) {
        super();
        this._Init(params);
    }

    _Init(params) {
        this._params = params;
        this._LoadTiles();
    }

    InitComponent() {
        // Register handles
    }

    _LoadTiles() {
        // Create the projective grometry and material
        const geometry = new THREE.PlaneBufferGeometry( 1, 1 );
        const landMaterial = new THREE.MeshBasicMaterial( {color: "#4cd137"} );
        const waterMaterial = new THREE.MeshBasicMaterial( {color: "#0097e6"} );

        const t0 = performance.now();
        let tiles = [];
        let columnCount = 0;
        while (columnCount < mapSize) {
            let rowCount = 0;
            let tileRow = [];
            while (rowCount < mapSize) {
                tileRow.push(Math.random() >.3);
                rowCount++;
            }
            tiles.push(tileRow);
            columnCount++;
        }
        
        for (var tileRowIndex = 0; tileRowIndex < tiles.length; tileRowIndex++) {
            for (var tileCellIndex = 0; tileCellIndex < tiles[tileRowIndex].length; tileCellIndex++) {
                const plane = new THREE.Mesh( geometry, tiles[tileRowIndex][tileCellIndex] ? landMaterial : waterMaterial );
                plane.rotation.x = - Math.PI / 2;
                plane.position.y = -.5;
                plane.position.z = (tileRowIndex - (mapSize / 2)) + .5;
                plane.position.x = (tileCellIndex - (mapSize / 2)) + .5;
                plane.matrixAutoUpdate = false;
                plane.updateMatrix();
                this._params.scene.add(plane);
            };
        };


        const t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
        
    
    }

    
};

export default TileGenerator;