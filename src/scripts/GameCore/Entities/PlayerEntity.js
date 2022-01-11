// ECS
import Entity from "@EntityComponentCore/Entity";

// Player Components
import DebugCamera from "@GameCore/Components/Cameras/DebugCamera";

export const PlayerEntity = (params) => {
    const Player = new Entity();
    
    Player.AddComponent(new DebugCamera({
        camera: params.camera,
        renderer: params.renderer,
        scene: params.scene
    }), "DebugCamera");

    // Return the Player
    return Player;
};;