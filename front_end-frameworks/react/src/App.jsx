import Header from "./components/Header"
import Hero from "./sections/Hero"
import About from"./sections/About"

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <About />

        <section id="insights-section">
          Insights section
        </section>

        <section id="contact-section">
          Contact section
        </section>
      </main>
    </>
  )
}

export default App