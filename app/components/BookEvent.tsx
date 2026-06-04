'use client'
import React, {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

const BookEvent = ({eventId, slug}: {eventId: string, slug: string} ) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const { booking, error } = await createBooking({eventId, slug, email});

        if(error) {
            console.error(error);
            posthog.captureException(error)
            return;
        }

        if(booking) {
            setSubmitted(true);
            posthog.capture('event_booked', {eventId, slug, email});
        }
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) :(
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    )
}
export default BookEvent
