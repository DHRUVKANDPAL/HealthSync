import React from "react";
import Image from "next/image";

const Vision = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-teal-50 py-8 sm:py-24  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:flex lg:items-center lg:gap-12 xl:gap-20">
          <div className="lg:w-1/2 mb-12 lg:mb-0 relative z-10">
            <h2 className="text-3xl sm:text-5xl  font-extrabold mb-6 sm:mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600">
                Revolutionizing
              </span>
              <span className="block text-blue-900 mt-2">Healthcare</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-md sm:text-lg  text-gray-700">
              <p>
                At HealthSync, we envision a future where healthcare is
                seamlessly integrated, accessible, and patient-centric. Our
                mission is to leverage cutting-edge technology to bridge gaps in
                healthcare delivery, ensuring quality medical services for all.
              </p>
              <p>
                We're creating a connected ecosystem where patients, doctors,
                and providers collaborate effortlessly. By streamlining
                processes from appointments to records, we're enhancing the
                healthcare experience for everyone.
              </p>
              <p className="">
                Our commitment goes beyond convenience. We empower individuals
                to take charge of their health through informed decisions and
                easy access to medical information, contributing to better
                outcomes and a more efficient system.
              </p>
            </div>
            <div className="mt-8 sm:mt-10 lg:mt-12">
              {/* Added missing <a> tag */}
              <a
                href="#"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Our Approach
                <svg
                  className="ml-2 sm:ml-3 -mr-1 h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-teal-300 rounded-3xl transform rotate-3 scale-105 z-0 opacity-70"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://i.imghippo.com/files/GqGSf1724064367.jpg"
                alt="Our Vision for Healthcare"
                width={1024}
                height={768}
                layout="responsive"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl">
          <div className="w-full h-full border-2 border-blue-200 rounded-full animate-pulse opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
