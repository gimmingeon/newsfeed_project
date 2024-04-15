import { IsNumber, IsString } from "class-validator";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Member } from "src/member/entities/member.entity";
import { ChatRoom } from "src/chat/entities/chat_rooms.entity";
import { Place } from "../entities/place.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { PlanType } from "../types/plan.type";
@Entity({ name: "plan" })
export class Plan {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    @Column()
    name: string;
    @Column({ type: 'int', nullable: false })
    userId: number;
    @Column({ nullable: true })
    totaldate: number;
    @Column({ nullable: true })
    totalmoney: number;
    @Column({ type: 'varchar', nullable: true })
    image: string;
    @Column({type: "enum", enum: PlanType, default: PlanType.NonCreate})
    type: PlanType;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @OneToMany(() => Schedule, (schedule) => schedule.plan, { onDelete: "CASCADE" })
    schedule: Schedule[];
    @OneToMany(() => Place, (place) => place.plan, { onDelete: "CASCADE" })
    place: Place[];
    @OneToMany(() => Member, (member) => member.plan, { onDelete: "CASCADE" })
    member: Member[];
    @OneToOne(() => ChatRoom, (room) => room.plan)
    room: ChatRoom;
    @OneToMany(() => Category, (category) => category.plan)
    category : Category[];
    @ManyToOne(() => User, (user) => user.plan, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}