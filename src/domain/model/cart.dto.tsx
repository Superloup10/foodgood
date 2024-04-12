import { Client } from "./client.dto";

export interface Cart{

  id: number,
  created_at:Date,
  client_id:number,
  client?:Client,

 
}