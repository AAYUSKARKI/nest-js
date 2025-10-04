import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    level: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
