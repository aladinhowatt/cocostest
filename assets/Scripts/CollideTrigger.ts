import { _decorator, BoxCollider2D, Collider, Collider2D, Component, Contact2DType, IPhysics2DContact, ITriggerEvent, EventTarget } from 'cc';

const { ccclass, property } = _decorator;


export const gameEvents = new EventTarget();
@ccclass('CollideTrigger')
export class CollideTrigger extends Component {
    start() {
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
           
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact(selfcollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact) {
     
        const collectNode = otherCollider.node;
      
           
        gameEvents.emit('collectedItem', collectNode);
        
    }

   

    update(deltaTime: number) {
        
    }
    protected onDestroy(): void {
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
           
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}


