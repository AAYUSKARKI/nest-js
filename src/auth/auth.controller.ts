import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authService.registerUser(registerUserDto)
        return token;
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        const token = await this.authService.loginUser(loginUserDto)
        return token;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.sub;

        const user = await this.userService.findById(userId);
        return { user };
    }
}
