import { FolderCode, Users, Sparkles, User, AtSign, Mail } from 'lucide-react';

function About() {
  return (
    <section id="about-section" className="relative bg-black py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          ✧ Strat your AI journey ? ✧
        </div>

        {/* Title */}
        <div>
          <h2 className="text-5xl leading-none font-black tracking-tight md:text-7xl">
            <span className="block text-slate-50">Ready to Explore</span>
            <span className="block text-violet-300">Agentic AI ?</span>
          </h2>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact-section"
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-slate-50 shadow-lg shadow-violet-500/40 transition-colors hover:bg-violet-600 md:text-base"
          >
            Enroll at Holberton School ➔
          </a>

          <a
            href="#features-section"
            className="rounded-md border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-50 transition-colors hover:bg-slate-900 md:text-base"
          >
            Need more information ?
          </a>
        </div>

        {/* Highlights */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <FolderCode className="text-violet-500" size={16} />
            <span className="text-slate-500">Project-based learning</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="text-violet-500" size={16} />
            <span className="text-slate-500">Peer learning environment</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="text-violet-500" size={16} />
            <span className="text-slate-500">AI-powered workflows</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8 w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <form className="flex flex-col gap-6">
            {/* Full name */}
            <div className="text-left">
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-50">
                <User className="h-5 w-5 text-violet-500" />
                Full name
              </label>

              <input
                type="text"
                placeholder="Your full name..."
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="text-left">
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-50">
                <AtSign className="h-5 w-5 text-violet-500" />
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div className="text-left">
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-50">
                <Mail className="h-5 w-5 text-violet-500" />
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your project or learning goals!"
                className="w-full resize-none rounded-lg border border-slate-800 bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="rounded-lg bg-violet-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-600"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default About;
