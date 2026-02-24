import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiShoppingCart, FiStar } from 'react-icons/fi';

function Divider() {
    return (
        <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #DAA520)' }} />
            <FiStar size={14} color="#DAA520" />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #DAA520)' }} />
        </div>
    );
}

function InputField({ label, icon: Icon, type = 'text', value, onChange, error, placeholder, disabled }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: '#DAA520' }}
            >
                {label}
            </label>
            <div className="relative">
                <Icon
                    size={16}
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: error ? '#ba4826' : '#6b5a3e',
                    }}
                />
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.75rem',
                        background: 'rgba(218,165,32,0.04)',
                        border: `1px solid ${error ? '#ba4826' : 'rgba(218,165,32,0.25)'}`,
                        color: '#f5f0e8',
                        fontSize: '0.95rem',
                        outline: 'none',
                        opacity: disabled ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                        if (!disabled) {
                            e.target.style.borderColor = '#DAA520';
                        }
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? '#ba4826' : 'rgba(218,165,32,0.25)';
                    }}
                />
            </div>
            {error && (
                <p className="text-xs" style={{ color: '#ba4826' }}>{error}</p>
            )}
        </div>
    );
}

export default function PurchasePage({ storeUrl, landingUrl }) {
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!form.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido.';
        }
        if (!form.email.trim()) {
            newErrors.email = 'El correo es requerido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Ingresa un correo válido.';
        }
        if (!form.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

        try {
            const csrfToken = document.cookie
                .split('; ')
                .find((row) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const response = await fetch(storeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': csrfToken ? decodeURIComponent(csrfToken) : '',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setServerError(data.message || 'Ocurrió un error. Inténtalo de nuevo.');
                }
                return;
            }

            window.location.href = data.checkout_url;
        } catch {
            setServerError('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: '#000', color: '#f5f0e8' }}>
            {/* Header */}
            <div
                className="px-6 py-5 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(218,165,32,0.15)' }}
            >
                <a
                    href={landingUrl}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest transition-colors duration-200"
                    style={{ color: '#6b5a3e' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#DAA520'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6b5a3e'; }}
                >
                    <FiArrowLeft size={16} />
                    Volver
                </a>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#DAA520' }}>
                    El Amor es un Delirio
                </p>
            </div>

            {/* Main */}
            <div className="max-w-lg mx-auto px-6 py-14">
                {/* Producto */}
                <div
                    className="p-6 mb-8"
                    style={{
                        border: '1px solid rgba(218,165,32,0.25)',
                        background: 'linear-gradient(135deg, rgba(186,72,38,0.08), rgba(0,0,0,0.6))',
                    }}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#ba4826' }}>Tu compra</p>
                            <p className="text-lg font-bold uppercase" style={{ color: '#fff' }}>
                                El Amor es un Delirio
                            </p>
                            <p className="text-sm mt-1" style={{ color: '#a89060' }}>
                                César Escalante · Libro + 2 eventos
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-2xl font-black" style={{ color: '#DAA520' }}>S/. 200</p>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="mb-6">
                    <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#DAA520' }}>
                        Tus datos
                    </p>
                    <h1 className="text-2xl font-bold uppercase" style={{ color: '#fff' }}>
                        Completa tu información
                    </h1>
                    <Divider />
                </div>

                {serverError && (
                    <div
                        className="p-4 mb-6 text-sm"
                        style={{ background: 'rgba(186,72,38,0.15)', border: '1px solid #ba4826', color: '#f5c0b0' }}
                    >
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <InputField
                        label="Nombre completo"
                        icon={FiUser}
                        value={form.nombre}
                        onChange={handleChange('nombre')}
                        error={errors.nombre}
                        placeholder="Tu nombre completo"
                        disabled={isLoading}
                    />
                    <InputField
                        label="Correo electrónico"
                        icon={FiMail}
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        placeholder="tu@correo.com"
                        disabled={isLoading}
                    />
                    <InputField
                        label="Teléfono"
                        icon={FiPhone}
                        type="tel"
                        value={form.telefono}
                        onChange={handleChange('telefono')}
                        error={errors.telefono}
                        placeholder="+51 999 999 999"
                        disabled={isLoading}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-3 w-full py-4 font-bold uppercase tracking-widest text-sm mt-2 transition-all duration-300"
                        style={{
                            background: isLoading
                                ? 'rgba(186,72,38,0.4)'
                                : 'linear-gradient(135deg, #ba4826, #8a3318)',
                            color: '#fff',
                            border: '2px solid #DAA520',
                            boxShadow: isLoading ? 'none' : '0 0 30px rgba(186,72,38,0.4)',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: '#fff',
                                        borderRadius: '50%',
                                        animation: 'spin 0.7s linear infinite',
                                    }}
                                />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <FiShoppingCart size={18} />
                                Proseguir con la compra
                                <span
                                    style={{
                                        fontWeight: 900,
                                        color: '#DAA520',
                                        borderLeft: '1px solid rgba(218,165,32,0.5)',
                                        paddingLeft: '0.75rem',
                                    }}
                                >
                                    S/. 200
                                </span>
                            </>
                        )}
                    </button>

                    <p className="text-xs text-center" style={{ color: '#3a2e1e' }}>
                        Serás redirigido a MercadoPago para completar el pago de forma segura.
                    </p>
                </form>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
