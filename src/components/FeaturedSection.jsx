import React from 'react';
import { Link } from 'react-router';

const FeaturedSection = () => {
  const features = [
    {
      title: "Smart Matching",
      description: "Our algorithm connects you with the nearest compatible blood donors based on your real-time location and blood group needs.",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Secure Communication",
      description: "Communicate with donors or seekers through our secure, private messaging system without exposing your personal phone number.",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "Donation History",
      description: "Keep track of your life-saving journey. Earn badges, track health vitals, and know exactly when you are eligible to donate again.",
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">Platform Features</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Optimized for Saving Lives</h3>
          <p className="text-gray-600 text-lg">
            BloodLink isn't just a directory; it's a sophisticated ecosystem designed to make the donation process seamless, fast, and safe for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <div className="group-hover:text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/features" className="inline-flex items-center text-red-600 font-bold hover:text-red-700 transition-colors">
            Explore all capabilities
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;