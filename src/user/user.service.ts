import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async createUser(registerUserDto: RegisterDto) {
        try {
            return await this.userModel.create(registerUserDto);
        } catch (error) {
           const DUP_KEY_ERROR_CODE = 11000;
           if (error.code === DUP_KEY_ERROR_CODE) {
                throw new ConflictException('Email already exists');
           } 
            throw error;
        }
    }
}
