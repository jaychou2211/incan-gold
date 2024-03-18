import { Entity, Column, PrimaryColumn, OneToMany, Relation } from "typeorm"
import { CardData } from "./card.entity"
import { ExplorerData } from "./explorer.entity"

@Entity()
export class IncanGoldData {
    @PrimaryColumn("uuid")
    id: string

    @Column("int", { nullable: true })
    round: number

    @Column("int", { nullable: true })
    turn: number

    @Column("simple-json", { nullable: true })
    tunnel: CardData[]

    @Column("simple-json")
    deck: CardData[]

    @Column("simple-json", { nullable: true })
    trashDeck: Record<number, CardData[]>

    @OneToMany(() => ExplorerData, (explorer) => explorer.incanGold, {
        cascade: true,
        eager: true,
    })
    explorers: Relation<ExplorerData>[]
}
