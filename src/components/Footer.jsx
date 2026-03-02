import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaDribbble, 
  FaLinkedinIn, 
  FaTwitter 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#202430] pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">QuickHire</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xl font-bold mb-8">About</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Resources</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-8">Get job notifications</h4>
            <p className="text-slate-400 mb-6">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-0">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white text-slate-900 px-4 py-3 w-full outline-none"
                style={{ borderRadius: "0px" }}
              />
              <button 
                className="bg-[#4F46E5] px-6 py-3 font-bold hover:bg-[#4338CA] transition-all whitespace-nowrap"
                style={{ borderRadius: "0px" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            2021 @ QuickHire. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {[FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#4F46E5] transition-all text-slate-400 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;