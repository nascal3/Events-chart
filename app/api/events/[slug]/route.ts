import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Event from "@/database/event.model";
import { parseStringify } from "@/lib/utils";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/events/[slug]">) {
    try {
        const { slug } = await ctx.params;

        // Sanitize slug: trim, lowercase, and remove non-alphanumeric/hyphen characters
        const sanitizedSlug = slug
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "");

        await connectToDB();

        const event = await Event.findOne({ slug: sanitizedSlug }).lean();

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ event: parseStringify(event) }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Event retrieval failed", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
