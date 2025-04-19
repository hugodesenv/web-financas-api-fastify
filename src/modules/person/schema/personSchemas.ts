import { Type } from "@sinclair/typebox";

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
  nickname: Type.String(),
  active: Type.Boolean(),
  type: Type.Object({
    client: Type.Boolean(),
    employee: Type.Boolean(),
    company: Type.Boolean()
  })
});

export const PersonIDSchema = Type.Object({
  id: Type.Integer()
});