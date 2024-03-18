import { Entity, PrimaryColumn, Column, ManyToOne, Relation } from "typeorm"
import { IncanGoldData } from "./incan-gold.entity"
import { Choice } from "../../domain/IncanGold"

@Entity()
export class ExplorerData {
    @PrimaryColumn('uuid')
    id: string

    @Column({
        type: "varchar",
        enum: Choice,
        default: Choice.NotSelected,
    })
    choice: Choice

    @Column("bit", { default: true })
    inTent: boolean

    @Column("int", { default: 0 })
    gemsInBag: number

    @Column("int", { default: 0 })
    gemsInTent: number

    @Column("int", { default: 0 })
    totalPoints: number

    @Column("simple-array", { nullable: true })
    artifacts: string[]

    @ManyToOne(() => IncanGoldData, (incanGold) => incanGold.explorers, { onDelete: "CASCADE" })
    incanGold: Relation<IncanGoldData>
}
