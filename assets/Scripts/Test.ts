import { _decorator, Component, debug, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    @property
    moveOffset: Vec3 = new Vec3(10, 10, 0); // Offset to move the sprite

    onLoad() {
     
        this.node.on(Node.EventType.TOUCH_START, this.onSpriteClick, this);
    }

    onSpriteClick() {
        // Log a message when the sprite is clicked
     //   console.log("Sprite clicked!");

        // Move the sprite by the specified offset
       // const newPosition = this.moveOffset;
        //this.node.setPosition(newPosition);
       // console.log(newPosition);
    }

    onDestroy() {
      
        this.node.off(Node.EventType.TOUCH_START, this.onSpriteClick, this);
    }

    
}


