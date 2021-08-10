import {
  Arg,
  Int,
  Query,
  Mutation,
  Resolver,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { Event } from "../entities/Event";

@InputType()
class EventInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  hostId: number;
}

// @ObjectType()
// class PaginatedEvents {
//   @Field(() => [Post])
//   posts: Post[];

//   @Field(() => Boolean)
//   hasMore: boolean;
// }

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    // @Arg("limit", () => Int) limit: number,
    // @Arg("cursor", () => String, { nullable: true }) cursor: string | null

    return Event.find({});

    // const realLimit = Math.min(50, limit);
    // const realLimitPlusOne = realLimit + 1;
    // const replacements: any[] = [realLimitPlusOne];
    // if (cursor) {
    //   replacements.push(new Date(parseInt(cursor)));
    // }
    // const posts = await getConnection().query(
    //   `
    //     select p.*,
    //     json_build_object(
    //       'id', u.id,
    //       'username', u.username,
    //       'email', u.email,
    //       'createdAt', u."createdAt",
    //       'updatedAt', u."updatedAt"
    //     ) creator
    //     from post p
    //     inner join "user" u on u.id = p."creatorId"
    //     ${cursor ? `where p."createdAt" < $2` : ""}
    //     order by p."createdAt" DESC
    //     limit $1
    //   `,
    //   replacements
    // );
    // return {
    //   posts: posts.slice(0, realLimit),
    //   hasMore: posts.length === realLimitPlusOne,
    // };
  }

  @Query(() => Event, { nullable: true })
  event(@Arg("id", () => Int) id: number): Promise<Event | undefined> {
    return Event.findOne(id, { relations: ["host"] });
  }

  @Mutation(() => Event)
  @UseMiddleware(isAuth)
  async createEvent(
    @Ctx() { req }: MyContext,
    @Arg("input") input: EventInput
  ): Promise<Event> {
    return Event.create({ ...input, hostId: req.session.userId }).save();
  }

  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Arg("id") id: number,
    @Arg("title") title: string
  ): Promise<Event | null> {
    const event = await Event.findOne(id);
    if (!event) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Event.update({ id }, { title });
    }
    return event;
  }

  @Mutation(() => Boolean)
  async deleteEvent(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const event = await Event.findOne(id);

    if (!event) {
      return false;
    }

    if (event.hostId != req.session.userId) {
      throw new Error("not authorized");
    }

    await Event.delete({ id, hostId: req.session.userId });
    return true;
  }
}
