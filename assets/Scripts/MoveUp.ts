import { _decorator, Component, Input, EventTouch, Vec3, EventTarget, tween, BoxCollider2D, Collider2D } from 'cc';
import { NodeProperty } from './NodeProperty';
const { ccclass, property } = _decorator;

export const gameEvents = new EventTarget();

@ccclass('MoveUp')
export class MoveUp extends Component {
    @property
    speed: number = 5; 

    isDestroyed:boolean = false;

    start() {
      
        this.node.on(Input.EventType.TOUCH_START, this.onClick, this);
    }

    update(deltaTime: number) {
        if(this.isDestroyed) return;
  
        const position = this.node.position;
        const newY = position.y + this.speed * deltaTime;
        this.node.setPosition(position.x, newY, position.z);

        if (this.node.position.y > 650) {
            this.node.destroy();
        }
    }

    onClick(event: EventTouch) {
        if( this.isDestroyed==true)return;
        const nodePropertyComponent = this.getComponent(NodeProperty);
        if (nodePropertyComponent) {
            const itemType = nodePropertyComponent.itemType;
        
            const customEvent = new Event('move-up-clicked');
            (customEvent as any).itemType = itemType; 

          
            gameEvents.emit('move-up-clicked', itemType);
        }
        this.isDestroyed = true;
       tween(this.node)
                .to(0.2, { scale: new Vec3(1.1, 1.1, 1.1) }) // Scale to 110%
                .call(() => {
                    this.node.destroy();
                })
                .start();

    }

    onDestroy() {
        this.node.off(Input.EventType.TOUCH_START, this.onClick, this);
    }
}