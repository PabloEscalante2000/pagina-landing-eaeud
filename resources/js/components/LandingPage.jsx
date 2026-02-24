import React, { useState, useEffect } from 'react';
import { FiCpu, FiSearch, FiHeart, FiShoppingCart, FiArrowDown, FiCalendar, FiGlobe, FiStar, FiBook } from 'react-icons/fi';

const LAUNCH_DATE = new Date('2026-03-27T18:00:00');
const SEMINAR_DATE = new Date('2026-04-25T09:00:00');

function useCountdown(targetDate) {
    const calculateTimeLeft = () => {
        const diff = targetDate - new Date();
        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return timeLeft;
}

function CountdownUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <span
                className="text-4xl md:text-5xl font-bold tabular-nums"
                style={{ color: '#DAA520' }}
            >
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-widest uppercase text-gray-400 mt-1">
                {label}
            </span>
        </div>
    );
}

function Countdown({ targetDate }) {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);
    return (
        <div className="flex gap-6 md:gap-10 justify-center">
            <CountdownUnit value={days} label="días" />
            <CountdownUnit value={hours} label="horas" />
            <CountdownUnit value={minutes} label="minutos" />
            <CountdownUnit value={seconds} label="segundos" />
        </div>
    );
}

function Divider() {
    return (
        <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #DAA520)' }} />
            <FiStar size={14} color="#DAA520" />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #DAA520)' }} />
        </div>
    );
}

function BuyButton({ label = 'Comprar el libro', large = false }) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            type="button"
            className={`${large ? 'px-12 py-5 text-base md:text-lg' : 'px-8 py-4 text-sm md:text-base'} font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer`}
            style={{
                background: hovered
                    ? 'linear-gradient(135deg, #DAA520, #b8891a)'
                    : 'linear-gradient(135deg, #ba4826, #8a3318)',
                color: hovered ? '#000' : '#fff',
                border: '2px solid #DAA520',
                boxShadow: '0 0 30px rgba(186,72,38,0.4)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {label}
        </button>
    );
}

function FloatingBuyButton() {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className="fixed bottom-8 right-6 z-50 flex items-center gap-3 transition-all duration-500"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <button
                type="button"
                className="flex items-center gap-2 px-5 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer"
                style={{
                    background: hovered
                        ? 'linear-gradient(135deg, #DAA520, #b8891a)'
                        : 'linear-gradient(135deg, #ba4826, #8a3318)',
                    color: hovered ? '#000' : '#fff',
                    border: '2px solid #DAA520',
                    boxShadow: '0 4px 24px rgba(186,72,38,0.5), 0 0 0 1px rgba(218,165,32,0.15)',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <FiShoppingCart size={16} />
                <span>Comprar</span>
            </button>
        </div>
    );
}

export default function LandingPage() {
    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: '#000', color: '#f5f0e8' }}>

            <FloatingBuyButton />

            {/* ── HERO ── */}
            <section
                className="relative min-h-screen flex items-center px-6 overflow-hidden"
                style={{
                    backgroundImage: 'url(/images/background-1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)' }}
                />

                <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">
                    {/* Left — text */}
                    <div>
                        <p
                            className="text-xs tracking-[0.35em] uppercase mb-5"
                            style={{ color: '#DAA520' }}
                        >
                            César Escalante · Nuevo libro
                        </p>

                        <h1
                            className="text-5xl md:text-7xl font-bold uppercase leading-tight mb-5"
                            style={{ color: '#fff' }}
                        >
                            El Amor<br />
                            <span style={{ color: '#DAA520' }}>es un</span><br />
                            Delirio
                        </h1>

                        <p
                            className="text-base md:text-lg font-light leading-relaxed mb-5 max-w-md"
                            style={{ color: '#c8b89a' }}
                        >
                            Un ensayo sobre cómo la mente, en nombre del amor,
                            fabrica certezas para no tolerar la duda.
                        </p>

                        <blockquote
                            className="text-sm md:text-base italic leading-relaxed mb-10 pl-4 max-w-md"
                            style={{ borderLeft: '2px solid #ba4826', color: '#DAA520' }}
                        >
                            "No siempre sufrimos por lo que pasó, sino por lo que
                            nuestra mente concluyó con muy pocas pruebas."
                        </blockquote>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <BuyButton label="Comprar el libro" />
                        </div>

                        <p className="mt-4 text-xs" style={{ color: '#6b5a3e' }}>
                            Envío internacional · Disponible en librerías peruanas
                        </p>

                        {/* Badges de eventos */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            {[
                                { icon: <FiCalendar size={12} />, text: 'Lanzamiento 27 marzo' },
                                { icon: <FiCalendar size={12} />, text: 'Seminario 25 abril' },
                            ].map(({ icon, text }) => (
                                <span
                                    key={text}
                                    className="flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5"
                                    style={{ border: '1px solid rgba(218,165,32,0.4)', color: '#DAA520', background: 'rgba(218,165,32,0.05)' }}
                                >
                                    {icon} {text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — book image */}
                    <div className="hidden md:flex justify-center items-center">
                        <img
                            src="/images/book-mockup.png"
                            alt="El Amor es un Delirio — portada del libro"
                            className="w-72 lg:w-80"
                            style={{ filter: 'drop-shadow(0 30px 50px rgba(186,72,38,0.5))' }}
                        />
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <FiArrowDown size={22} color="#DAA520" />
                </div>
            </section>

            {/* ── PROPUESTA DE VALOR ── */}
            <section className="py-20 px-6" style={{ backgroundColor: '#0a0a0a' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#DAA520' }}>
                        Sobre el libro
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 leading-tight" style={{ color: '#fff' }}>
                        Cuando amar deja de ser
                        <span style={{ color: '#ba4826' }}> sentir</span>
                    </h2>
                    <Divider />
                    <p className="text-base md:text-lg leading-relaxed mt-6 mb-5" style={{ color: '#c8b89a' }}>
                        Este libro explora el momento en que el amor deja de ser una experiencia vivida
                        para convertirse en una operación mental: la necesidad de entenderlo todo para
                        no tolerar la duda.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#c8b89a' }}>
                        Es el amor que busca certezas absolutas, que transforma gestos en pruebas
                        y pensamientos en verdades incuestionables. Más que un manual para amar mejor,
                        funciona como un ensayo sobre cómo el exceso de pensamiento puede convertirse
                        en la forma más sofisticada de perder el amor.
                    </p>
                    <blockquote
                        className="text-xl md:text-2xl italic font-medium leading-relaxed"
                        style={{ color: '#DAA520' }}
                    >
                        "Cuando amar ya no se trata sobre lo que se siente,<br />
                        sino sobre lo que interpretamos y lo que concluimos acerca del otro."
                    </blockquote>
                </div>
            </section>

            {/* ── QUÉ ENCONTRARÁS ── */}
            <section className="py-20 px-6" style={{ backgroundColor: '#0d0b09' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#DAA520' }}>
                            Lo que descubrirás
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase" style={{ color: '#fff' }}>
                            ¿Qué encontrarás en este libro?
                        </h2>
                        <Divider />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                Icon: FiCpu,
                                title: 'Cómo funciona la mente enamorada',
                                desc: 'Entenderás cómo el cerebro construye interpretaciones y las convierte en certezas que sostienen o destruyen el amor.',
                            },
                            {
                                Icon: FiSearch,
                                title: 'El delirio de las señales',
                                desc: 'Aprenderás a leer señales sin ansiedad: por qué el amor vigilante se convierte en la trampa más silenciosa.',
                            },
                            {
                                Icon: FiHeart,
                                title: 'Volver a sentir con seguridad',
                                desc: 'Comprenderás tus patrones emocionales para volver a confiar en tus vínculos desde un lugar auténtico.',
                            },
                        ].map(({ Icon, title, desc }) => (
                            <div
                                key={title}
                                className="p-8"
                                style={{
                                    border: '1px solid rgba(218,165,32,0.25)',
                                    background: 'linear-gradient(135deg, rgba(186,72,38,0.07), rgba(0,0,0,0.4))',
                                }}
                            >
                                <Icon size={32} color="#DAA520" style={{ marginBottom: '1rem' }} />
                                <h3 className="text-base font-bold uppercase tracking-wide mb-3" style={{ color: '#DAA520' }}>
                                    {title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#a89060' }}>
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EVENTOS ── */}
            <section
                className="py-24 px-6 relative overflow-hidden"
                style={{
                    backgroundImage: 'url(/images/background-2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.88)' }} />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#ba4826' }}>
                        Incluido con tu compra
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4" style={{ color: '#fff' }}>
                        Al comprar el libro<br />
                        <span style={{ color: '#DAA520' }}>tienes acceso a dos eventos</span>
                    </h2>
                    <p className="text-base mb-14" style={{ color: '#a89060' }}>
                        Tu compra no es solo el libro — es una experiencia completa.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        {/* Evento 1 */}
                        <div
                            className="p-8"
                            style={{
                                background: 'linear-gradient(135deg, rgba(186,72,38,0.15), rgba(0,0,0,0.6))',
                                border: '1px solid #ba4826',
                            }}
                        >
                            <div
                                className="inline-block text-xs tracking-widest uppercase px-3 py-1 mb-6"
                                style={{ background: '#ba4826', color: '#fff' }}
                            >
                                Evento 1
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2" style={{ color: '#fff' }}>
                                Lanzamiento del Libro
                            </h3>
                            <p className="text-5xl font-bold mb-1" style={{ color: '#ba4826' }}>27</p>
                            <p className="text-lg font-medium uppercase tracking-widest mb-4" style={{ color: '#DAA520' }}>
                                Marzo 2026
                            </p>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: '#a89060' }}>
                                Acompaña a César Escalante en la presentación oficial de
                                <em> El amor es un delirio</em>. Una noche de lectura, reflexión y conversación
                                sobre los delirios que el amor construye en nuestra mente.
                            </p>
                            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#DAA520' }}>
                                Cuenta regresiva
                            </p>
                            <Countdown targetDate={LAUNCH_DATE} />
                        </div>

                        {/* Evento 2 */}
                        <div
                            className="p-8"
                            style={{
                                background: 'linear-gradient(135deg, rgba(218,165,32,0.1), rgba(0,0,0,0.6))',
                                border: '1px solid #DAA520',
                            }}
                        >
                            <div
                                className="inline-block text-xs tracking-widest uppercase px-3 py-1 mb-6"
                                style={{ background: '#DAA520', color: '#000' }}
                            >
                                Evento 2
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2" style={{ color: '#fff' }}>
                                Seminario-Taller
                            </h3>
                            <p className="text-5xl font-bold mb-1" style={{ color: '#DAA520' }}>25</p>
                            <p className="text-lg font-medium uppercase tracking-widest mb-4" style={{ color: '#ba4826' }}>
                                Abril 2026
                            </p>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: '#a89060' }}>
                                <strong style={{ color: '#DAA520' }}>El amor es un delirio</strong> — Seminario-Taller con César Escalante.
                                Una jornada intensa para comprender, en profundidad, cómo la mente
                                construye el amor y cómo dejar de vivirlo como una amenaza.
                            </p>
                            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#DAA520' }}>
                                Cuenta regresiva
                            </p>
                            <Countdown targetDate={SEMINAR_DATE} />
                        </div>
                    </div>

                    <div className="mt-14">
                        <BuyButton label="Comprar el libro y asistir a los eventos" large />
                        <p className="mt-4 text-xs" style={{ color: '#6b5a3e' }}>
                            * El acceso a ambos eventos está incluido con la compra del libro
                        </p>
                    </div>
                </div>
            </section>

            {/* ── SOBRE EL AUTOR ── */}
            <section className="py-20 px-6" style={{ backgroundColor: '#050505' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#DAA520' }}>El autor</p>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase" style={{ color: '#fff' }}>
                            César Escalante
                        </h2>
                        <Divider />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="shrink-0">
                            <img
                                src="/images/author-photo.png"
                                alt="César Escalante"
                                className="w-56 md:w-64"
                                style={{
                                    border: '2px solid #DAA520',
                                    filter: 'grayscale(20%)',
                                    boxShadow: '8px 8px 0 #ba4826',
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#c8b89a' }}>
                                Durante más de 25 años, su trabajo ha transitado entre la práctica clínica,
                                la teoría y la escritura. Evita el discurso del autoayuda para enfocarse en
                                cómo la mente construye sentido y se defiende frente a la incertidumbre.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#c8b89a' }}>
                                Este libro nació de preguntas clínicas persistentes sobre qué ocurre cuando
                                el amor se transforma de experiencia en interpretación, vigilancia
                                y certeza forzada.
                            </p>
                            <blockquote
                                className="mt-6 pl-5 italic text-base leading-relaxed"
                                style={{ borderLeft: '3px solid #ba4826', color: '#DAA520' }}
                            >
                                "Este no es un libro de autoayuda.<br />
                                Es un ensayo sobre cómo pensamos el amor<br />
                                cuando tenemos miedo de sentirlo."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PORTADA Y CTA FINAL ── */}
            <section className="py-20 px-6 text-center" style={{ backgroundColor: '#0a0800' }}>
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#ba4826' }}>El libro</p>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-10" style={{ color: '#fff' }}>
                        Una obra que<br />
                        <span style={{ color: '#DAA520' }}>transforma tu manera de amar</span>
                    </h2>

                    <div className="flex justify-center mb-10">
                        <img
                            src="/images/book-cover.png"
                            alt="Portada — El Amor es un Delirio"
                            className="w-64 md:w-80"
                            style={{ boxShadow: '20px 20px 60px rgba(186,72,38,0.4), -4px -4px 0 #DAA520' }}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { Icon: FiCalendar, label: 'Disponible desde', value: '20 Feb 2026' },
                            { Icon: FiGlobe, label: 'Distribución', value: 'Internacional' },
                            { Icon: FiBook, label: 'Acceso incluido', value: '2 Eventos en vivo' },
                        ].map(({ Icon, label, value }) => (
                            <div
                                key={label}
                                className="p-5 text-center flex flex-col items-center gap-2"
                                style={{ border: '1px solid rgba(218,165,32,0.2)', background: 'rgba(218,165,32,0.03)' }}
                            >
                                <Icon size={20} color="#ba4826" />
                                <p className="text-xs uppercase tracking-widest" style={{ color: '#ba4826' }}>{label}</p>
                                <p className="text-lg font-bold" style={{ color: '#DAA520' }}>{value}</p>
                            </div>
                        ))}
                    </div>

                    <BuyButton label="Quiero mi libro ahora" large />
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer
                className="py-10 px-6 text-center"
                style={{ backgroundColor: '#000', borderTop: '1px solid rgba(218,165,32,0.15)' }}
            >
                <p className="text-2xl font-bold uppercase mb-2" style={{ color: '#DAA520' }}>
                    El Amor es un Delirio
                </p>
                <p className="text-sm mb-6" style={{ color: '#6b5a3e' }}>
                    César Escalante · elamoresundelirio.com
                </p>
                <div className="flex justify-center gap-8 text-xs uppercase tracking-widest" style={{ color: '#a89060' }}>
                    <span>Lanzamiento 27 marzo</span>
                    <span style={{ color: '#ba4826' }}>·</span>
                    <span>Seminario 25 abril</span>
                </div>
                <p className="mt-8 text-xs" style={{ color: '#3a2e1e' }}>
                    © 2026 César Escalante · Todos los derechos reservados
                </p>
            </footer>
        </div>
    );
}
