import { IsString, Length, NotContains} from "class-validator";

export class logindto {
    @IsString()
    @NotContains(' ')
    @Length(1, 255)
    profilename: string;
    
    @IsString()
    @Length(1, 255) 
    password: string
}
