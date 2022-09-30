import { Status } from "../enum/Status.enum";
import { User } from "./user";

export interface Server{
    data: any;
    id: number,
    ipAddress: string,
    name: string,
    memory:string;
    type: string;
    imageUrl: string;
    status: Status;
    user: any;
}