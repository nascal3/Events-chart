export interface Event {
  title: string;
  image: string;
  slug: string;
  date: string;
  location: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2024",
    image: "/images/event1.png",
    slug: "react-summit-2024",
    date: "June 15-16, 2024",
    location: "San Francisco, CA",
    time: "9:00 AM - 6:00 PM PST"
  },
  {
    title: "Web Dev Conference",
    image: "/images/event2.png",
    slug: "web-dev-conference-2024",
    date: "July 8-10, 2024",
    location: "New York, NY",
    time: "10:00 AM - 5:00 PM EST"
  },
  {
    title: "JavaScript Hackathon",
    image: "/images/event3.png",
    slug: "js-hackathon-2024",
    date: "August 3-4, 2024",
    location: "Austin, TX",
    time: "9:00 AM - 9:00 PM CST"
  },
  {
    title: "Cloud Native Summit",
    image: "/images/event4.png",
    slug: "cloud-native-summit-2024",
    date: "September 12-14, 2024",
    location: "Seattle, WA",
    time: "8:30 AM - 5:30 PM PST"
  },
  {
    title: "AI & Machine Learning Expo",
    image: "/images/event5.png",
    slug: "ai-ml-expo-2024",
    date: "October 5-7, 2024",
    location: "Boston, MA",
    time: "9:00 AM - 6:00 PM EST"
  },
  {
    title: "DevOps Meetup",
    image: "/images/event6.png",
    slug: "devops-meetup-2024",
    date: "November 15, 2024",
    location: "Chicago, IL",
    time: "6:00 PM - 9:00 PM CST"
  },
  {
    title: "Full Stack Developer Conference",
    image: "/images/event-full.png",
    slug: "fullstack-conf-2024",
    date: "December 1-3, 2024",
    location: "Los Angeles, CA",
    time: "9:00 AM - 5:00 PM PST"
  }
];
