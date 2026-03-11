import { GetServerSideProps } from 'next';
import Head from 'next/head';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Staff IDs: SBID-, ADM-, SAD-   |   Ambassador IDs: AMB-
const VALID_PREFIXES = ['SBID-', 'ADM-', 'SAD-', 'AMB-'];
function isValidId(id: string) {
    return VALID_PREFIXES.some(p => id.toUpperCase().startsWith(p));
}

interface PersonData {
    type: 'staff' | 'ambassador';
    verified: boolean;
    staffId: string;
    name: string;
    role: string;
    roleLabel: string;
    designation: string | null;
    staffDepartment: string | null;
    departmentName: string | null;
    institutionName: string | null;
    schoolName: string | null;
    employmentStatus: string;
    profilePicture: string | null;
    employmentDate: string | null;
}

interface Props {
    data: PersonData | null;
    rawId: string;
}

// ─── Avatar with initials fallback ─────────────────────────────────────────
function Avatar({ src, name, size = 96 }: { src: string | null; name: string; size?: number }) {
    const parts = name.trim().split(' ');
    const initials = parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`
        : parts[0]?.[0] ?? '?';

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
        );
    }
    const bg = name.charCodeAt(0) % 2 === 0 ? '#014751' : '#0f766e';
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', background: bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.35, fontWeight: 900, color: '#fff', letterSpacing: '-1px'
        }}>
            {initials.toUpperCase()}
        </div>
    );
}

// ─── Type colours ───────────────────────────────────────────────────────────
function typeTheme(type: string, verified: boolean) {
    if (!verified) return { bar: '#ef4444', badge: '#fee2e2', badgeTxt: '#991b1b', badgeBorder: '#fecaca', dot: '#ef4444' };
    if (type === 'ambassador') return { bar: 'linear-gradient(90deg,#7c3aed,#a855f7)', badge: '#f3e8ff', badgeTxt: '#6b21a8', badgeBorder: '#e9d5ff', dot: '#a855f7' };
    return { bar: 'linear-gradient(90deg,#014751,#10b981)', badge: '#d1fae5', badgeTxt: '#065f46', badgeBorder: '#a7f3d0', dot: '#10b981' };
}

export default function VerifyPage({ data, rawId }: Props) {
    if (!data) {
        return (
            <>
                <Head>
                    <title>Not Found · Sabidub</title>
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
                </Head>
                <style>{`*{font-family:'Manrope',sans-serif;box-sizing:border-box;margin:0;padding:0;}body{background:#f0f4f8;}`}</style>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#f0f4f8,#e8f0fe)', padding: '24px 16px' }}>
                    <Logo />
                    <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', overflow: 'hidden', marginTop: 28 }}>
                        <div style={{ height: 5, background: '#ef4444' }} />
                        <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                            <div style={{ width: 72, height: 72, background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 8 }}>ID Not Recognised</h1>
                            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
                                <strong style={{ color: '#374151' }}>{rawId}</strong> does not match any active Sabidub member.<br />
                                This ID may be invalid or the person may no longer be active.
                            </p>
                            <div style={{ marginTop: 20, padding: '12px 16px', background: '#fef3c7', borderRadius: 12, border: '1px solid #fde68a' }}>
                                <p style={{ fontSize: 11, color: '#92400e', fontWeight: 700 }}>⚠ If you believe this is an error, contact Sabidub support at support@sabidub.com</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    const theme = typeTheme(data.type, data.verified);
    const orgName = data.schoolName || data.institutionName;

    const typeLabel = data.type === 'ambassador' ? 'Ambassador ID' : 'Staff ID';

    return (
        <>
            <Head>
                <title>{data.name} · Sabidub {data.type === 'ambassador' ? 'Ambassador' : 'Staff'}</title>
                <meta name="description" content={`Official Sabidub identity verification for ${data.name}.`} />
                <meta name="robots" content="noindex,nofollow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <style>{`
                *{font-family:'Manrope',sans-serif;box-sizing:border-box;margin:0;padding:0;}
                body{background:#f0f4f8;}
                @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
                @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.25)}50%{box-shadow:0 0 0 10px rgba(16,185,129,0)}}
                .card{animation:fadeUp .5s ease both}
                .footer-anim{animation:fadeUp .5s .15s ease both}
            `}</style>

            <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg,#f0f4f8 0%,#e8f0fe 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>

                <Logo />

                <div className="card" style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 28, overflow: 'hidden', marginTop: 28 }}>

                    {/* Accent top bar */}
                    <div style={{ height: 6, background: theme.bar }} />

                    <div style={{ padding: '36px 28px 32px' }}>

                        {/* Avatar row */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 20 }}>
                            {/* Avatar with status ring */}
                            <div style={{ position: 'relative', marginBottom: 14 }}>
                                {data.verified && (
                                    <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `2px solid ${theme.dot}`, opacity: 0.35, animation: 'glowPulse 2.8s ease infinite' }} />
                                )}
                                <div style={{ borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', position: 'relative' }}>
                                    <Avatar src={data.profilePicture} name={data.name} size={100} />
                                </div>
                                {/* Status dot */}
                                <div style={{ position: 'absolute', bottom: 5, right: 5, width: 20, height: 20, borderRadius: '50%', background: theme.dot, border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                            </div>

                            {/* Verified badge */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: theme.badge, border: `1px solid ${theme.badgeBorder}`, borderRadius: 99, padding: '4px 14px', marginBottom: 12 }}>
                                {data.verified
                                    ? <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke={theme.badgeTxt} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    : <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M18.364 5.636l-12.728 12.728" stroke={theme.badgeTxt} strokeWidth="2.2" strokeLinecap="round" /></svg>
                                }
                                <span style={{ fontSize: 10, fontWeight: 800, color: theme.badgeTxt, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {data.verified ? 'Verified' : 'Inactive'} · {data.type === 'ambassador' ? 'Sabidub Ambassador' : 'Sabidub Staff'}
                                </span>
                            </div>

                            {/* Name */}
                            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', textAlign: 'center', lineHeight: 1.2, marginBottom: 6 }}>{data.name}</h1>

                            {/* Role + designation */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: theme.badgeTxt, background: theme.badge, border: `1px solid ${theme.badgeBorder}`, borderRadius: 8, padding: '3px 10px' }}>
                                    {data.roleLabel}
                                </span>
                                {data.designation && data.designation !== data.roleLabel && (
                                    <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b' }}>{data.designation}</span>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0 18px' }} />

                        {/* Info grid */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                            <InfoRow icon="🪪" label={typeLabel} value={data.staffId} mono />
                            {(data.staffDepartment || data.departmentName) && (
                                <InfoRow icon="🏢" label="Department" value={data.staffDepartment || data.departmentName} />
                            )}
                            {orgName && (
                                <InfoRow
                                    icon="🎓"
                                    label="Institution"
                                    value={orgName}
                                />
                            )}
                            <InfoRow
                                icon={data.verified ? '✅' : '🔴'}
                                label="Status"
                                value={data.employmentStatus.replace(/_/g, ' ')}
                                highlight={data.verified ? 'green' : 'red'}
                            />
                            {data.type === 'ambassador' && data.employmentDate && (
                                <InfoRow
                                    icon="📅"
                                    label="Active Since"
                                    value={new Date(data.employmentDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

// ─── Shared sub-components ───────────────────────────────────────────────────
function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
            <img
                src="/images/black.png"
                alt="Sabidub"
                style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />
        </div>
    );
}

function Footer() {
    return (
        <div className="footer-anim" style={{ marginTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, lineHeight: 1.8 }}>
                Official Sabidub identity verification page.<br />
                <a href="https://www.sabidub.com" style={{ color: '#014751', textDecoration: 'none', fontWeight: 800 }}>www.sabidub.com</a>
            </p>
        </div>
    );
}

function InfoRow({ icon, label, value, mono = false, highlight }: {
    icon: string; label: string; value: string | null | undefined;
    mono?: boolean; highlight?: 'green' | 'red';
}) {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: '#f8fafc', borderRadius: 12 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{label}</p>
                <p style={{
                    fontSize: 13, fontWeight: 700,
                    fontFamily: mono ? 'monospace' : 'Manrope,sans-serif',
                    color: highlight === 'green' ? '#065f46' : highlight === 'red' ? '#991b1b' : '#1e293b',
                    background: highlight === 'green' ? '#d1fae5' : highlight === 'red' ? '#fee2e2' : 'transparent',
                    padding: highlight ? '2px 8px' : '0',
                    borderRadius: highlight ? 7 : 0,
                    display: 'inline-block',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
                    letterSpacing: mono ? '0.05em' : 'normal',
                }}>{value}</p>
            </div>
        </div>
    );
}

// ─── Server-side data fetch ──────────────────────────────────────────────────
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const rawId = (params?.staffId as string) || '';

    // Only handle known ID prefixes; everything else is a proper 404
    if (!isValidId(rawId)) {
        return { notFound: true };
    }

    try {
        const res = await fetch(`${API_BASE}/api/staff/verify/${encodeURIComponent(rawId.toUpperCase())}`, {
            headers: { 'Accept': 'application/json' },
        });

        if (!res.ok) {
            return { props: { data: null, rawId } };
        }

        const data = await res.json();
        return { props: { data, rawId } };
    } catch {
        return { props: { data: null, rawId } };
    }
};
