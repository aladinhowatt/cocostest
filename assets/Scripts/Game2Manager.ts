import { _decorator, Component, Node, Sprite, EventTarget, tween, Vec3, director } from 'cc';
import { gameEvents } from './CollideTrigger';
import { ItemData } from './ItemData';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

export const gameCompleteEvent = new EventTarget();
@ccclass('Game2Manager')
export class Game2Manager extends Component {

    @property({ type: [Sprite] })
    progessSprite: Sprite[] = [];

    @property([Node])
    completeMarkNode: Node[] = [];

    collectArray: number[] = [0, 0, 0, 0, 0];


    @property({ type: SoundManager })
    soundManager: SoundManager = null;

    @property(Node)
    playerNode: Node = null;

    @property(Node)
    bigApple: Node = null;

    start() {
        gameEvents.on('collectedItem', this.onCollectedItem, this);
    }
    onCollectedItem(collectNode: Node) {


        const itemData = collectNode.getComponent(ItemData);
        console.log(itemData.itemData);
        this.soundManager.playGetItemSound();
        switch (itemData.itemData) {

            case 0:
                this.progessSprite[0].fillRange += 0.1;
                this.collectArray[0] += 1;

                break;
            case 1:
                this.progessSprite[1].fillRange += 0.1;
                this.collectArray[1] += 1;

                break;
            case 2:
                this.progessSprite[2].fillRange += 0.1;
                this.collectArray[2] += 1;

                break;
            case 3:
                this.progessSprite[3].fillRange += 0.1;
                this.collectArray[3] += 1;

                break;
            case 4:
                this.collectArray[4] += 1;
                this.progessSprite[4].fillRange += 0.1;

                break;
        }
        this.CheckComplete();


    }
    CheckComplete() {
        let allComplete = true;

        for (let i = 0; i < this.collectArray.length; i++) {
            if (this.collectArray[i] >= 10) {
                if (!this.completeMarkNode[i].active)
                    this.soundManager.playGetFullItemSound();
                this.completeMarkNode[i].active = true;
             
            } else {
                allComplete = false;
            }
        }


        if (allComplete) {
            this.soundManager.playWinSound();
            gameCompleteEvent.emit('GameComplete');

            this.ShowCompleteSequence();

        }
    }
    ShowCompleteSequence() {
        const targetX = 0; // Target x position
        const currentPosition = this.playerNode.position.x;
        const distance = targetX - currentPosition;


        const duration = Math.abs(distance) / 300;


        tween(this.playerNode)
            .to(duration, { position: new Vec3(targetX, this.playerNode.position.y, this.playerNode.position.z) }) // Keep y and z the same
            .call(() => {
                this.onTweenComplete();
            })
            .start();
    }
    onTweenComplete() {
        tween(this.bigApple)
            .to(1, { position: new Vec3(this.bigApple.position.x, -336, this.bigApple.position.z) })
            .call(() => {
                this.onCompleteSequence();
            })
            .start();
    }
    onCompleteSequence() {
        this.scheduleOnce(
            this.loadTitleScene, 3

        );
    }
    loadTitleScene() {
        director.loadScene('TitleScene');
    }
    onClickBackButton() {
        this.loadTitleScene();
    }

}


