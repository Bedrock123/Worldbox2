// ECS
import Entity from "@EntityComponentCore/Entity";

// Components
import TileGenerator from "@GameCore/Components/Enviornment/TileGenerator";

export const EnviornmentEntity = (params) => {
    const Environment = new Entity();
    
    Environment.AddComponent(new TileGenerator({
        scene: params.scene
    }), "TileGenerator");

    // Return the Camera
    return Environment;
};;