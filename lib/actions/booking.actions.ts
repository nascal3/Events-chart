'use server';

import {connectToDB} from "@/lib/mongodb";
import {Booking} from "@/database";

export const createBooking = async ({eventId, slug, email}: {eventId: string, slug: string, email: string}) => {
    try {
        await connectToDB();
        const booking = await Booking.create({eventId, slug, email});

        return {booking: JSON.parse(JSON.stringify(booking))};
    } catch (error) {
        console.error(error);
        return {error: error instanceof Error ? error.message : 'Unknown error'}
    }
}