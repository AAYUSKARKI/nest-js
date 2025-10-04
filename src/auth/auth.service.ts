import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { LoginDto } from './dto/loginUser.dto';

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

    async loginUser(loginUserDto:LoginDto) {
        const { email, password } = loginUserDto;
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const payload = { sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }

}
