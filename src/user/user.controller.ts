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
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger/dist';

@Controller('/user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post('/create')
    @ApiProperty({type : CreateUserDto})
    async createUser(@Body() createUser : CreateUserDto) : Promise<User>{
        return await this.userService.createUser(createUser);
    }

    @Get('all')
    @ApiOperation({summary : 'Find all users'})
    @ApiProperty({type : [User]})
    async findAllUsers() : Promise<User[]>{
        return await this.userService.findAllUsers();
    }

    @Get('/:id')
    @ApiOperation({summary : 'Find user by id'})
    async findUserById(@Param('id') id : number) : Promise<User>{
        return await this.userService.findUserById(id);
    }

    @Patch('/:id')
    @ApiOperation({summary : 'Update user by id'})
    async updateUser(@Param('id') id : number, @Body() updateUser : CreateUserDto) : Promise<User>{
        return await this.userService.updateUser(id, updateUser);
    }

    @Delete('/delete/:id')
    @ApiOperation({summary : 'Delete user by id'})
    async deleteUser(@Param('id')id : number) : Promise<void>{
        return await this.userService.deleteUser(id);
    }

}
