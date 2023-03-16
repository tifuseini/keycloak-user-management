import {
    Controller,
    Post,
    Get,
    Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Param, Patch } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post('create')
    async createUser(@Body() createUser : CreateUserDto) : Promise<User>{
        return await this.userService.createUser(createUser);
    }

    @Get('all')
    async findAllUsers() : Promise<User[]>{
        return await this.userService.findAllUsers();
    }

    @Get('/:id')
    async findUserById(@Param('id') id : number) : Promise<User>{
        return await this.userService.findUserById(id);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id : number, @Body() updateUser : CreateUserDto) : Promise<User>{
        return await this.userService.updateUser(id, updateUser);
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id')id : number) : Promise<void>{
        return await this.userService.deleteUser(id);
    }

}
