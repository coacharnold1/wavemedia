export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  date: string;
  verified?: boolean;
  source?: string;
  highlight?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "richard-squad",
    name: "Richard M.",
    content: "WaveMedia didn't just capture the weekend they bottled the entire atmosphere and handed it back to us polished, cinematic, and alive. From the first frame to the final cut, their attention to detail was on another level. Every angle, every transition, every beat felt intentional. They understood the vision behind \"The Squad\" and elevated it, turning moments into a full experience you can feel through the screen. The social media content? Clean, sharp, and engaging. The music video? A whole different tier, high energy, visually striking, and executed with precision. It wasn't just production, it was storytelling. Beyond the work itself, the professionalism stood out. Organized, responsive, and easy to work with, while still bringing creative ideas that added real value without overcomplicating the process. If you're looking for a team that can take your concept and transform it into something that actually resonates, WaveMedia is that team.",
    date: "Apr 29, 2026",
    verified: true,
    source: "Thumbtack",
    highlight: true,
  },
  {
    id: "mandy-speaking",
    name: "Mandy E.",
    role: "Dietician",
    content: "I hired Lorenzo to record a recent speaking engagement. He was very responsive with communication and clear on the final deliverables while also including a few extras. Lorenzo came early to make sure everything would be set up and ready to go for my timeslot, and was conscious not to be blocking anyone's views. He recorded multiple camera views for me and handed everything off in a reasonable timeframe. Will definitely work with Lorenzo again!",
    date: "Jun 8, 2026",
    verified: true,
    source: "Thumbtack",
    highlight: true,
  },
  {
    id: "shani-lacrosse",
    name: "Shani K.",
    content: "I had an excellent experience. The videography for my son's lacrosse game was outstanding—high-quality footage, very responsive communication, and extremely professional throughout. He captured great angles and key moments, and the final product exceeded expectations. Highly recommend.",
    date: "Apr 25, 2026",
    verified: true,
    source: "Thumbtack",
    highlight: true,
  },
  {
    id: "ladyj-group",
    name: "LadyJ F.",
    content: "Wave Media filmed for a group I'm a part of. What an amazing experience working with Wave Media. Lorenzo was everywhere without you knowing it, which is the sign of an amazing cinematographer. He captured scenes I didn't even remember and created spectacular clips for use on social media. I will DEFINITELY be using him in the future for my own endeavors and content needs. He is the perfect partner for any video project you have AND he turns it around quickly. PLUS, he is extremely responsive which is a huge bonus in my book.",
    date: "Apr 13, 2026",
    verified: true,
    source: "Thumbtack",
    highlight: true,
  },
  {
    id: "george-affordable",
    name: "George B.",
    content: "Very professional and affordable. I wouldn't work with no one else!",
    date: "May 26, 2026",
    verified: true,
    source: "Thumbtack",
  },
  {
    id: "jesse-creativity",
    name: "Jesse M.",
    content: "Lorenzo took our business to another level with his creativity!",
    date: "Apr 28, 2026",
    verified: true,
    source: "Thumbtack",
  },
  {
    id: "amy-capture",
    name: "Amy N.",
    content: "Wave Media knows exactly how to capture the moment. They will deliver quality content matching your needs. I would 100% recommend!",
    date: "Apr 1, 2026",
    verified: true,
    source: "Thumbtack",
  },
  {
    id: "kierstyn-professional",
    name: "Kierstyn H.",
    content: "Super professional & overall great to work with!",
    date: "Apr 1, 2026",
    verified: true,
    source: "Thumbtack",
  },
  {
    id: "walter-creative",
    name: "Walter F.",
    content: "This dude is very creative mind. Definitely 5 stars.",
    date: "Apr 3, 2026",
    verified: true,
    source: "Thumbtack",
  },
  {
    id: "raye-collaborative",
    name: "Raye W.",
    content: "I love the collaborative approach WAVE Media utilizes. They were able to turn my ideas into a digital narrative that reflected my overall objectives; while at the same time they crafted additional insights which elevated the look and made my project truly stand out.",
    date: "Apr 2026",
    verified: true,
    source: "Thumbtack",
  },
];

export function getHighlightedTestimonials(limit = 3): Testimonial[] {
  return testimonials.filter((t) => t.highlight).slice(0, limit);
}

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}
