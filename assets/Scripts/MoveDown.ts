import { _decorator, BoxCollider2D, Component, Node, tween, UIOpacity } from 'cc';
import { gameEvents } from './CollideTrigger';
import { ItemData } from './ItemData';

const { ccclass, property } = _decorator;

@ccclass('MoveDown')
export class MoveDown extends Component {

    @property
    speed: number = 5;

    isDestroyed: boolean = false;
    start() {
        gameEvents.on('collectedItem', this.onCollectedItem, this);
    }

    onCollectedItem(collectNode: Node) {
      
        if (collectNode === this.node) {
            this.isDestroyed = true;
            const itemData = this.getComponent(ItemData);
            console.log(itemData.itemData);
            setTimeout(() => {
                this.node.destroy();
            }, 1);
        }
    }

    update(deltaTime: number) {

        if (this.isDestroyed) return;
        const position = this.node.position;
        const newY = position.y - this.speed * deltaTime;
        this.node.setPosition(position.x, newY, position.z);

        if (this.node.position.y <= -430) {
            this.isDestroyed = true;
            this.getComponent(BoxCollider2D).destroy();
            this.fadeOutAndDestroy();
        }
    }
    fadeOutAndDestroy() {

        let uiOpacity = this.node.getComponent(UIOpacity);
        if (!uiOpacity) {
            uiOpacity = this.node.addComponent(UIOpacity);
        }


        tween(uiOpacity)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
    protected onDestroy(): void {
        gameEvents.off('collectedItem', this.onCollectedItem, this);
    }



}


