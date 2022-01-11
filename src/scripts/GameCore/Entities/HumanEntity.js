// ECS
import Entity from "@EntityComponentCore/Entity";

// Components
import ModelLoader from "@GameCore/Components/Common/ModelLoader";

export const HumanEntity = (params) => {
    const Human = new Entity();
    
    Human.AddComponent(new ModelLoader({
        color: "green",
        scene: params.scene
    }), "ModelLoader");

    // Return the Camera
    return Human;
};;