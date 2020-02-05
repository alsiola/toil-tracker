import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ToilEvent {
    static create({ user_sub }: Pick<ToilEvent, "user_sub">) {
        const toilEvent = new ToilEvent();
        toilEvent.user_sub = user_sub;
        toilEvent.start = new Date();
        return toilEvent;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_sub!: string;

    @Column({ type: "timestamptz" })
    start!: Date;

    @Column({ type: "timestamptz", nullable: true })
    end: Date | null = null;
}
