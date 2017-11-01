export class User{


    public firstName: string;
    public lastName: string;
    public sexConstant: number;
    public weight: number;
    public sex: string;
    public dui: number;


    constructor(firstName: string, lastName: string, sex: string, state: string, weight: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.weight = weight;
        this.sex = sex;
        if(sex === "male"){
            this.sexConstant = .68;
        }
        else{
            this.sexConstant = .55;
        }
        if(state === "Maryland"){
            this.dui = .08
        }
        else{
            this.dui = .04;
        }
    }

    

}