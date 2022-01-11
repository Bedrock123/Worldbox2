import * as THREE from 'three';

// ECS
import Component from '@EntityComponentCore/Component';

const mapSize = 50;

let perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();


const setBlock = function () {

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    return function ( matrix, x, y, z ) {
        position.x = x
        position.y = y
        position.z = z

        scale.x = 1;
        scale.y = 3;
        scale.z = 1;

        matrix.compose( position, quaternion, scale );

    };

}();

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

        
        const GRID_SIZE = 20;
        const RESOLUTION = 20;
        
        let num_pixels = GRID_SIZE / RESOLUTION;
        let totalCount = 0
        let rowCount = 0

        
        for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE){
            for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE){
                totalCount ++
            }
        }
        const t0 = performance.now();
        
        // Create the projective grometry and material
        const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        const material = new THREE.MeshLambertMaterial( {color: '#f6e58d'} );
        const mesh = new THREE.InstancedMesh( geometry, material, totalCount );
        const matrix = new THREE.Matrix4();
        let color = new THREE.Color();

        let cellIndex = 0;
        for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE){
            rowCount++
            
            let columnCount = 0
            for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE){
                columnCount++
                cellIndex ++
                setBlock( matrix, (columnCount - ((GRID_SIZE * RESOLUTION) / 2)) + .5, perlin.get(x, y) * 10, (rowCount - ((GRID_SIZE * RESOLUTION) / 2)) + .5 );
                let v = parseInt(Math.abs(perlin.get(x, y) * 250))
                mesh.setColorAt(cellIndex, color.set('hsl('+v+',50%,50%)'));
				mesh.setMatrixAt( cellIndex, matrix );
  
            }
        }
        const t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

        console.log(mesh)

        this._params.scene.add(mesh)
        console.log(totalCount)
    }

    
};

export default TileGenerator;