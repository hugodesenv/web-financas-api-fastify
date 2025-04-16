import { Type } from "@sinclair/typebox";

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
  nickname: Type.String(),
  active: Type.Boolean(),
});