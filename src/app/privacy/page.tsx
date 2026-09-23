export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <article className="rounded-2xl border border-[#E5EEF5] bg-white px-6 py-10 shadow-sm sm:px-10">
        <h1 className="font-display text-4xl text-[#0B151F]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#677480]">LulaGazette · Lulamile Mkhungela</p>
        <div className="prose-legal mt-8 space-y-4 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-[#0B151F] [&_ul]:list-disc [&_ul]:pl-5">
          <p>
            I’m building LulaGazette toward POPIA-aligned practice. This version keeps a lot of state on your device
            (audience mode, notes). Please don’t send special personal information or full client files through demo
            forms.
          </p>
          <h2>1. Information we may collect</h2>
          <ul>
            <li>Technical data such as browser type on a hosted deployment</li>
            <li>What you type into Contact (name, email, message) when you choose to email me</li>
            <li>Local storage preferences (Individual / Lawyer) on your device</li>
          </ul>
          <h2>2. Purpose</h2>
          <p>To run the product, answer overview and integration requests, and improve LulaGazette.</p>
          <h2>3. Your rights</h2>
          <p>
            Under POPIA you may request access, correction or deletion of personal information held about you, and you
            may complain to the Information Regulator (https://inforegulator.org.za).
          </p>
          <h2>4. Contact</h2>
          <p>
            Privacy questions go through the <a href="/contact">Contact</a> page (details listed only there).
          </p>
        </div>
      </article>
    </div>
  );
}
