import { useState } from 'react';
import {
    Check,
    Menu,
    X,
    ShieldCheck,
    Clock,
    Activity
} from 'lucide-react';
import PaymentModal from './components/PaymentModal';
import deviceImg from './assets/device.jpg';
import heroDeviceImg from './assets/hero-device.png';
import doctorsImg from './assets/doctors.png';
import studentsImg from './assets/students.png';
import logoImg from './assets/logo.png';
import comparisonImg from './assets/comparison.png';

// Navbar
const Navbar = ({ onBuyClick }: { onBuyClick: () => void }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e5e7eb]/80 backdrop-blur-md border-b border-gray-200 py-4">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <img src={logoImg} alt="Xoro by Vigyaved" className="h-10 object-contain mix-blend-multiply" />
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['HOME', 'FEATURES', 'ABOUT US', 'CONTACT'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-xs font-bold text-gray-600 hover:text-primary transition-colors tracking-widest">
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={onBuyClick}
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
                    >
                        BUY NOW
                    </button>
                </div>

                <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white absolute top-full left-0 right-0 p-6 flex flex-col gap-4 border-b border-gray-100 shadow-xl">
                    {['HOME', 'FEATURES', 'ABOUT US', 'CONTACT'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-bold text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                            {item}
                        </a>
                    ))}
                    <button onClick={() => { onBuyClick(); setMobileMenuOpen(false); }} className="bg-primary text-white py-3 rounded-xl font-bold">BUY NOW</button>
                </div>
            )}
        </nav>
    );
};

// Main App
export default function App() {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#e5e7eb] text-gray-800 font-sans selection:bg-primary/20">
            <Navbar onBuyClick={() => setIsPaymentOpen(true)} />

            <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />

            {/* Hero Section */}
            <header className="pt-32 pb-20 overflow-hidden" id="home">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] text-primary-dark">
                                AI-Powered <br />
                                <span className="text-black">Digital Stethoscope</span>
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                Clear Heart & Lung sound in noisy OPD records & replay for learning & telemedicine visual waveforms for faster diagnosis works for clinics, home visits & exams.
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="bg-accent text-white p-0.5 rounded"><Check className="w-3 h-3" /></div>
                                    ISO Certified
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-accent text-white p-0.5 rounded"><Check className="w-3 h-3" /></div>
                                    1-Year Warranty
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-accent text-white p-0.5 rounded"><Check className="w-3 h-3" /></div>
                                    24/7 Support
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => setIsPaymentOpen(true)}
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-primary/20 transition-transform active:scale-95"
                                >
                                    BUY NOW
                                </button>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95">
                                    BOOK A DEMO
                                </button>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <div className="w-8 h-8 rounded-full bg-black"></div>
                                <div className="w-8 h-8 rounded-full bg-primary"></div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative lg:h-[600px] flex items-center justify-center">
                            {/* Device image with background blur effects */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/20 rounded-full blur-[120px] -z-10"></div>

                            <div className="relative z-10 w-full max-w-lg">
                                <img
                                    src={heroDeviceImg}
                                    alt="Xoro Device and App"
                                    className="w-full object-contain mix-blend-multiply drop-shadow-[0_20px_50px_rgba(20,184,166,0.3)]"
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                                    }}
                                />
                            </div>
                            {/* Vertical Watermark */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-9xl font-bold text-gray-200 -z-10 rotate-90 hidden xl:block select-none">
                                Xoro
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Problem Section */}
            <section className="py-20 bg-[#e5e7eb] text-center" id="features">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-teal-700 font-display mb-4 uppercase tracking-wider">The Problem</h2>
                    <h3 className="text-3xl font-bold text-gray-800 mb-8 max-w-3xl mx-auto leading-tight">
                        Over 50% of early cardiac and respiratory issues go undetected.
                    </h3>
                    <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-sm lg:text-base">
                        And in India’s crowded OPDs, that percentage climbs even higher. When one doctor is forced to examine dozens of patients in a rush, subtle abnormalities don’t “go unnoticed” — they get completely buried under noise, pressure, and outdated tools. Relying only on the human ear in 2025 isn’t just inefficient — it’s a clinical risk that directly impacts outcomes.
                    </p>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-teal-700 font-display inline-flex items-center gap-4">
                            THE SOLUTION IS XORO
                            <div className="h-12 w-24 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-600">
                                <img src={deviceImg} className="w-full h-full object-cover opacity-50" />
                            </div>
                        </h2>
                        <p className="text-xl font-bold text-gray-800 mt-2">95%+ accuracy with AI-Driven Auscultation</p>
                    </div>

                    {/* For Doctors */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                        <div className="lg:w-1/2 space-y-6 lg:pr-12">
                            <h3 className="text-3xl font-bold text-teal-700 font-display">For Doctors</h3>
                            <ul className="space-y-4">
                                {[
                                    "Hear subtle heart and lung sounds with amplified clarity",
                                    "See sounds instantly through real-time wave forms",
                                    "Work clearly even in noisy OPDs",
                                    "Save, label, and review patient recordings",
                                    "Share audio securely for fast second opinions"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="bg-accent text-white p-0.5 rounded-full mt-1"><Check className="w-3 h-3" /></div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <img
                                src={doctorsImg}
                                alt="Team of Doctors"
                                className="w-full rounded-[3rem] shadow-2xl border-4 border-white"
                            />
                        </div>
                    </div>

                    {/* For Students */}
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 relative">
                            <img
                                src={studentsImg}
                                alt="Medical Students"
                                className="w-full rounded-[3rem] shadow-2xl border-4 border-white"
                            />
                        </div>
                        <div className="lg:w-1/2 space-y-6 lg:pl-12">
                            <h3 className="text-3xl font-bold text-teal-700 font-display">For Students</h3>
                            <ul className="space-y-4">
                                {[
                                    "Learn heart and lung sounds with noise-free audio",
                                    "Understand faster using visual waveforms",
                                    "Build a personal sound library",
                                    "Compare cases over time",
                                    "Strengthen clinical judgment with guided insights",
                                    "Practice confidently with clear recordings"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="bg-accent text-white p-0.5 rounded-full mt-1"><Check className="w-3 h-3" /></div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Specs */}
            <section className="py-20 bg-[#e5e7eb]" id="aboutus">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-teal-700 font-display text-center mb-16">Technical Specifications</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Activity, title: "Acoustic", items: ["20 Hz – 2,000 Hz range", "Up to 35 dB amplification", "AI noise reduction", "Heart / Lung modes"]
                            },
                            {
                                icon: ShieldCheck, title: "Build", items: ["Adult + Pediatric diaphragm", "ABS + aluminum alloy", "Soft silicone ear tips", "IPX4 resistance"]
                            },
                            {
                                icon: Activity, title: "Electronics", items: ["MEMS acoustic sensor", "Real-time waveform + spectrogram", "44.1 / 48 kHz sampling", "LED indicators"]
                            },
                            {
                                icon: Menu, title: "Connectivity", items: ["Bluetooth LE 5.0", "Android & iOS app", "Tele-sharing support"]
                            },
                            {
                                icon: Clock, title: "Battery", items: ["AAA Battery", "Rechargeable", "60 Hours continuous use"]
                            },
                            {
                                icon: Activity, title: "AI Features", items: ["Murmur detection", "Lung sound classification", "Cycle segmentation"]
                            }
                        ].map((spec, i) => (
                            <div key={i} className="bg-teal-600 rounded-2xl p-6 text-white hover:bg-teal-500 transition-colors shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <spec.icon className="w-5 h-5 border border-white/30 rounded p-0.5" />
                                    <h4 className="font-bold text-lg">{spec.title}</h4>
                                </div>
                                <ul className="space-y-1 text-sm text-teal-50">
                                    {spec.items.map((item, idx) => (
                                        <li key={idx}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-teal-500 text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold font-display text-center mb-16 text-teal-900 border-b border-teal-600 pb-8 inline-block w-full">What Medical Professional Says</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "In a busy OPD, background noise is always a problem. With Xoro, I can hear heart and lung sounds more clearly without constantly asking for silence. The amplification and noise filtering actually help in real conditions.",
                                author: "Dr. Ankit Sharma, General Physician"
                            },
                            {
                                text: "Recording auscultation findings has helped me compare patient progress over time and discuss cases with colleagues. Xoro makes this simple without adding extra steps.",
                                author: "Dr. R. Mehta, Internal Medicine"
                            },
                            {
                                text: "I used to struggle identifying murmurs during practicals. Recording and replaying sounds on Xoro helped me understand what I was actually hearing. It made practice much more effective.",
                                author: "Final-Year MBBS Student"
                            }
                        ].map((testi, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex text-yellow-400 text-xs gap-1">★★★★★ 5.0</div>
                                <p className="text-sm leading-relaxed border-l-2 border-white/20 pl-4">{testi.text}</p>
                                <p className="font-bold text-sm opacity-80 pl-4">— {testi.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-[#e5e7eb]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-teal-700 font-display text-center mb-12">Xoro vs Traditional Stethoscope</h2>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden text-sm">
                            <div className="grid grid-cols-3 bg-teal-700 text-white font-bold p-4 text-center">
                                <div className="text-left pl-4">FEATURE</div>
                                <div>Traditional Stethoscope</div>
                                <div className="uppercase">Xoro Stethoscope</div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {[
                                    { name: "Sound Amplification", trad: false, xoro: true },
                                    { name: "Noise Cancellation", trad: false, xoro: true },
                                    { name: "Recording & Playback", trad: false, xoro: true },
                                    { name: "AI Assistance", trad: false, xoro: true },
                                    { name: "Telemedicine Friendly", trad: false, xoro: true },
                                    { name: "Visual Waveform", trad: false, xoro: true },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 p-4 text-center items-center hover:bg-gray-50">
                                        <div className="text-left pl-4 font-semibold text-gray-700">{row.name}</div>
                                        <div className="text-red-500 font-bold text-lg">{row.trad ? <Check /> : '✗'}</div>
                                        <div className="text-accent font-bold text-lg flex justify-center"><Check /></div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-3 p-4 text-center items-center font-bold bg-gray-50">
                                    <div className="text-left pl-4 text-gray-700">Ideal for Student Learning</div>
                                    <div className="text-gray-500">Basic</div>
                                    <div className="text-teal-700">Advanced</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={comparisonImg} className="rounded-2xl shadow-2xl w-full" alt="Comparison" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructions */}
            <section className="py-20 bg-teal-700 text-white" id="contact">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold font-display text-center mb-16 text-teal-100">Instructions for use</h2>
                    <p className="text-center mb-12 opacity-80">From unboxing to daily use in three simple steps:</p>

                    <div className="space-y-12 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Battery installations instructions",
                                desc: "Open the battery compartment of the main body and install the battery. Short press the switch to turn on the phone and use it for 5 minutes. It will automatically shut down when not needed."
                            },
                            {
                                step: "02",
                                title: "Instructions for recording usage",
                                desc: "To record, you need to download the app on your mobile phone. After registering and logging in, use Bluetooth to connect the device before operation. For Bluetooth connection, you can use the QR code of the machine itself directly."
                            },
                            {
                                step: "03",
                                title: "Bluetooth instructions",
                                desc: "When Bluetooth is turned off, press the Bluetooth button for three seconds to turn it on. After turning it on, if there is no connected device, the indicator light will flash slowly."
                            }
                        ].map((inst, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-center border-b border-teal-600 pb-12 last:border-0">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold font-display mb-2">Tips {inst.step}</h3>
                                    <h4 className="font-bold text-teal-300 mb-4">{inst.title}</h4>
                                    <p className="text-sm leading-relaxed opacity-80">{inst.desc}</p>
                                </div>
                                <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-2xl"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
