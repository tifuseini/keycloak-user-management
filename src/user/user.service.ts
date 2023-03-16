import { Injectable,NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findAllUsers() : Promise<User[]>{
        return await this.userRepository.find();
    }

    async findUserById(id : number) : Promise<User>{
        return await this.userRepository.findOne({
            where : {id : id}
        });
    }

    async createUser(createUser : CreateUserDto) : Promise<User>{
        const user = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;
        user.age = createUser.age;
        try{
            return await this.userRepository.save(user);
        }catch(error){
            throw new NotAcceptableException(error);
        }
    }

    async updateUser(id : number, updateUser : CreateUserDto) : Promise<User>{
        const user = await this.userRepository.findOne({
            where : {id : id}
        });
        if(!user){
            throw new NotAcceptableException("User not found");
        }
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.email = updateUser.email;
        user.age = updateUser.age;
        try{
            return await this.userRepository.save(user);
        }catch(error){
            throw new NotAcceptableException(error);
        }
    }

    async deleteUser(id : number) : Promise<void>{
        await this.userRepository.delete(id);
    }
}