import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    async registerUser(registerUserDto: RegisterDto) {
        console.log("registerUserDto", registerUserDto);
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        
        const user = await this.userService.createUser({...registerUserDto, password: hash});
        const payload = { sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        console.log(token, "token");
        return { access_token: token };
    }

    loginUser() {
        return 'User logged in';
    }
}
