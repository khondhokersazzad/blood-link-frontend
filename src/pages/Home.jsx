import React from 'react';
import { Link } from 'react-router';
import FeaturedSection from '../components/FeaturedSection';
import ContactSection from '../components/ContactSection';
import WhyDonate from '../components/WhyDonate';

const Home = () => {
  return (
    <div>
      <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://i.ibb.co.com/RpsJy15Q/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg')" 
        }}
      >
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-75"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
          blood<span className="text-red-600">Link</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light">
          Bridging the gap between donors and those in need. 
          Your contribution can save a life today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/auth/register" 
            className="group relative px-10 py-4 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] w-full sm:w-auto"
          >
            Join As Donor
          </Link>
          
          <Link 
            to="/search-request" 
            className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto"
          >
            Search Donors
          </Link>
        </div>
      </div>

      {/* Optional: Decorative bottom wave or gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
    <section>
      <FeaturedSection></FeaturedSection>
    </section>
    <section>
      <WhyDonate></WhyDonate>
    </section>
    <section>
      <ContactSection></ContactSection>
    </section>
    </div>
  );
};

export default Home;