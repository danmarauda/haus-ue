import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Brain, Shield, Sparkles, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-minimal-background">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-minimal-background via-minimal-background to-minimal-surface opacity-50"></div>
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">REDEFINING REAL ESTATE DISCOVERY</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-minimal-text-secondary">
            OpenHaus.ai is on a mission to transform how people find their perfect home through the power of artificial
            intelligence and immersive experiences.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-minimal-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-6 flex items-center">
                <div className="mr-4 h-px w-12 bg-minimal-accent"></div>
                <h2 className="text-3xl font-medium uppercase tracking-wider">OUR STORY</h2>
              </div>
              <p className="mb-6 text-minimal-text-secondary">
                Founded in 2023, OpenHaus.ai emerged from a simple observation: the traditional real estate search
                process is broken. Too many irrelevant listings, hidden gems that never surface, and a disconnect
                between what people truly want and what they're shown.
              </p>
              <p className="text-minimal-text-secondary">
                Our team of AI specialists, real estate experts, and design innovators came together with a shared
                vision: to create a platform that truly understands your unique needs and preferences, revealing
                properties you'll genuinely love—including exclusive opportunities you won't find elsewhere.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-none border border-minimal-border">
              <Image src="/placeholder.svg?height=400&width=600" alt="OpenHaus.ai team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="mr-4 h-px w-12 bg-minimal-accent"></div>
              <h2 className="text-3xl font-medium uppercase tracking-wider">OUR VALUES</h2>
              <div className="ml-4 h-px w-12 bg-minimal-accent"></div>
            </div>
            <p className="mx-auto max-w-2xl text-minimal-text-secondary">
              The principles that guide everything we do at OpenHaus.ai
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-none border border-minimal-border bg-minimal-card p-6">
              <div className="mb-4 rounded-none bg-minimal-surface p-4 text-minimal-accent inline-block">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium uppercase tracking-wider">INTELLIGENCE</h3>
              <p className="text-minimal-text-secondary">
                We leverage cutting-edge AI to understand nuance, context, and unspoken needs, delivering truly
                personalized results.
              </p>
            </div>

            <div className="rounded-none border border-minimal-border bg-minimal-card p-6">
              <div className="mb-4 rounded-none bg-minimal-surface p-4 text-minimal-accent inline-block">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium uppercase tracking-wider">TRANSPARENCY</h3>
              <p className="text-minimal-text-secondary">
                We believe in clear, honest communication about properties, pricing, and processes—no hidden agendas.
              </p>
            </div>

            <div className="rounded-none border border-minimal-border bg-minimal-card p-6">
              <div className="mb-4 rounded-none bg-minimal-surface p-4 text-minimal-accent inline-block">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium uppercase tracking-wider">INNOVATION</h3>
              <p className="text-minimal-text-secondary">
                We constantly push boundaries to create immersive, intuitive experiences that make property discovery
                delightful.
              </p>
            </div>

            <div className="rounded-none border border-minimal-border bg-minimal-card p-6">
              <div className="mb-4 rounded-none bg-minimal-surface p-4 text-minimal-accent inline-block">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium uppercase tracking-wider">COMMUNITY</h3>
              <p className="text-minimal-text-secondary">
                We're building a platform that connects people with not just properties, but with neighborhoods and
                communities that feel like home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-minimal-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="mr-4 h-px w-12 bg-minimal-accent"></div>
              <h2 className="text-3xl font-medium uppercase tracking-wider">OUR TEAM</h2>
              <div className="ml-4 h-px w-12 bg-minimal-accent"></div>
            </div>
            <p className="mx-auto max-w-2xl text-minimal-text-secondary">Meet the visionaries behind OpenHaus.ai</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "DAN HUMPHREYS",
                role: "CEO & Co-Founder",
                bio: "Former tech executive with a passion for AI and real estate innovation.",
                image: "/placeholder.svg?height=320&width=320",
              },
              {
                name: "Sarah Johnson",
                role: "CTO",
                bio: "AI researcher with 15+ years experience in machine learning and natural language processing.",
                image: "/placeholder.svg?height=320&width=320",
              },
              {
                name: "Marcus Williams",
                role: "Head of Real Estate",
                bio: "Veteran real estate professional with deep industry connections and market expertise.",
                image: "/placeholder.svg?height=320&width=320",
              },
            ].map((member, index) => (
              <div key={index} className="rounded-none border border-minimal-border bg-minimal-card overflow-hidden">
                <div className="relative h-80 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium uppercase tracking-wider">{member.name}</h3>
                  <p className="mb-3 text-minimal-accent">{member.role}</p>
                  <p className="text-minimal-text-secondary">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-none border border-minimal-accent bg-minimal-card p-12 text-center">
          <h2 className="text-3xl font-medium uppercase tracking-wider">JOIN OUR JOURNEY</h2>
          <p className="mx-auto mt-4 max-w-2xl text-minimal-text-secondary">
            Be part of the real estate revolution. Create an account today to experience the future of property search.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/register">
              <Button className="w-full rounded-none bg-minimal-accent text-minimal-background hover:bg-minimal-accent/90 uppercase tracking-wider sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full rounded-none border-minimal-border text-minimal-text-primary hover:border-minimal-accent hover:text-minimal-accent uppercase tracking-wider sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
