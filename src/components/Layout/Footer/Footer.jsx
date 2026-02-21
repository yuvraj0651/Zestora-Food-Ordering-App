import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../../Services/Footer/FooterThunk";

const Footer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFooterData());
    }, [dispatch]);

    const { footerData } = useSelector((state) => state.footer);

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 pt-14 pb-8">
            <div className="max-w-7xl mx-auto px-5">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">
                            {footerData?.branding?.siteName}
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">
                            {footerData?.branding?.description}
                        </p>

                        <div className="flex gap-4 mt-5">
                            <Facebook className="cursor-pointer hover:text-orange-500 transition" />
                            <Instagram className="cursor-pointer hover:text-orange-500 transition" />
                            <Twitter className="cursor-pointer hover:text-orange-500 transition" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {
                                footerData?.quickLinks?.map((link) => (
                                    <li
                                        key={link.label}
                                        className="hover:text-orange-500 cursor-pointer transition">
                                        {link.label}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Contact Us
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>{footerData?.contactInfo?.address}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                <span>{footerData?.contactInfo?.email}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <span>{footerData?.contactInfo?.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            {footerData?.newsletter?.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-4">
                            {footerData?.newsletter?.description}
                        </p>

                        <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                            <input
                                type="email"
                                placeholder={footerData?.newsletter?.placeholder}
                                className="bg-transparent px-4 py-2 flex-1 outline-none text-sm"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition">
                                {footerData?.newsletter?.buttonText}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-700 mt-12 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Zestora.{footerData.copyright?.text}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
