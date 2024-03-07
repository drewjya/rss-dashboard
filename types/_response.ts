import type { ServerResponseData } from ".";
import type { TokenDto, UserDto } from "./_dto";

export type LoginResponse = ServerResponseData<{
  name: string;
  token: string;
}>;

export type TokenResponse = ServerResponseData<TokenDto>;

export type UserResponse = ServerResponseData<UserDto>;
