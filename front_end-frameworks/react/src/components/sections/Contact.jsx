import { useState } from 'react';
import { FolderCode, Users, Sparkles, User, AtSign, Mail } from 'lucide-react';
import SectionBadge from '../ui/SectionBadge';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

const DEFAULT_FEEDBACK =
  'Fill in the form and we will get back to you shortly.';

function Contact() {
  /* Form data, sending state and dynamic feedback message. */
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [focusedField, setFocusedField] = useState(null);

  /* Basic frontend validation (must also be done on the backend in real apps). */
  const isNameValid = formData.fullName.trim().length >= 2;
  const isEmailValid =
    formData.email.includes('@') && formData.email.includes('.');
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  /* Border color only changes while the field is focused. */
  function fieldBorderClass(fieldName, isValid) {
    if (focusedField !== fieldName) {
      return 'border-slate-800';
    }
    return isValid ? 'border-violet-500' : 'border-red-500';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    setFeedback('Sending your message...');

    /* Simulate a network request with a short delay. */
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormData({ fullName: '', email: '', message: '' });
    setIsSending(false);
    setFeedback('Message sent! We will reply to you soon.');

    /* Return to the default instruction after a short delay. */
    setTimeout(() => setFeedback(DEFAULT_FEEDBACK), 4000);
  }

  return (
    <section id="contact-section" className="relative bg-black py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <SectionBadge symbol="✧" className="text-sm font-medium">
          Start your AI journey ?
        </SectionBadge>

        {/* Title */}
        <div>
          <SectionTitle
            className="text-5xl md:text-7xl"
            top="Ready to Explore"
            bottom="Agentic AI ?"
          />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            external
            className="text-sm md:text-base"
          >
            Enroll at Holberton School ➔
          </Button>

          <Button
            href="#features-section"
            variant="secondary"
            className="text-sm md:text-base"
          >
            Need more information ?
          </Button>
        </div>

        {/* Highlights */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
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
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-6"
          >
            {/* Full name */}
            <div className="text-left">
              <label
                htmlFor="fullName"
                className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
              >
                <User className="h-5 w-5 text-violet-500" />
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                autoComplete="off"
                placeholder="Your full name..."
                className={`w-full rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${fieldBorderClass(
                  'fullName',
                  isNameValid,
                )}`}
              />
            </div>

            {/* Email */}
            <div className="text-left">
              <label
                htmlFor="email"
                className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
              >
                <AtSign className="h-5 w-5 text-violet-500" />
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoComplete="off"
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${fieldBorderClass(
                  'email',
                  isEmailValid,
                )}`}
              />
            </div>

            {/* Message */}
            <div className="text-left">
              <label
                htmlFor="message"
                className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
              >
                <Mail className="h-5 w-5 text-violet-500" />
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                autoComplete="off"
                placeholder="Tell us about your project or learning goals..."
                className={`w-full resize-none rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${fieldBorderClass(
                  'message',
                  isMessageValid,
                )}`}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSending}
              className="rounded-lg bg-violet-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send message'}
            </button>

            {/* Feedback message */}
            <p className="text-center text-sm text-slate-500">{feedback}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
