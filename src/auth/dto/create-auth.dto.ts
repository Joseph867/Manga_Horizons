import {IsEmail, IsString, Length, Min, NotContains} from "class-validator";

export class CreateAuthDto {
    @IsString()
    @NotContains(' ')
    @Length(1, 255)
    profilename: string;
    
    @IsString()
    @IsEmail({}, { message: 'Nem megfelelő email formátum!'})
    @Length(1, 255)
    email: string
    
    
    @IsString()
    @Length(1, 255) 
    password: string
}
