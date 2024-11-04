import { _decorator, Component, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioClip)
    popSound: AudioClip = null; 
    @property(AudioClip)
    winSound: AudioClip = null; 
    @property(AudioClip)
    getItemSound: AudioClip = null; 
    @property(AudioClip)
    fullItemSound: AudioClip = null; 
    @property(AudioClip)
    buttonSound: AudioClip = null; 

    

    private audioSource: AudioSource = null; 

    start() {
       
        this.audioSource = this.getComponent(AudioSource);
    }

    playBubbleSound() {
        if (this.audioSource) {
           this.audioSource.playOneShot(this.popSound);
        }
    }

    playWinSound() {
        if (this.audioSource) {
           this.audioSource.playOneShot(this.winSound);
        }
    }

    playGetItemSound() {
        if (this.audioSource) {
           this.audioSource.playOneShot(this.getItemSound);
        }
    }

    playGetFullItemSound() {
        if (this.audioSource) {
           this.audioSource.playOneShot(this.fullItemSound);
        }
    }

    playButtonSound() {
        if (this.audioSource) {
           this.audioSource.playOneShot(this.buttonSound);
        }
    }
}