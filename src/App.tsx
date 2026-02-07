import { useState, useEffect } from 'react';
import {
    Activity,
    Bluetooth,
    ShieldCheck,
    Award,
    Headphones,
    ChevronDown,
    Check,
    X,
    Menu,
    ArrowRight,
    Stethoscope,
    Zap,
    Volume2,
    Clock,
    Smartphone,
    Database
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import PaymentModal from './components/PaymentModal';
import deviceImg from './assets/device.jpg';

// --- Sub-components (Moved into App.tsx for simplicity as requested, but cleaner) ---

const Waveform = () => {
    const [data, setData] = useState(Array.from({ length: 40 }, (_, i) => ({ value: 50 + Math.sin(i * 0.5) * 20 })));

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newData = [...prev.slice(1)];
                // const lastVal = prev[prev.length - 1].value; // unused
                const newVal = 50 + (Math.random() - 0.5) * 40 + Math.sin(Date.now() / 200) * 10;
                newData.push({ value: newVal });
                return newData;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-24 w-full opacity-60">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#14b8a6"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                    <YAxis hide domain={[0, 100]} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Navbar Component
const Navbar = ({ onBuyClick }: { onBuyClick: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white font-display">Pulse AI</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['HOME', 'FEATURES', 'ABOUT US', 'CONTACT'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors uppercase tracking-widest">
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={onBuyClick}
                        className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-teal-500/20 active:scale-95"
                    >
                        BUY NOW
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <Menu />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900 absolute top-full left-0 right-0 p-6 flex flex-col gap-4 border-b border-white/10 animate-in slide-in-from-top">
                    {['HOME', 'FEATURES', 'ABOUT US', 'CONTACT'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-lg font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>
                            {item}
                        </a>
                    ))}
                    <button onClick={() => { onBuyClick(); setMobileMenuOpen(false); }} className="bg-teal-500 text-white py-3 rounded-xl font-bold">BUY NOW</button>
                </div>
            )}
        </nav>
    );
};

const Badge = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
        <Icon className="w-4 h-4 text-teal-400" />
        <span className="text-xs font-medium uppercase tracking-widest text-slate-300">{text}</span>
    </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
    <div className="glass-card p-8 rounded-3xl hover:border-teal-500/50 transition-all group">
        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-teal-400" />
        </div>
        <h3 className="text-xl font-bold mb-3 font-display">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
);

const SpecRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-start justify-between py-4 border-b border-white/5">
        <span className="text-slate-500 font-medium text-sm">{label}</span>
        <span className="text-slate-300 text-right text-sm max-w-[200px]">{value}</span>
    </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left hover:text-teal-400 transition-colors"
            >
                <span className="text-lg font-medium">{question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-slate-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Navbar onBuyClick={() => setIsPaymentOpen(true)} />

            <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="home">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-wrap gap-3">
                                <Badge icon={ShieldCheck} text="ISO Certified" />
                                <Badge icon={Award} text="2-Year Warranty" />
                                <Badge icon={Headphones} text="24/7 Expert Support" />
                            </div>

                            <div>
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-display">
                                    Future of <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                        Cardiac Health
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-400 max-w-lg leading-relaxed mb-8">
                                    Pulse AI redefines diagnostics. Visualize heart sounds, detect anomalies instantly, and share data securely with specialists worldwide.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                    {[
                                        "AI-Driven Murmur Detection",
                                        "Real-time Spectrogram Visualization",
                                        "HIPAA-Compliant Cloud Sync",
                                        "Trusted by 500+ Hospitals"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-300">
                                            <div className="bg-teal-500/10 p-1 rounded-full">
                                                <Check className="w-4 h-4 text-teal-400" />
                                            </div>
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setIsPaymentOpen(true)}
                                    className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl shadow-teal-500/20 active:scale-95 group"
                                >
                                    Buy Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all active:scale-95">
                                    Request Demo
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 animate-float">
                                <img
                                    src={deviceImg}
                                    alt="Pulse AI Device"
                                    className="rounded-[40px] shadow-2xl border border-white/10 grayscale-[0.2] object-cover aspect-square"
                                />

                                {/* AI Overlay Mockup */}
                                <div className="absolute -bottom-8 -left-8 lg:-left-12 glass-card p-6 rounded-3xl w-72 shadow-2xl animate-pulse bg-slate-900/90">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Activity className="text-teal-400 w-5 h-5" />
                                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Live AI Analysis</span>
                                    </div>
                                    <Waveform />
                                    <div className="mt-4 flex justify-between text-xs font-bold text-teal-400">
                                        <span>98.5% CONFIDENCE</span>
                                        <span>NORMAL RHYTHM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-teal-500/20 blur-[100px] -z-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            {/* The Problem Section */}
            <section className="py-24 bg-slate-900/50" id="problem">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-sm font-bold tracking-[0.3em] text-teal-500 uppercase mb-4">The Challenge</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8 font-display">Traditional Tools Miss Crucial Details</h3>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            In high-pressure environments, subtle auditory cues are often lost. Pulse AI filters out the noise, ensuring you never miss a beat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Volume2, title: "Ambient Noise", desc: "Clinics are noisy. Active Noise Cancellation isolates cardiac sounds perfectly." },
                            { icon: Clock, title: "Rapid Triage", desc: "Instant AI scoring helps prioritize critical cases in seconds." },
                            { icon: Activity, title: "Subjectivity", desc: "Replace guesswork with visual, quantifiable data points." }
                        ].map((p, i) => (
                            <div key={i} className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl flex flex-col items-center text-center group hover:border-red-500/30 transition-all">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                    <p.icon className="text-red-400 w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">{p.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-32" id="features">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold tracking-[0.3em] text-teal-500 uppercase mb-4">The Solution</h2>
                            <h3 className="text-4xl md:text-5xl font-bold mb-8 font-display">Pulse AI: Clarity Redefined</h3>
                            <p className="text-lg text-slate-400 mb-12">
                                Combining advanced acoustics with deep learning algorithms. It's not just a digital stethoscope; it's a comprehensive diagnostic platform.
                            </p>

                            <div className="space-y-12">
                                <div>
                                    <h4 className="flex items-center gap-3 text-2xl font-bold mb-6 text-white">
                                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                                            <Stethoscope className="w-6 h-6 text-white" />
                                        </div>
                                        Clinical Precision
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {[
                                            "40x Audio Amplification",
                                            "Visual Phonocardiogram",
                                            "One-touch Recording",
                                            "Cloud Case Library"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-slate-300">
                                                <Check className="text-teal-400 w-5 h-5 flex-shrink-0" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                            <FeatureCard
                                icon={Zap}
                                title="Smart Filtering"
                                desc="Proprietary algorithms remove friction and ambient noise instantly."
                            />
                            <FeatureCard
                                icon={Smartphone}
                                title="Mobile Suite"
                                desc="Full-featured iOS & Android apps for analysis on the go."
                            />
                            <FeatureCard
                                icon={Database}
                                title="EHR Integration"
                                desc="Seamlessly export reports to major electronic health record systems."
                            />
                            <FeatureCard
                                icon={Bluetooth}
                                title="Zero Latency"
                                desc="Next-gen Bluetooth 5.3 ensuring real-time audio sync."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/10 glass-card shadow-2xl">
                        <div className="p-8 text-center border-b border-white/10">
                            <h3 className="text-3xl font-bold font-display">Upgrade Your Practice</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 uppercase text-xs tracking-widest text-slate-500 font-bold">
                                    <th className="px-8 py-6">Feature</th>
                                    <th className="px-8 py-6">Standard Stethoscope</th>
                                    <th className="px-8 py-6 text-teal-400">Pulse AI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    "Digital Amplification",
                                    "Active Noise Cancelling",
                                    "AI Analysis",
                                    "Visual Waveforms",
                                    "Telehealth Ready",
                                    "Record & Share"
                                ].map((feature, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6 text-sm font-semibold">{feature}</td>
                                        <td className="px-8 py-6"><X className="text-red-500 w-5 h-5" /></td>
                                        <td className="px-8 py-6"><Check className="text-teal-400 w-5 h-5" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Tech Specs */}
            <section className="py-24 bg-slate-900/50" id="aboutus">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Specifications</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Built for the rigorous demands of modern healthcare.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4">Hardware</h4>
                                <div className="glass-card rounded-2xl p-6">
                                    <SpecRow label="Material" value="Aerospace Aluminum" />
                                    <SpecRow label="Length" value="27 Inches" />
                                    <SpecRow label="Weight" value="160g (Lightweight)" />
                                    <SpecRow label="Rating" value="IP55 Water Resistant" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4">Performance</h4>
                                <div className="glass-card rounded-2xl p-6">
                                    <SpecRow label="Frequency" value="20Hz - 2kHz" />
                                    <SpecRow label="Battery" value="60 Hours Continuous" />
                                    <SpecRow label="Charging" value="USB-C (Fast Charge)" />
                                    <SpecRow label="Gain" value="40x Analog Gain" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4">Software</h4>
                                <div className="glass-card rounded-2xl p-6">
                                    <SpecRow label="App OS" value="iOS 15+, Android 10+" />
                                    <SpecRow label="Connectivity" value="Bluetooth 5.3" />
                                    <SpecRow label="Files" value=".WAV (Lossless)" />
                                    <SpecRow label="Security" value="AES-256 Encrypted" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 max-w-3xl mx-auto px-6" id="faq">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-display">FAQ</h2>
                </div>
                <div className="space-y-2">
                    <FAQItem
                        question="Is Pulse AI FDA cleared?"
                        answer="Yes, Pulse AI mimics Class II medical device standards and is currently pending final FDA clearance for US markets."
                    />
                    <FAQItem
                        question="Can I use it with hearing aids?"
                        answer="Absolutely. The Pulse AI app can stream audio directly to Bluetooth-enabled hearing aids for crystal clear auscultation."
                    />
                    <FAQItem
                        question="Do I need a subscription?"
                        answer="The core functionality is free forever. Cloud storage and advanced AI analysis come with a Pro subscription (included for 1 year)."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10" id="contact">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                                    <Activity className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold tracking-tighter text-white font-display">Pulse AI</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Reinventing auscultation for the digital age.
                            </p>
                        </div>

                        <div>
                            <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Product</h5>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Science</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Support</h5>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Warranty</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Newsletter</h5>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500 w-full"
                                />
                                <button className="bg-teal-500 p-2 rounded-xl">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-xs text-slate-500 gap-4">
                        <p>© 2026 Pulse AI Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
