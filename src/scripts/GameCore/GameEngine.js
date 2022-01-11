import * as THREE from 'three';

// ECS
import EntityManager from "@EntityComponentCore/EntityManager";

// Game Core
import GameEnviornment from "@GameCore/GameEnviornment";

// Entities
import { PlayerEntity } from "@GameCore/Entities/PlayerEntity";
import { HumanEntity } from "@GameCore/Entities/HumanEntity";
import { EnviornmentEntity } from "@GameCore/Entities/EnviornmentEntity";

// ECS
import SpacialHashGrid from "@EntityComponentCore/utils/SpacialHashGrid";

class GameEngine extends GameEnviornment {
    constructor()
    {
        super();
        this._entityManager = new EntityManager();
        this._grid = new SpacialHashGrid([[-2500, -2500], [2500, 2500]], [5000, 5000]);
    }

    Init() {
        this._Initialize();
        this._Animate();
        this._LoadCamera();
        // this._SetGridHelper();
    }

    _LoadCamera() {
        // Create the player character
        const player = PlayerEntity({
            scene: this._scene, 
            camera: this._camera,
            renderer: this._renderer
        });   

        this._entityManager.Add(player, "Player");

        // Create the player character
        const human = HumanEntity({
            scene: this._scene, 
            camera: this._camera,
            renderer: this._renderer
        });   

        this._entityManager.Add(human, "Human");
        
        // Create the enviornment character
        const enviornment = EnviornmentEntity({
            scene: this._scene, 
            camera: this._camera,
            renderer: this._renderer
        });   

        this._entityManager.Add(enviornment, "Enviornment");
    }

    _SetGridHelper() {
        const size = 100;
        const divisions = 100;
        const gridHelper = new THREE.GridHelper( size, divisions );
        gridHelper.position.y = -.5;
        this._scene.add( gridHelper );
    }
}


export default GameEngine;