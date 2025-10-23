import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Brand / Logo */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2">Yu-Events</h2>
          <p className="text-gray-300">Connecting students with events that matter.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2">Company</h3>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">About Us</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">Careers</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">Contact</a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2">Resources</h3>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">Blog</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">Events</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition">Support</a>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700  text-center text-gray-400 text-sm">
        © 2025 Yu-Events. All rights reserved.
      </div>
    </footer>
  );
}
