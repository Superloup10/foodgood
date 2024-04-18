import { Buy } from "@/domain/model/buy.dto";
import { Client } from "@/domain/model/client.dto";

export interface Cart {
  id: number;
  created_at: Date;
  client_id: number;
  client?: Client;
  buy?: Buy[];
}
