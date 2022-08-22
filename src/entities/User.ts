import { randomUUID } from 'crypto';

import {
    Entity,
    Column,
    Unique,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Application from './Application';

import UserRole from '../enums/UserRoleEnum';
import BaseEntity from '../baseClasses/BaseEntity';

@Entity('applications_users')
@Unique('unique user by application', ['email', 'application_id'])
class User implements BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    is_verified: boolean;

    @Column({ nullable: false })
    application_id: string;

    @Column({ type: 'varchar', default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: 'now()' })
    updated_at: Date;

    @ManyToOne(() => Application, (app) => app.users)
    @JoinColumn({ name: 'application_id' })
    application: Application;

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            is_verified: this.is_verified,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    constructor() {
        if (!this.id) {
            this.id = randomUUID();
        }
    }
}

export default User;
