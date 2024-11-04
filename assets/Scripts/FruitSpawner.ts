import { _decorator, Component, instantiate, math, Node, Prefab, view } from 'cc';
import { Game2Manager, gameCompleteEvent } from './Game2Manager';
const { ccclass, property } = _decorator;

@ccclass('FruitSpawner')
export class FruitSpawner extends Component {
    private _timer: number = 0;
    @property({ type: [Prefab] })
    prefabs: Prefab[] = [];

    @property
    spawnInterval: number = 2;

    @property(Node)
    spawnParent: Node = null;

    @property({ type: Game2Manager })
    gameManager: Game2Manager = null;
    start() {
        this._timer = this.spawnInterval;
        gameCompleteEvent.on('GameComplete', this.gameComplete, this);
    }
    gameComplete() {
        const children = this.spawnParent.children;
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            setTimeout(() => {
                child.destroy(); 
            }, 1);
        
        }
    }

    update(deltaTime: number) {

        this._timer -= deltaTime;
        if (this._timer <= 0) {
            this.spawnRandomPrefab();
            this._timer = this.spawnInterval;
        }
    }

    spawnRandomPrefab() {

        const availablePrefabs = this.prefabs.filter((_, index) => this.gameManager.collectArray[index] < 10);
        if (availablePrefabs.length === 0) {
            console.log("All items have reached their maximum count.");
            return;
        }


        const randomPrefab = availablePrefabs[Math.floor(Math.random() * availablePrefabs.length)];
        const newNode = instantiate(randomPrefab);

        const screenWidth = view.getVisibleSize().width;
        const randomX = math.randomRange(-screenWidth / 2, screenWidth / 2);

        newNode.setPosition(randomX, 630, 0);
        this.spawnParent.addChild(newNode);
    }
    protected onDestroy(): void {
        gameCompleteEvent.off('GameComplete', this.gameComplete, this);
    }
}


