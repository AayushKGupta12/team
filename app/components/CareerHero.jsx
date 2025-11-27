'use client';

export default function Hero() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative overflow-hidden w-full bg-[#e7f0fa] py-12 md:py-20 lg:py-25 px-4 sm:px-6 md:px-16 lg:px-20">

        {/* BACKGROUND STATIC LETTERS */}
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-end md:mr-2 px-4">

              <div className="text-[clamp(24px,8vw,150px)] md:text-[clamp(50px,15vw,150px)]
              font-extrabold leading-[1.1] md:leading-[0.85]
              text-[#7ba4d0]/45 text-center md:text-right whitespace-nowrap md:whitespace-normal">

            {/* MOBILE VERSION - visible only on mobile */}
            <div className="block md:hidden mt-100 text-7xl">  
              Career
            </div>
            <div className="text-sm text-[#2e5e99]">We are in hunt for talented developers</div>

            {/* DESKTOP VERSION - visible only on md+ */}
            <div className="hidden md:block mt-19">
              <br /><br /><br />
              Career
              <div className="text-4xl text-[#2e5e99]">We are in hunt for talented developers</div>
            </div>
            

          </div>
        </div>

        {/* OVERLAY TEXT CONTENT */}
        <div className="relative z-20 min-h-[450px] md:min-h-[450px] flex items-center justify-center md:justify-start md:items-end">
          <div className="w-full max-w-md md:max-w-lg text-center md:text-left px-4 sm:px-6 md:px-0">
            <h1 className="font-extrabold tracking-tight text-[clamp(28px,8vw,80px)] md:text-[clamp(36px,6vw,80px)] leading-[0.95] md:leading-[0.92] text-[#0b1724]">
              <span className="block">India's Largest IT</span>
              <span className="block">
                Jobs Portal for <span className="text-[#2e5e99]">Recent Undergrads</span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION - Clean & Professional */}
      <div className="bg-[#7ba4d0]">
        <div className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-20">

            {/* Who We Are */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
                What We Are Looking For ?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are seeking passionate and talented individuals to join our dynamic team. If you are driven by innovation, eager to make a difference, and ready to contribute to a fast-growing company, we want to hear from you. Explore our current openings and find the perfect role that matches your skills and aspirations.
                </p>
            </div>

            {/* Our Values */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
                Domains We Are Hiring For
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {[
                  { title: "Software Engineer", desc: "As a Software Engineer, you will design, develop, and maintain scalable applications using modern programming languages such as Java, Python, or JavaScript. You’ll work with frameworks like Spring Boot or Node.js, manage databases such as MySQL or MongoDB, and collaborate on system design and API development. Strong knowledge of data structures, algorithms, and version control with Git is essential to ensure clean, efficient, and reliable code delivery" },
                  { title: "UI/UX", desc: "As a UI/UX Designer, you will craft intuitive and engaging digital experiences by combining creativity with user‑centered design principles. You’ll use tools like Figma, Adobe XD, and Sketch to create wireframes, prototypes, and polished interfaces, while ensuring accessibility and responsive layouts. Collaborating closely with developers, you’ll translate design concepts into functional interfaces that delight users and improve overall usability." },
                  { title: "ML Engineer", desc: "As an ML Engineer, you will build, train, and deploy machine learning models that solve real‑world problems. You’ll work with Python, TensorFlow, PyTorch, and Scikit‑learn to handle large datasets, develop predictive algorithms, and optimize model performance. Experience with data pipelines, model evaluation, and deployment tools like Docker or Kubernetes will help ensure scalable, ethical, and transparent AI solutions." },
                  { title: "Web Developer", desc: "As a Web Developer, you will create responsive, high‑performance websites and applications using technologies such as HTML, CSS, JavaScript, and frameworks like React or Next.js. You’ll integrate backend services with Node.js or Express, manage databases like MongoDB or PostgreSQL, and ensure seamless collaboration with design and product teams. A strong grasp of modern styling libraries, CI/CD pipelines, and version control will help deliver robust, user‑friendly solutions." },
                ].map((value) => (
                  <div
                    key={value.title}
                    className="border-l-4 border-[#0d2440] pl-6 py-4 bg-gray-50 rounded-r-lg"
                  >
                    <h4 className="text-2xl font-semibold text-[#0d2440] mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

                <a
  href="https://docs.google.com/forms/d/e/1FAIpQLScUZ5y_RpNN9FXlm5U5ZtGaZuAmOeb_PDwldEUrMG6RO-lRXA/viewform?usp=publish-editor"
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
  >
    <span
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
    ></span>

    <span
      className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
    ></span>

    <div
      className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
    >
      <span className="select-none">Apply Now</span>

      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
      >
        <path
          clip-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
  </button>
</a>



          </div>
        </div>
      </div>
    </div>
  );
}