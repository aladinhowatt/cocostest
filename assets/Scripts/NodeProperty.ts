import { _decorator, Component, Enum } from 'cc';
const { ccclass, property } = _decorator;
import { ItemType } from './ItemType'; 

Enum(ItemType);

@ccclass('NodeProperty')
export class NodeProperty extends Component {

 
    @property({ type: ItemType })
    itemType: ItemType = ItemType.Duck;

}