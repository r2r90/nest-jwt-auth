import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Base Model',
  isAbstract: true,
})
export class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
