import { _decorator, Component, Enum, Node } from 'cc';
import { ItemProperty } from './ItemProperty';
const { ccclass, property } = _decorator;


Enum(ItemProperty);
@ccclass('ItemData')
export class ItemData extends Component {

    @property({ type: ItemProperty })
    itemData: ItemProperty = ItemProperty.Watermelon;
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


