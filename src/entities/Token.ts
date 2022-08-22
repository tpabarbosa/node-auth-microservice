import { randomUUID } from 'crypto';

import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import BaseEntity from '../baseClasses/BaseEntity';

@Entity('tokens')
class Token implements BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    context: string;

    @Column({ nullable: false })
    token: string;

    @CreateDateColumn({ nullable: true })
    expires_at: Date;

    constructor() {
        if (!this.id) {
            this.id = randomUUID();
        }
    }
}

export default Token;
