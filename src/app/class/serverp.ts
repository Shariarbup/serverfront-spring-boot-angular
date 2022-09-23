export class Serverp {
    public id: number;
    public ipAddress: string;
    public name : string;
    public memory: string;
    public type:string;
    public status:string;

    constructor( id:number,  ipAddress:string,name:string, memory:string, type:string,status:string){ 
        this.id = id;
        this.name = name;
        this.ipAddress = ipAddress;
        this.memory = memory;
        this.type = type;
        this.status = status;
    }
    // public Student(){}
    // constructor();
}