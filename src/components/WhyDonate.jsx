import React from 'react';

const WhyDonate = () => {
  const reasons = [
    {
      title: "Save Up to 3 Lives",
      description: "A single donation can be separated into several components like red blood cells, plasma, and platelets.",
      icon: "❤️"
    },
    {
      title: "Health Benefits",
      description: "Regular donation helps maintain healthy iron levels and reduces the risk of cardiovascular diseases.",
      icon: "⚡"
    },
    {
      title: "Free Health Check",
      description: "Every donor receives a mini-physical, checking pulse, blood pressure, and hemoglobin levels.",
      icon: "🩺"
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Visual Element */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-50">
              <img 
                src="https://i.ibb.co.com/93hfz7zn/judy-beth-morris-0r-R2p-Sfms-Uo-unsplash.jpg" 
                alt="Giving blood"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">The Impact</h2>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-8">Why should you donate?</h3>
            
            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{reason.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyDonate;