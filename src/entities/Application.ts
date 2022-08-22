import { randomUUID } from 'crypto';

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import BaseEntity from '../baseClasses/BaseEntity';
import UserRole from '../enums/UserRoleEnum';
import User from './User';

@Entity('applications')
class Application implements BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, default: [UserRole.APP_ADMIN] })
    private allowed_roles_to_create_users: string;

    @Column({ nullable: false, default: UserRole.USER })
    default_role_new_users: UserRole;

    @CreateDateColumn({
        // type: 'datetime',
        // type: 'timestamp' || 'text',
        // default: () => 'NOW()',
    })
    created_at: Date;

    @UpdateDateColumn({
        // type: 'datetime',
        // type: 'timestamp' || 'text',
        // default: () => 'NOW()',
        onUpdate: `'${new Date().getTime()}'`,
    })
    updated_at: Date;

    @OneToMany(() => User, (user) => user.application_id)
    users: User[];

    get allowedRolesToCreateUsers() {
        return this.allowed_roles_to_create_users.split(',') as UserRole[];
    }

    set allowedRolesToCreateUsers(roles: UserRole[]) {
        this.allowed_roles_to_create_users = roles.join(',');
    }

    constructor() {
        if (!this.id) {
            this.id = randomUUID();
        }
    }
}

export default Application;
