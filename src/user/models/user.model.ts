import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from '@prisma/client';
import { BaseModel } from '../../common/models/base.model';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType({
  description: 'User Model',
  isAbstract: true,
})
export class UserModel extends BaseModel implements User {
  @Field(() => String, {
    description: 'User Name',
  })
  name: string;

  @Field(() => String, {
    description: 'user email',
  })
  email: string;

  @Field(() => UserRole, {
    description: 'User Role',
  })
  role: UserRole;

  @Field(() => String, {
    description: 'user password',
  })
  password: string;
}
