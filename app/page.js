import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";

export default function Home() {
  return (
    <main className="margin-rule relative">
      <div className="relative z-10 mx-auto max-w-[1120px] px-8 pl-[116px] max-[720px]:pl-14 max-[720px]:pr-5">
        <Nav />
        <Hero />
        <Problem />
        {/* More components go here, one at a time */}
      </div>
    </main>
  );
}
