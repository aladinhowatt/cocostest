import { _decorator, Component, EventTouch, Input, input, Node, UITransform, v3 } from 'cc';
import { gameCompleteEvent } from './Game2Manager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    
    @property
    speed: number = 5;

    private targetX: number | null = null;

    private isGameComplete:boolean = false;

    start() {
     
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        gameCompleteEvent.on('GameComplete', this.gameComplete, this);
    }
    gameComplete() {
       this.isGameComplete  = true;

       input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
       input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
       input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
       input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
    
        this.updateTargetPosition(event);
    }

    onTouchMove(event: EventTouch) {
     
        this.updateTargetPosition(event);
    }

    onTouchEnd(event: EventTouch) {
      
        this.targetX = null;
    }

    updateTargetPosition(event: EventTouch) {
       
        const touchPos = event.getUILocation();

      
        const worldTouchPos = v3(touchPos.x, touchPos.y, 0);

       
        const parentTransform = this.node.parent!.getComponent(UITransform)!;
        const localTouchPos = parentTransform.convertToNodeSpaceAR(worldTouchPos);

      
        this.targetX = localTouchPos.x;
    }

    update(deltaTime: number) {
        if( this.isGameComplete === true)return;
        if (this.targetX !== null) {
            const currentPosition = this.node.position;
            const targetPositionX = this.targetX;

         
            const direction = targetPositionX > currentPosition.x ? 1 : -1;
            const newPositionX = currentPosition.x + direction * this.speed * deltaTime;

          
            if ((direction === 1 && newPositionX >= targetPositionX) || (direction === -1 && newPositionX <= targetPositionX)) {
                this.node.setPosition(targetPositionX, currentPosition.y, currentPosition.z);
            } else {
                this.node.setPosition(newPositionX, currentPosition.y, currentPosition.z);
            }
        }
    }

    protected onDestroy(): void {
      

        gameCompleteEvent.off('GameComplete', this.gameComplete, this);
    }
}
