import ExploreBtn from "@/app/components/ExploreBtn";
import EventCard from "@/app/components/EventCard";

import { events } from "@/lib/constants";

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub for Every dev Event <br /> Every event you can't miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, Workshops, and more</p>

            <ExploreBtn />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events.map((event, index) => (
                        <li key={index}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Page
