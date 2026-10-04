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
  default: ['Employee'], 
})
userRoles: string[];
}