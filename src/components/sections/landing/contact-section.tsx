import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
  name: string;
  email: string;
  message: string;
  contactType: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onContactTypeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactSection({
  name,
  email,
  message,
  contactType,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onContactTypeChange,
  onSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="px-4 md:px-24 py-12 md:py-20">
      <div className="space-y-8 md:space-y-12">
        <div className="space-y-2 md:space-y-4">
          <Heading title="Contact Us" />
          <p className="mx-auto max-w-lg text-gray-400 text-base md:text-lg text-center">
            Ready to get started? Let's discuss how Anzii can transform your
            learning journey.
          </p>
        </div>

        <Card className="bg-zinc-950 border border-zinc-800 rounded-[25px] md:rounded-[45px] overflow-hidden">
          <CardContent className="flex lg:flex-row flex-col gap-8 md:gap-12 p-8 md:p-16">
            <div className="flex-1">
              <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                <div className="flex sm:flex-row flex-col gap-4 md:gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-zinc-700 flex items-center justify-center ${contactType === "demo" ? "bg-lime-400 border-lime-400" : "bg-zinc-900"}`}
                    >
                      {contactType === "demo" && (
                        <div className="bg-black rounded-full w-2 md:w-3 h-2 md:h-3"></div>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm md:text-base">
                      Book a Demo
                    </span>
                    <input
                      type="radio"
                      name="contactType"
                      value="demo"
                      checked={contactType === "demo"}
                      onChange={(e) => onContactTypeChange(e.target.value)}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-zinc-700 flex items-center justify-center ${contactType === "support" ? "bg-lime-400 border-lime-400" : "bg-zinc-900"}`}
                    >
                      {contactType === "support" && (
                        <div className="bg-black rounded-full w-2 md:w-3 h-2 md:h-3"></div>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm md:text-base">
                      Get Support
                    </span>
                    <input
                      type="radio"
                      name="contactType"
                      value="support"
                      checked={contactType === "support"}
                      onChange={(e) => onContactTypeChange(e.target.value)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name-input" className="font-medium text-gray-300 text-sm md:text-base">
                      Name
                    </label>
                    <Input
                      id="name-input"
                      value={name}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="Your name"
                      className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email-input" className="font-medium text-gray-300 text-sm md:text-base">
                      Email*
                    </label>
                    <Input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => onEmailChange(e.target.value)}
                      placeholder="Your email"
                      className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message-input" className="font-medium text-gray-300 text-sm md:text-base">
                      Message*
                    </label>
                    <Textarea
                      id="message-input"
                      value={message}
                      onChange={(e) => onMessageChange(e.target.value)}
                      placeholder="Tell us about your learning goals..."
                      className="bg-zinc-900 p-3 md:p-4 border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 min-h-[100px] md:min-h-[120px] text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-lime-400 hover:bg-lime-500 px-6 md:px-8 py-3 md:py-4 rounded-xl w-full font-semibold text-black text-base md:text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <div className="text-6xl md:text-8xl">📧</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 