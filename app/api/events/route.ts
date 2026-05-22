import {NextRequest, NextResponse} from "next/server";
import {connectToDB} from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
      await connectToDB();

      const formData = await req.formData();
      let event;

      try {
          event = Object.fromEntries(formData.entries());
      } catch (error) {
          console.error(error);
          return NextResponse.json({ message: 'Invalid JSON format data', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
      }

      const createdEvent = await Event.create(event);

       return  NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });

  } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Event creation failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}