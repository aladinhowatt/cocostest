import { _decorator, Component, EventTouch, Input, Node, EventTarget, tween, Vec3 } from 'cc';
import { ItemData } from './ItemData';
const { ccclass, property } = _decorator;
export const gameEvents = new EventTarget();
@ccclass('ItemTouchListener')

export class ItemTouchListener extends Component {
    start() {
        this.node.on(Input.EventType.TOUCH_START, this.onClick, this);
    }

    onClick(event: EventTouch) {

        const itemData = this.getComponent(ItemData);
        if (itemData) {
            const itemType = itemData.itemData;

            const customEvent = new Event('move-down-clicked');
            (customEvent as any).itemType = itemType; 

            gameEvents.emit('move-down-clicked', itemType);
        }

        tween(this.node)
            .to(0.2, { scale: new Vec3(1.1, 1.1, 1.1) })
            .call(() => {
                this.node.destroy(); 
            })
            .start();

    }
    update(deltaTime: number) {

    }
    protected onDestroy(): void {
        this.node.off(Input.EventType.TOUCH_START, this.onClick, this);
    }
}


