import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";
import { User } from "../../auth/entities/user.entity.js";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text')
  phoneNumber: string;

  @Column('text')
  email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  photoUrl: string;

  @ManyToOne(() => Location, (location) => location.employees)
  location: Location;
  
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId'})
  user: User;
}