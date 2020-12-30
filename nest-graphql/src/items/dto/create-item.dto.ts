import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ItemType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @Field(() => Int)
  @IsNumber()
  readonly price: number;
  @Field()
  @IsString()
  readonly description: string;
}