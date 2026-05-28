'use server';

import {connectToDB} from "@/lib/mongodb";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectToDB();

        const event = await Event.findOne({ slug });

        if (!event) {
            return [];
        }

        return await Event.find({ _id: { $ne: event._id }, tags: {$in: event.tags} });

    } catch (error) {
        console.error(error);
        return [];
    }

}