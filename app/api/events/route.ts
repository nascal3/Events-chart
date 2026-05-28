import {NextRequest, NextResponse} from "next/server";
import {connectToDB} from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
import {arrayBuffer} from "node:stream/consumers";
import {error} from "next/dist/build/output/log";

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

      const file = formData.get('image') as File;
      if (!file) {
        return NextResponse.json({ message: 'Image is required' }, { status: 400 });
      }
  const tags = JSON.parse(formData.get('tags') as string);
  // const agenda = JSON.parse(formData.get('agenda') as string);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({resource_type: "image", folder: "event_images",}, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        }).end(buffer);
      });

      event.image = (uploadResult as { secure_url: string }).secure_url;

      const createdEvent = await Event.create({
        ...event,
        tags
      });

       return  NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });

  } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Event creation failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export async function GET() {
    try {
        await connectToDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Event retrieval failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }

}