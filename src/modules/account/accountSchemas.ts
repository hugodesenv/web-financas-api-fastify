import { Type } from "@sinclair/typebox";

export const AuthenticationAccountSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

export const CreateAccountSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
  active: Type.Boolean()
});