import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType()
@Entity()
export class EventAttendee extends BaseEntity {
  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => Event, (e) => e.attendees)
  event: Event;

  @PrimaryColumn()
  attendeeId: number;

  @ManyToOne(() => User, (s) => s.attending_events)
  attendee: User;
}
