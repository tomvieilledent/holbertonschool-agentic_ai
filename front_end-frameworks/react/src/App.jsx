import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import Insights from './sections/Insights';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <hr className="w-full border-slate-800" />
      <About />
      <Features />
      <Insights />

      <section id="contact-section" className="relative bg-slate-950 py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl leading-none font-black tracking-tight text-slate-50 md:text-5xl">
            Contact section
          </h2>
        </div>
      </section>
    </>
  );
}

export default App;
