
export class Drink {
    public type: string;
    public time: number;
    public size: number;
    public imagePath: string;


    constructor(type: string, time: number, size: number){
        this.type = type;
        this.time = time;
        this.size = size;
        switch(type){
            case "Beer": this.imagePath="https://static.pexels.com/photos/459392/pexels-photo-459392.jpeg";
            case "Mixed": this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
            case "Wine": this.imagePath="https://static.pexels.com/photos/51341/wine-wine-glass-benefit-from-drink-51341.jpeg";
            case "Shot": this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
            default: this.imagePath="https://static.pexels.com/photos/416528/pexels-photo-416528.jpeg";
        }
        if(type == "Wine"){
            this.imagePath="https://static.pexels.com/photos/51341/wine-wine-glass-benefit-from-drink-51341.jpeg";
        }
        
    }

}