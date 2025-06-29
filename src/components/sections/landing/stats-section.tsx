import { BookOpen, Star, Target, Users } from "lucide-react";

const statsData = [
  { Icon: Users, label: "50,000+ learners" },
  { Icon: BookOpen, label: "2M+ flashcards" },
  { Icon: Star, label: "4.9/5 rating" },
  { Icon: Target, label: "89% retention rate" },
];

export default function StatsSection() {
  return (
    <section className="px-4 md:px-24 py-4 md:py-8">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60 text-gray-500 text-sm md:text-lg">
        {statsData.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <stat.Icon className="w-4 md:w-5 h-4 md:h-5" />
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 