import Heading from "@/components/common/heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/landing-data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 md:px-24 py-12 md:py-20">
      <div className="space-y-8 md:space-y-12">
        <div className="flex items-center gap-6 md:gap-10">
          <div className="space-y-2 md:space-y-4">
            <Heading size="2xl md:3xl">Testimonials</Heading>
            <p className="max-w-lg text-gray-400 text-base md:text-lg">
              Hear from learners who transformed their study habits with
              Anzii.
            </p>
          </div>
        </div>

        <Card className="bg-black border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
          <CardContent className="p-8 md:p-16">
            <div className="gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3">
              {testimonials.map((testimonial, testimonialIndex) => (
                <div
                  key={`testimonial-${testimonialIndex}`}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="relative bg-zinc-950 p-6 md:p-8 border border-zinc-800 rounded-[20px] md:rounded-[30px]">
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="-bottom-2 left-6 md:left-8 absolute bg-zinc-950 border-zinc-800 border-b border-l w-3 md:w-4 h-3 md:h-4 rotate-45 transform"></div>
                  </div>
                  <p className="font-medium text-gray-100 text-sm md:text-base">
                    {testimonial.author}
                    <br />
                    <span className="text-lime-300">{testimonial.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 