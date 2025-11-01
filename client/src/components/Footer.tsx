import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">
                    © {new Date().getFullYear()} <span className="text-brand-300">LearnHub</span>. All rights reserved.
                </p>

                <div className="flex space-x-4 mt-3 md:mt-0">
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Contact</a>
                    <a href="#" className="hover:text-white">Privacy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
