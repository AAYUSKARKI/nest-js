import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authService.registerUser(registerUserDto)
        return token;
    }

    @Post('login')
    login() {
        const response = this.authService.loginUser()
        return response
    }
}
