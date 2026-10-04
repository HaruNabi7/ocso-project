import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column('text')
  userEmail: string;
  @Column('text')
  userPassword: string;
  @Column('text', {
  array: true,
  default: ['Employee'], // o el rol base que manejes: ['User'], ['Admin']
})
userRoles: string[];
}