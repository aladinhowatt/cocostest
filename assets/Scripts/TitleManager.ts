import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleManager')
export class TitleManager extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onClickGame1Button()
    {
       director.loadScene("Game1Scene");
    }
    onClickGame2Button()
    {
       director.loadScene("Game2Scene");
    }
}


