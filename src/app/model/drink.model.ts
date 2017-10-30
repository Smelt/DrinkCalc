
export class Drink {
    public type: string;
    public time: number;
    public size: number;
    public imagePath: string;


    constructor(type: string, time: number, size: number){
        this.type = type;
        this.time = time;
        this.size = size;
        console.log(type);
        switch(type){
            case 'Beer': {
                this.imagePath="https://static.pexels.com/photos/459392/pexels-photo-459392.jpeg";
                break;
            }
            case 'Mixed': {
                this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
                break;
            }
            case "Wine": {
                this.imagePath="https://static.pexels.com/photos/51341/wine-wine-glass-benefit-from-drink-51341.jpeg";
                break;
            }
            case "Shot": {
                this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
                break;
            }
            default: this.imagePath="https://static.pexels.com/photos/416528/pexels-photo-416528.jpeg";
        }
       
        
    }

}