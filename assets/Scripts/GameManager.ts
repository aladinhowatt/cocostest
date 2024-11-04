import { _decorator, Component, Node, Prefab, instantiate, Vec3, math, director, view, Sprite, AudioClip, AudioSource } from 'cc';
import { gameEvents } from './MoveUp';
import { ItemType } from './ItemType';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: [Prefab] })
    prefabs: Prefab[] = [];

    @property
    spawnInterval: number = 2;

    @property([Node])
    completeMarkNode: Node[] = [];

    @property(Node)
    allcompleteNode: Node = null;

    private _timer: number = 0;
    @property({ type: [Sprite] })
    progessSprite: Sprite[] = [];

    collectArray: number[] = [0, 0, 0, 0, 0];


    @property({ type: SoundManager })
    soundManager: SoundManager = null;


    start() {

        this._timer = this.spawnInterval;
        gameEvents.on('move-up-clicked', this.onMoveUpClicked, this);

    }
    onMoveUpClicked(itemType: number) {
        this.soundManager.playBubbleSound();
        switch (itemType) {

            case ItemType.Soap:
                this.progessSprite[0].fillRange += 0.1;
                this.collectArray[0] += 1;

                break;
            case ItemType.Shampoo:
                this.progessSprite[1].fillRange += 0.1;
                this.collectArray[1] += 1;

                break;
            case ItemType.Sponge:
                this.progessSprite[2].fillRange += 0.1;
                this.collectArray[2] += 1;

                break;
            case ItemType.Toothbrush:
                this.progessSprite[3].fillRange += 0.1;
                this.collectArray[3] += 1;

                break;
            case ItemType.Duck:

                this.collectArray[4] += 1;
                this.progessSprite[4].fillRange += 0.1;
                break;
        }

        this.CheckComplete();
    }

    CheckComplete() {
        let allComplete = true;

        for (let i = 0; i < this.collectArray.length; i++) {
            if (this.collectArray[i] >= 9) {
                if (!this.completeMarkNode[i].active)
                    this.soundManager.playGetFullItemSound();
                this.completeMarkNode[i].active = true;
             
            } else {
                allComplete = false;
            }
        }


        if (allComplete) {
            this.soundManager.playWinSound();
            this.allcompleteNode.active = true;
            this.scheduleOnce(
                this.loadTitleScene, 3

            );
        }
    }

    loadTitleScene() {
        director.loadScene('TitleScene');
    }



    update(deltaTime: number) {

        this._timer -= deltaTime;
        if (this._timer <= 0) {
            this.spawnRandomPrefab();
            this._timer = this.spawnInterval;
        }
    }

    spawnRandomPrefab() {

        const availablePrefabs = this.prefabs.filter((_, index) => this.collectArray[index] < 9);

        if (availablePrefabs.length === 0) {
            console.log("All items have reached their maximum count.");
            return;
        }


        const randomPrefab = availablePrefabs[Math.floor(Math.random() * availablePrefabs.length)];
        const newNode = instantiate(randomPrefab);

        const screenWidth = view.getVisibleSize().width;
        const randomX = math.randomRange(-screenWidth / 2, screenWidth / 2);

        newNode.setPosition(randomX, -view.getVisibleSize().height / 2, 0);
        this.node.addChild(newNode);
    }

    onClickBackButton() {
        this.loadTitleScene();
    }
}
