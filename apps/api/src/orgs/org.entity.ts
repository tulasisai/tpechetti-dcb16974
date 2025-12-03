import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Org {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  parentId: string;

  @Column()
  name: string;
}
