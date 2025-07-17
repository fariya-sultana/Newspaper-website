// components/Footer.jsx
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail
} from 'lucide-react';
import { Link } from 'react-router';
import logo from '/logo.jpeg';

const Footer = () => {
    return (
        <footer className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-2">
                        <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-2"><img className='w-6 md:w-10' src={logo} alt="" /> NewsPress</Link>
                    </div>
                    <p className="text-sm ">
                        Stay informed with unbiased,<br /> real-time, AI-curated news that matters. <br /> Your intelligent news companion.
                    </p>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-blue-500">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-500">About Us</a></li>
                        <li><a href="/all-article" className="hover:text-blue-500">All Article</a></li>
                        <li><a href="/subscribe" className="hover:text-blue-500">Subscribe</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/faq" className="hover:text-blue-500">FAQs</a></li>
                        <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
                        <li><a href="/privacy" className="hover:text-blue-500">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-blue-500">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Connect with us</h3>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                            <Facebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                            <Twitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                            <Instagram />
                        </a>

                        <a href="mailto:contact@newspress.com" className="hover:text-red-500">
                            <Mail />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 dark:border-gray-700 text-center py-6 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} NewsPress. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
