export default function Testimonial() {
  return (
    <section id="testimonial" className="border-b border-border py-16">
      <div className="grid grid-cols-[1fr_auto] items-center gap-6 rounded-lg border border-border bg-paper p-10 max-[720px]:grid-cols-1">
        <div>
          <blockquote className="m-0 font-serif text-[21px] italic leading-[1.45] text-ink">
            I used to keep three tabs open just to know who owed me money. Now I
            keep one, and it tells me.
          </blockquote>
          <cite className="mt-4 block font-mono text-[12.5px] not-italic text-ink-soft">
            — A. Reyes, freelance photographer
          </cite>
        </div>

        <div
          className="whitespace-nowrap rounded-md border-[3px] border-stamp px-3.5 py-2 font-mono text-lg font-bold uppercase tracking-[0.09em] text-stamp"
          style={{ transform: "rotate(-9deg)" }}
        >
          Settled
        </div>
      </div>
    </section>
  );
}
