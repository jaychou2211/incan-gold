import { Entity, PrimaryColumn, Column } from "typeorm"
import { Choice } from "../../../domain/index"

@Entity()
export class Explorer {
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

  @Column("uuid")
  incanGold: string
}
