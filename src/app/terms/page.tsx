export const metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <article className="rounded-2xl border border-[#E5EEF5] bg-white px-6 py-10 shadow-sm sm:px-10">
        <h1 className="font-display text-4xl text-[#0B151F]">Terms of service</h1>
        <p className="mt-2 text-sm text-[#677480]">LulaGazette · Lulamile Mkhungela</p>
        <div className="prose-legal mt-8 space-y-4 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-[#0B151F] [&_ul]:list-disc [&_ul]:pl-5">
          <p>
            Welcome to LulaGazette. These Terms cover access to this South African legal information product. If you
            use the site, you agree to them. If you don’t agree, please don’t use the site.
          </p>
          <h2>1. Nature of the service</h2>
          <p>
            LulaGazette is educational legal information focused on the Republic of South Africa.{" "}
            <strong>It is not a law firm</strong> and it does not create an attorney–client relationship. I build the
            product and can walk you through how it works or how it might integrate with your tools — I don’t appear
            for clients.
          </p>
          <h2>2. Work in progress</h2>
          <p>
            The platform is under active development and is not fully certified for every regulated use case. See
            Platform status for the honest picture.
          </p>
          <h2>3. Acceptable use</h2>
          <ul>
            <li>Don’t misuse the service, introduce malware, or attempt unauthorised access.</li>
            <li>Don’t treat curated extracts as the only authority for filings without checking official texts.</li>
            <li>Don’t upload confidential client files into demo environments.</li>
          </ul>
          <h2>4. No warranties</h2>
          <p>
            Content is provided “as is” for education and product demonstration. Statutes change; judgments are
            summarised.
          </p>
          <h2>5. Governing law</h2>
          <p>These Terms are governed by the laws of the Republic of South Africa.</p>
          <h2>6. Contact</h2>
          <p>
            Use the <a href="/contact">Contact Us</a> page for address, email and phone — those details appear only
            there.
          </p>
        </div>
      </article>
    </div>
  );
}
