import { BookOpen, Star, Target, WandSparkles } from "lucide-react";

const statsData = [
  { Icon: WandSparkles, label: "AI-powered" },
  { Icon: BookOpen, label: "Easy to use" },
  { Icon: Star, label: "Rating" },
  { Icon: Target, label: "Retention rate" },
];

export default function FeatureSummarySection() {
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