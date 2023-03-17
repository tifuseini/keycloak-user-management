import {
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    Entity,
    BeforeInsert
} from 'typeorm';

@Entity()
class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    departmentName : string;

    @Column()
    departmentDescription : string;

    @Column()
    createdBy : string;

    @Column()
    createdDate : Date;

    @Column()
    updatedBy : string;

    @Column()
    updatedDate : Date;


    @BeforeInsert()
    presave() : void {
        this.createdBy = "System",
        this.createdDate = new Date()
    
    };
}


