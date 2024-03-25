import { Entity, Column, PrimaryColumn } from "typeorm"
import { Card } from "./card"

@Entity()
export class IncanGold {
  @PrimaryColumn("uuid")
  id: string

  @Column("int", { nullable: true })
  round: number

  @Column("int", { nullable: true })
  turn: number

  @Column("simple-json", { nullable: true })
  tunnel: Card[]

  @Column("simple-json")
  deck: Card[]

  @Column("simple-json", { nullable: true })
  trashDeck: Record<number, Card[]>
};