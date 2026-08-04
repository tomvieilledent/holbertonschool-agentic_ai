import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <hr className="w-full border-slate-800" />
      <About />
      <Features />

      <section id="contact-section" className="relative bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-50">
            Contact section
          </h2>
        </div>
      </section>
    </>
  );
}

export default App;
