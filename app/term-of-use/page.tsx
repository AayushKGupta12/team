import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const page = () => {
  return (
  <div className="bg-white text-gray-900">
    <Navbar />

    <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">

      <h1 className="text-4xl font-semibold mt-25 justify-center text-center">
        Terms of Use
        <hr/>
      </h1>

      <p className="text-md text-gray-700">
        Thank you for using Vfound !
        <br />
        <br />
        These Terms of Use constitute a legally binding agreement between you
        and the operators of this platform. By accessing, browsing, registering,
        or using this website in any manner, you confirm that you have read,
        understood, and agreed to be bound by these Terms of Use. If you do not
        agree with these terms, you must immediately stop using the platform.
        <br />
        <br />
        The purpose of this platform is to provide informational and supportive
        tools related to career development, including job discovery, resume
        analysis, compatibility checks, cover letter generation, and curated
        content related to employment opportunities and the technology sector.
        These services are designed to assist users but do not guarantee any
        specific outcome, employment opportunity, or professional result.
      </p>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Acceptance of Terms
        </h2>

        <p className="text-md text-gray-700">
          By using this platform, you acknowledge that you are entering into
          a binding agreement governed by these Terms of Use. Your continued
          use of the platform constitutes ongoing acceptance of any updates
          or modifications made to these terms.
        </p>

        <p className="text-md text-gray-700">
          If you are using the platform on behalf of an organization or entity,
          you represent that you have the authority to bind that entity to these
          terms. In such cases, references to “you” include both the individual
          and the entity.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Eligibility
        </h2>

        <p className="text-md text-gray-700">
          You must be at least eighteen years of age to use this platform. By
          accessing or using the platform, you represent and warrant that you
          meet this age requirement and have the legal capacity to enter into
          this agreement.
        </p>

        <p className="text-md text-gray-700">
          Access to certain features may require account registration. You agree
          to provide accurate, current, and complete information during
          registration and to update such information as necessary.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Account Responsibility
        </h2>

        <p className="text-md text-gray-700">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. You agree to notify us immediately of any unauthorized use
          of your account or suspected security breach.
        </p>

        <p className="text-md text-gray-700">
          We are not responsible for any loss or damage arising from your
          failure to safeguard your credentials or comply with these
          responsibilities.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Permitted Use
        </h2>

        <p className="text-md text-gray-700">
          You agree to use the platform only for lawful purposes and in a manner
          consistent with these Terms of Use. You must not use the platform in
          any way that could damage, disrupt, or interfere with its operation
          or security.
        </p>

        <p className="text-md text-gray-700">
          Prohibited activities include attempting unauthorized access,
          distributing malware, scraping data without permission, impersonating
          others, or misusing platform features in a way that harms other users
          or the platform itself.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          User Content
        </h2>

        <p className="text-md text-gray-700">
          Users may submit information such as resumes, text inputs, preferences,
          or other data for analysis or content generation. You retain ownership
          of your content, but you grant the platform a limited, non-exclusive
          license to process and display such content solely for providing the
          requested services.
        </p>

        <p className="text-md text-gray-700">
          You are solely responsible for the accuracy, legality, and originality
          of the content you submit. We do not verify or endorse user-provided
          content and are not responsible for errors or omissions contained
          therein.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Resume Analysis and Generated Outputs
        </h2>

        <p className="text-md text-gray-700">
          Resume analysis scores, compatibility checks, and generated cover
          letters are produced using automated systems. These outputs are
          informational in nature and intended to assist users in improving
          their applications.
        </p>

        <p className="text-md text-gray-700">
          We do not guarantee that the use of generated content will result in
          interviews, job offers, or employment. Users are advised to review,
          edit, and verify all generated content before use.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Job Listings
        </h2>

        <p className="text-md text-gray-700">
          Job listings on this platform may be sourced from public information,
          third-party providers, or internal curation. We do not guarantee the
          accuracy, availability, or legitimacy of any listing.
        </p>

        <p className="text-md text-gray-700">
          The platform does not act as an employer, recruiter, or hiring agent.
          Any interaction between users and employers occurs outside the
          platform and is solely the responsibility of the parties involved.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Third-Party Links
        </h2>

        <p className="text-md text-gray-700">
          The platform may contain links to external websites or services. We do
          not control or endorse these third-party resources and are not
          responsible for their content, policies, or practices.
        </p>

        <p className="text-md text-gray-700">
          Accessing third-party links is done at your own risk, and you should
          review their terms and policies before engaging with them.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Intellectual Property
        </h2>

        <p className="text-md text-gray-700">
          All platform content, including text, layout, design, and features,
          is protected by intellectual property laws. You may not copy,
          reproduce, distribute, or create derivative works without explicit
          written permission.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Disclaimer of Warranties
        </h2>

        <p className="text-md text-gray-700">
          The platform is provided on an “as is” and “as available” basis. We
          make no warranties regarding accuracy, reliability, availability,
          or suitability for any purpose.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Limitation of Liability
        </h2>

        <p className="text-md text-gray-700">
          To the maximum extent permitted by law, the platform shall not be
          liable for any direct, indirect, incidental, or consequential damages
          arising from your use of the platform.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Termination
        </h2>

        <p className="text-md text-gray-700">
          We reserve the right to suspend or terminate access to the platform at
          any time, with or without notice, for violations of these terms or for
          conduct deemed harmful.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-medium">
          Changes to These Terms
        </h2>

        <p className="text-md text-gray-700">
          These Terms of Use may be updated periodically. Continued use of the
          platform after changes indicates acceptance of the revised terms.
        </p>
      </section>

      <section className="space-y-5">
        <h1 className="text-2xl font-medium">
          Disclaimer
        </h1>

      <p className="text-md text-gray-700">
        The information and services provided on this platform are for general
        informational purposes only. While we strive to keep content accurate
        and up to date, we make no guarantees regarding completeness, accuracy,
        or reliability.
      </p>

      <p className="text-md text-gray-700">
        Resume analysis, job compatibility scores, and generated content are
        produced using automated systems. These outputs should not be treated
        as professional, legal, or hiring advice.
      </p>

      <p className="text-md text-gray-700">
        We do not guarantee interviews, job offers, or employment outcomes. Any
        decisions you make based on platform content are solely your
        responsibility.
      </p>

      <p className="text-md text-gray-700">
        External links or job listings are provided for convenience only. We do
        not endorse or verify third-party content or employers.
      </p>
      </section>

      <section>
        <h1 className='font-semibold text-right'>
          Effective: December 30, 2025        
        </h1>
      </section>

    </main>

    <Footer />
  </div>
);


}

export default page
