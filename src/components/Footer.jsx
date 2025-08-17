import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router';
import logo from '/logo.jpeg';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim() === '') return;

        // Here you can also call an API to save the email
        setSuccess(true);
        setEmail('');

        // Hide the alert after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            <img className='w-10' src={logo} alt="NewsPress Logo" /> NewsPress
                        </Link>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Stay informed with unbiased, real-time, AI-curated news that matters. Your intelligent news companion.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                        <li><Link to="/all-article" className="hover:text-blue-500 transition-colors">All Articles</Link></li>
                        <li><Link to="/subscription" className="hover:text-blue-500 transition-colors">Subscribe</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Connect with us</h4>
                    <div className="flex gap-4 mb-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={20} />
                        <span className="text-sm">newsletter@newspress.com</span>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Subscribe</h4>
                    <p className="text-sm mb-2">Get the latest news delivered to your inbox.</p>
                    <form className="flex gap-2" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            required
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Subscribe</button>
                    </form>

                    {/* Success Alert */}
                    {success && (
                        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded-md text-sm">
                            Successfully subscribed!
                        </div>
                    )}
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
