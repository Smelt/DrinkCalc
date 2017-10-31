
export class Drink {
    public type: string;
    public time: number;
    public serving: number;
    public imagePath: string;
    public calories: number;


    constructor(type: string, time: number, size: number){
        this.type = type;
        this.time = time;
        this.serving = size;
        console.log(type)
        switch(type){
            case 'Beer': {
                this.imagePath="https://static.pexels.com/photos/459392/pexels-photo-459392.jpeg";
                this.calories = size * 130;
                break;
            }
            case 'Mixed': {
                this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
                this.calories = size * 140;
                break;
            }
            case "Wine": {
                this.imagePath="https://static.pexels.com/photos/51341/wine-wine-glass-benefit-from-drink-51341.jpeg";
                this.calories = size * 130;
                break;
            }
            case "Shot": {
                this.imagePath="https://static.pexels.com/photos/416520/pexels-photo-416520.jpeg";
                this.calories = size * 90;
                break;
            }
            default: this.imagePath="https://static.pexels.com/photos/416528/pexels-photo-416528.jpeg";
        }
       
        
    }

}