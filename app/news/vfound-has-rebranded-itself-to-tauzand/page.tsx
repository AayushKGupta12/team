import React from 'react'

const Page = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');

        .font-serif { font-family: 'EB Garamond', Georgia, serif; }
        .font-body  { font-family: 'Source Sans 3', sans-serif; }

        .running-head {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b6b6b;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-gray-300 px-8 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-semibold tracking-tight text-gray-900">Tauzand.in</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="running-head">Official Communication</span>
          </div>
          <span className="running-head">May 2025</span>
        </div>
      </header>

      {/* Document body */}
      <article className="max-w-3xl mx-auto px-8 py-16 font-body">

        {/* Reference block */}
        <div className="mb-10 pb-6 border-b border-gray-200 grid grid-cols-2 gap-y-1 text-sm text-gray-500">
          <div><span className="font-semibold text-gray-700">Subject:</span>&nbsp; Corporate Rebranding — vfound.in → Tauzand.in</div>
          <div className="text-right"><span className="font-semibold text-gray-700">Date:</span>&nbsp; May 6, 2025</div>
          <div><span className="font-semibold text-gray-700">Issued by:</span>&nbsp; The Tauzand Team</div>
          <div className="text-right"><span className="font-semibold text-gray-700">Status:</span>&nbsp; Effective Immediately</div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-gray-900 mb-3">
          vfound.in Rebrands to Tauzand.in
        </h1>
        <p className="text-gray-500 text-base mb-12 font-light">
          An official announcement regarding our new corporate identity, platform name, and continued service commitments.
        </p>

        {/* Body */}
        <div className="space-y-6 text-[16.5px] leading-[1.9] text-gray-700 font-light">

          <p>
            We write to formally inform our users, partners, and stakeholders that effective
            immediately, <strong className="font-semibold text-gray-900">vfound.in</strong> has
            been officially rebranded to{' '}
            <strong className="font-semibold text-gray-900">Tauzand.in</strong>. This announcement
            marks a significant milestone in our organisation's evolution and reflects a deliberate
            strategic decision to better represent the scope and ambition of our platform.
          </p>

          {/* Pull quote */}
          <blockquote className="border-l-2 border-gray-400 pl-5 my-8 text-gray-600 italic font-serif text-lg leading-relaxed">
            "Tauzand" is derived from the word for <em>thousand</em> — symbolising the breadth of
            opportunity, connection, and possibility that our platform aspires to deliver to every user.
          </blockquote>

          <h2 className="font-serif text-2xl font-semibold text-gray-900 pt-4">
            Background &amp; Rationale
          </h2>

          <p>
            The vfound.in brand served its purpose admirably during our foundational years.
            However, as our platform expanded in scope — serving job seekers, freelancers, hiring
            managers, and small business owners across India — it became evident that the existing
            name no longer adequately conveyed the full breadth of our offering. The decision to
            rebrand was reached after extensive internal review and stakeholder consultation, with
            the objective of adopting a name that is distinct, scalable, and reflective of our
            long-term direction.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-gray-900 pt-4">
            Impact on Existing Users
          </h2>

          <p>
            Users are advised that this rebranding has no adverse impact on their accounts,
            data, or service continuity. All existing accounts, credentials, and platform
            history have been preserved in their entirety. The domain{' '}
            <strong className="font-semibold text-gray-900">vfound.in</strong> will continue
            to redirect to <strong className="font-semibold text-gray-900">tauzand.in</strong> for
            an extended transition period to ensure uninterrupted access.
          </p>

          <p>
            Any existing bookmarks, saved links, or third-party integrations referencing
            the vfound.in domain will continue to function without modification. Users are,
            however, encouraged to update their references to reflect the new domain at
            their earliest convenience.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-gray-900 pt-4">
            Changes to Visual Identity
          </h2>

          <p>
            In conjunction with the domain change, the organisation has adopted a refreshed
            visual identity — including updated typography, a revised colour palette, and a
            new logotype. These changes are purely cosmetic in nature and do not reflect any
            alteration to our terms of service, privacy policy, or operational structure.
            Updated branding assets are available upon request.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-gray-900 pt-4">
            Closing Remarks
          </h2>

          <p>
            We extend our sincere gratitude to the users and partners who have supported this
            platform since its inception. The rebranding to Tauzand.in represents not a departure
            from our founding principles, but a clearer articulation of them. Our commitment to
            delivering a reliable, transparent, and opportunity-rich platform remains unchanged.
          </p>

          <p>
            For enquiries related to this announcement, please contact us through the official
            channels available on{' '}
            <strong className="font-semibold text-gray-900">tauzand.in</strong>.
          </p>

        </div>

        {/* Signature */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-5">Issued on behalf of:</p>
          <p className="font-serif text-2xl text-gray-900 font-semibold">The Tauzand Team</p>
          <p className="text-gray-500 text-sm mt-1">Tauzand.in · Formerly vfound.in · India</p>

          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <p className="running-head text-gray-400">© 2025 Tauzand.in. All rights reserved.</p>
            <a
              href="https://tauzand.in"
              className="text-sm font-semibold text-gray-900 border border-gray-900 px-5 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Visit Tauzand.in →
            </a>
          </div>
        </div>

      </article>
    </main>
  )
}

export default Page