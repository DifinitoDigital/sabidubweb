import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    LuCheck,
    LuX,
    LuInfo,
    LuSchool,
    LuGraduationCap,
    LuSearch,
    LuChevronRight,
    LuChevronDown,
    LuSettings2,
    LuBinary,
    LuHistory,
    LuZap,
    LuActivity,
    LuBookOpen,
    LuArrowRight,
    LuPlus,
    LuTrash2,
    LuLock,
    LuLockOpen,
    LuShoppingCart
} from 'react-icons/lu';

// --- Type Definitions ---
type Grade = 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6';
type ExamType = 'WAEC' | 'NECO' | 'NABTEB' | 'GCE';
type AdmissionChance = 'High' | 'Medium' | 'Low';

interface SubjectEntry {
    id: string;
    name: string;
    grade: Grade;
}

const GRADE_VALUES: Record<Grade, number> = {
    'A1': 6, 'B2': 5, 'B3': 4, 'C4': 3, 'C5': 2, 'C6': 1
};

// --- Components ---

const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">{children}</label>
);

const Select = ({ value, onChange, options, placeholder }: { value: string, onChange: (val: string) => void, options: string[], placeholder?: string }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors font-medium text-sm"
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-3.5 text-gray-500 pointer-events-none">
            <LuChevronDown />
        </div>
    </div>
);

const GradeSelect = ({ value, onChange }: { value: Grade, onChange: (val: Grade) => void }) => (
    <div className="relative min-w-[80px]">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Grade)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-3 appearance-none focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-center font-bold text-sm"
        >
            {Object.keys(GRADE_VALUES).map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <div className="absolute right-2 top-3.5 text-gray-500 pointer-events-none">
            <LuChevronDown className="w-3 h-3" />
        </div>
    </div>
);

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function AdmissionChecker() {
    // API Base URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    // State
    const [selectedExams, setSelectedExams] = useState<string[]>(['WAEC']);
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [globalCourses, setGlobalCourses] = useState<string[]>([]);
    const [subjectsList, setSubjectsList] = useState<string[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);

    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('');
    const [targetDepartmentId, setTargetDepartmentId] = useState<string>('');

    const toggleExam = (type: string) => {
        if (selectedExams.includes(type)) {
            if (selectedExams.length > 1) setSelectedExams(selectedExams.filter(t => t !== type));
        } else {
            if (selectedExams.length < 2) setSelectedExams([...selectedExams, type]);
        }
    };

    const [subjects, setSubjects] = useState<SubjectEntry[]>([
        { id: '1', name: 'English Language', grade: 'C6' },
        { id: '2', name: 'Mathematics', grade: 'C6' },
        { id: '3', name: '', grade: 'C6' },
        { id: '4', name: '', grade: 'C6' },
        { id: '5', name: '', grade: 'C6' }
    ]);
    const [jambScore, setJambScore] = useState<number | ''>('');
    const [targetCourseName, setTargetCourseName] = useState<string>('');
    const [targetUniName, setTargetUniName] = useState<string>('');

    const [results, setResults] = useState<any[] | null>(null);
    const [previewData, setPreviewData] = useState<any | null>(null);
    const [selectedResult, setSelectedResult] = useState<any | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [isChecking, setIsChecking] = useState(false);
    const [usageInfo, setUsageInfo] = useState<{
        viewCount: number;
        totalViews: number;
        viewsRemaining: number;
        expiresAt: Date;
        planName?: string;
    } | null>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [savedPaymentId, setSavedPaymentId] = useState<string>('');
    const [resumePaymentId, setResumePaymentId] = useState<string>('');
    const [isResuming, setIsResuming] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [alertConfig, setAlertConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: 'error' | 'success' | 'info';
    }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    const verifyingRef = useRef<string | null>(null);

    const [toastConfig, setToastConfig] = useState<{
        isOpen: boolean;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        isOpen: false,
        message: '',
        type: 'info'
    });

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastConfig({ isOpen: true, message, type });
        setTimeout(() => setToastConfig(prev => ({ ...prev, isOpen: false })), 3000);
    };

    const showAlert = (title: string, message: string, type: 'error' | 'success' | 'info' = 'info') => {
        setAlertConfig({ isOpen: true, title, message, type });
    };

    const router = useRouter();

    // Initial Data Fetch
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [instRes, courseRes, subjectRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/admission/institutions`),
                    fetch(`${API_BASE_URL}/admission/courses`),
                    fetch(`${API_BASE_URL}/admission/subjects`)
                ]);

                if (instRes.ok) setInstitutions(await instRes.json());
                if (courseRes.ok) setGlobalCourses(await courseRes.json());
                if (subjectRes.ok) {
                    const sbjs = await subjectRes.json();
                    if (sbjs.length > 0) setSubjectsList(sbjs);
                }
            } catch (err) {
                console.error("Failed to load admission data", err);
            }
        };

        if (router.isReady) {
            loadInitialData();

            // Check for payment return (ONLY if we haven't processed this reference yet)
            const { reference, paymentId, status } = router.query;
            if (reference && paymentId && status === 'success' && verifyingRef.current !== reference) {
                verifyingRef.current = reference as string;
                handleVerifyReturn(paymentId as string, reference as string);
            }
        }
    }, [router.isReady]); // Removed router.query to prevent multiple triggers; we check query inside manually

    useEffect(() => {
        if (previewData?.plans && previewData.plans.length > 0) {
            setSelectedPlanId(previewData.plans[0].id);
        }
    }, [previewData]);

    const handleVerifyReturn = async (payId: string, ref: string) => {
        setIsUnlocking(true);
        try {
            const res = await fetch(`${API_BASE_URL}/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: ref, payerType: 'ADMISSION_CHECK', profileId: payId })
            });
            const data = await res.json();

            if (data.status === 'success') {
                // Fetch full results
                const resultsRes = await fetch(`${API_BASE_URL}/admission/results/${payId}`);
                if (resultsRes.ok) {
                    const fullData = await resultsRes.json();

                    if (fullData.unlocked) {
                        setResults(fullData.results || []);
                        setJambScore(fullData.jambScore || '');

                        // Handle subjects carefully
                        const rawSubjects = Array.isArray(fullData.subjects) ? fullData.subjects : [];
                        if (rawSubjects.length > 0) {
                            setSubjects(rawSubjects.map((s: any) => ({
                                id: Math.random().toString(36).substr(2, 9),
                                name: s.name,
                                grade: s.grade
                            })));
                        }

                        setIsPaid(true);
                        setPreviewData(null);
                        setSavedPaymentId(payId);

                        setUsageInfo({
                            viewCount: fullData.viewCount,
                            totalViews: fullData.totalViews || 3,
                            viewsRemaining: fullData.viewsRemaining,
                            expiresAt: fullData.expiresAt,
                            planName: fullData.planName
                        });

                        // Clear query params to clean URL
                        router.replace('/admission-checker', undefined, { shallow: true });
                        showToast("Payment verified! Your results are now unlocked.", "success");
                    } else {
                        // Still in preview mode? Something is wrong with verification timing
                        setPreviewData(fullData);
                        showToast("Verification complete, fetching results...", "info");
                    }
                }
            } else {
                showAlert('Payment Verification', data.error || data.message || 'Payment verification failed. If you were charged, please use your Payment ID to resume.', 'error');
            }
        } catch (err) {
            console.error("Verification error:", err);
            showAlert('Verification Error', "We couldn't verify your payment. Please try searching with your Payment ID.", 'error');
        } finally {
            setIsUnlocking(false);
        }
    };

    // Fetch Departments when Institution changes
    useEffect(() => {
        if (selectedInstitutionId) {
            fetch(`${API_BASE_URL}/admission/departments/${selectedInstitutionId}`)
                .then(res => res.json())
                .then(data => setFilteredDepartments(data))
                .catch(err => console.error(err));
        } else {
            setFilteredDepartments([]);
        }
    }, [selectedInstitutionId]);

    // Handlers
    const addSubject = () => {
        if (subjects.length < 9) {
            setSubjects([...subjects, { id: Math.random().toString(), name: '', grade: 'C6' }]);
        }
    };

    const removeSubject = (id: string) => {
        if (subjects.length > 5) {
            setSubjects(subjects.filter(s => s.id !== id));
        }
    };

    const updateSubject = (id: string, field: 'name' | 'grade', value: string) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const checkAdmission = async () => {
        setIsChecking(true);
        // Don't reset results/isPaid yet so the user doesn't see a flicker or lose their spot
        // if they are just re-clicking with the same data.

        try {
            const body = {
                jambScore: Number(jambScore),
                subjects: subjects.filter(s => s.name).map(s => ({ name: s.name, grade: s.grade })),
                targetInstitutionId: selectedInstitutionId || undefined,
                targetDepartmentId: targetDepartmentId || undefined,
                targetCourseName: targetCourseName || undefined,
                examTypes: selectedExams,
                paymentId: savedPaymentId || undefined
            };

            const res = await fetch(`${API_BASE_URL}/admission/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                if (errorData.message?.includes('JAMB score cannot be changed')) {
                    showAlert(
                        'JAMB Score Locked',
                        'This payment ID is locked to a different JAMB score. You cannot share or reuse payment IDs with different JAMB scores. Please start a new check or use the correct JAMB score.',
                        'error'
                    );
                    setSavedPaymentId(''); // Clear the invalid payment ID
                    return;
                }
                throw new Error(errorData.message || 'Failed to check eligibility');
            }

            const data = await res.json();

            // IMPORTANT: If backend returns subjects in preview/results, map them with unique IDs
            if (data.subjects) {
                const subjectsWithIds = data.subjects.map((s: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    name: s.name,
                    grade: s.grade
                }));
                setSubjects(subjectsWithIds);
            }

            // Clear old states after we get new data
            setResults(null);
            setPreviewData(null);

            if (data.preview) {
                setIsPaid(false); // New data needs new payment
                setPreviewData(data);
            } else if (data.unlocked || !data.preview) {
                // If it returned full results (either unlockedSession or free results)
                const resultsRaw = data.unlocked ? data.results : data;
                setResults(resultsRaw);
                setIsPaid(true);

                // Ensure subjects have unique IDs when coming from backend
                if (data.unlocked && data.subjects) {
                    setSubjects(data.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                } else if (data.subjects) {
                    setSubjects(data.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                }

                if (data.unlocked) {
                    setUsageInfo({
                        viewCount: data.viewCount,
                        totalViews: data.totalViews || 3,
                        viewsRemaining: data.viewsRemaining,
                        expiresAt: data.expiresAt,
                        planName: data.planName
                    });
                }
            }
        } catch (err) {
            console.error(err);
            showAlert('Backend Error', "Connection error: Make sure the backend server is running.", 'error');
        } finally {
            setIsChecking(false);
        }
    };

    const handleUnlock = async () => {
        if (!previewData?.paymentId) return;

        const planToUse = previewData.plans?.find((p: any) => p.id === selectedPlanId) || previewData.plans?.[0] || { id: previewData.planId, price: previewData.amount };

        setIsUnlocking(true);
        try {
            const initRes = await fetch(`${API_BASE_URL}/payment/initialize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail.trim() || 'guest@sabidub.com',
                    amount: planToUse.price,
                    payerType: 'ADMISSION_CHECK',
                    planId: planToUse.id,
                    profileId: previewData.paymentId,
                    // Extra data for on-the-fly creation
                    jambScore: previewData.isNewCheck ? Number(jambScore) : undefined,
                    subjects: previewData.isNewCheck ? subjects : undefined,
                    results: previewData.isNewCheck ? previewData.results : undefined,
                })
            });

            if (!initRes.ok) throw new Error('Failed to initialize payment');

            const initData = await initRes.json();
            if (initData.authorization_url) {
                window.location.href = initData.authorization_url;
            } else {
                throw new Error('No authorization URL received');
            }
        } catch (err) {
            console.error(err);
            showToast("Failed to initialize payment. Please try again.", "error");
            setIsUnlocking(false);
        }
    };


    const handleResumeCheck = async () => {
        if (!resumePaymentId.trim()) {
            showAlert('Payment ID Required', 'Please enter your Payment ID to continue.', 'info');
            return;
        }

        setIsResuming(true);
        try {
            const resultsRes = await fetch(`${API_BASE_URL}/admission/results/${resumePaymentId.trim()}`);
            if (!resultsRes.ok) throw new Error('Failed to fetch results');

            const fullData = await resultsRes.json();
            if (fullData.unlocked) {
                setResults(fullData.results);
                setJambScore(fullData.jambScore || '');
                if (fullData.subjects) {
                    setSubjects(fullData.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                }
                setIsPaid(true);
                setPreviewData(null);
                setSavedPaymentId(resumePaymentId.trim());
                setUsageInfo({
                    viewCount: fullData.viewCount,
                    totalViews: fullData.totalViews || 3,
                    viewsRemaining: fullData.viewsRemaining,
                    expiresAt: fullData.expiresAt,
                    planName: fullData.planName
                });
                setResumePaymentId('');
            } else if (fullData.preview) {
                // Resume a pending/failed payment
                setIsPaid(false);
                setPreviewData(fullData);
                setJambScore(fullData.jambScore || '');
                if (fullData.subjects) {
                    setSubjects(fullData.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                }
                setSavedPaymentId(resumePaymentId.trim());
                setResumePaymentId('');
            } else if (fullData.viewLimitReached) {
                showAlert('View Limit Reached', fullData.message + '\n\nYou can make a new payment to continue checking.', 'info');
            } else if (fullData.expired) {
                showAlert('Check Expired', fullData.message, 'error');
            } else {
                showAlert('Access Denied', fullData.message || 'Unable to retrieve results. Please check your Payment ID.', 'error');
            }
        } catch (err) {
            console.error(err);
            showAlert('Search Error', 'Failed to retrieve results. Please verify your Payment ID and try again.', 'error');
        } finally {
            setIsResuming(false);
        }
    };

    const generatePDF = async () => {
        if (!results || results.length === 0) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Helper to load image and get ratio
        const loadImage = (url: string): Promise<{ data: string, ratio: number }> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = url;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0);
                    resolve({
                        data: canvas.toDataURL('image/png'),
                        ratio: img.width / img.height
                    });
                };
                img.onerror = reject;
            });
        };

        try {
            // Header Background
            doc.setFillColor(242, 201, 76); // Sabidub Yellow
            doc.rect(0, 0, pageWidth, 50, 'F');

            // Add Logo with aspect ratio correction
            try {
                const logo = await loadImage('/images/black.png');
                const logoWidth = 40;
                const logoHeight = logoWidth / logo.ratio;
                doc.addImage(logo.data, 'PNG', (pageWidth / 2) - (logoWidth / 2), 10, logoWidth, logoHeight);
            } catch (e) {
                console.warn("Could not load logo for PDF", e);
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.setTextColor(0, 0, 0);
            doc.text('ADMISSION ELIGIBILITY REPORT', pageWidth / 2, 32, { align: 'center' });

            doc.setFontSize(9);
            doc.setFont('helvetica', 'medium');
            doc.text('Official Academic Suitability Analysis', pageWidth / 2, 40, { align: 'center' });

            // Metadata Section
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            doc.text(`JAMB Score: ${jambScore}`, 20, 65);
            doc.text(`Payment ID: ${savedPaymentId}`, pageWidth - 20, 65, { align: 'right' });
            doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 20, 72);

            // Subject Combination Table
            const subjectRows = subjects.filter(s => s.name).map(s => [s.name, s.grade]);
            autoTable(doc, {
                startY: 80,
                head: [['O\'Level Subject', 'Grade']],
                body: subjectRows,
                theme: 'striped',
                headStyles: { fillColor: [40, 40, 40] },
                margin: { left: 20, right: 20 }
            });

            // Results Section Title
            const finalY = (doc as any).lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Recommended Institutions & Courses', 20, finalY);

            // Results Table
            const resultRows = results.map(r => [
                r.university,
                r.course,
                r.chance,
                r.reason.replace(/✅|⚠️|❌/g, '') // Remove emojis
            ]);

            autoTable(doc, {
                startY: finalY + 5,
                head: [['Institution', 'Program', 'Chance', 'Reason/Eligibility']],
                body: resultRows,
                theme: 'grid',
                headStyles: { fillColor: [40, 40, 40] },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 40 },
                    1: { cellWidth: 35 },
                    2: { cellWidth: 20 },
                    3: { fontSize: 8 }
                },
                margin: { left: 20, right: 20 }
            });

            // Disclaimer
            const finalResultsY = (doc as any).lastAutoTable.finalY + 20;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(150, 150, 150);
            doc.text('Disclaimer: This report is an eligibility analysis based on available institutional cut-off marks and requirements. Final admission is at the discretion of the tertiary institution.', 20, finalResultsY, { maxWidth: pageWidth - 40 });

            // Branding Footer
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(180, 180, 180);
            doc.text('POWERED BY DIFINITO', pageWidth / 2, pageHeight - 15, { align: 'center' });

            doc.save(`Sabidub_Report_${savedPaymentId || 'Check'}.pdf`);
            showToast("PDF generated successfully!", "success");
        } catch (err) {
            console.error("PDF Generation Error:", err);
            showToast("Failed to generate PDF.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Head>
                <title>Admission Checker | SabiDub</title>
            </Head>

            <nav className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/images/black.png" alt="SabiDub" className="h-8 w-auto object-contain" />
                </div>
                <div className="flex gap-4">
                    <a href="/" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                    <a href="/pricing" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Modern Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 text-xs font-bold uppercase tracking-wider mb-2">
                            <LuInfo className="w-5 h-5" />
                            Admission Criteria
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-gray-900">
                            Check <span className="text-yellow-500">Eligibility</span>
                        </h1>
                        <p className="max-w-xl text-sm font-medium text-gray-500">
                            Enter your academic credentials to analyze your admission chances instantly.
                        </p>
                    </div>

                    {/* Resume Check Input */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm max-w-md">
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                            Have a Payment ID?
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={resumePaymentId}
                                onChange={(e) => setResumePaymentId(e.target.value)}
                                placeholder="Enter Payment ID"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                onClick={handleResumeCheck}
                                disabled={isResuming || !resumePaymentId.trim()}
                                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {isResuming ? 'Loading...' : 'Resume'}
                            </button>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400 font-medium">
                            Retrieve your previously paid results
                        </p>
                    </div>
                </div>

                {/* Saved Payment ID Banner */}
                {savedPaymentId && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-green-900">
                                    <LuCheck className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-bold">Payment ID (Save this for future access)</span>
                                </div>
                                <p className="text-[10px] text-green-700 font-medium ml-7">
                                    Valid for 1 month. You can use this ID to resume your check on any device.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <code className="px-3 py-1.5 bg-white border border-green-300 rounded-lg text-sm font-mono font-bold text-green-700">
                                    {savedPaymentId}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(savedPaymentId);
                                        showToast('Payment ID copied to clipboard!');
                                    }}
                                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* LEFT: Dashboard-style Form */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="w-full lg:w-5/12"
                    >
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                            {/* Background Accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20 text-black">
                                        <LuGraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black uppercase tracking-tight">Academic Profile</h2>
                                        <p className="text-xs font-medium text-gray-400">Update your details below</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Exam Type */}
                                    <div>
                                        <InputLabel>Examination Type</InputLabel>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['WAEC', 'NECO', 'NABTEB', 'GCE'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => toggleExam(type)}
                                                    className={`relative py-3 px-2 text-xs font-black uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-1.5 ${selectedExams.includes(type)
                                                        ? 'bg-yellow-400 text-black border-yellow-400 shadow-sm'
                                                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {type}
                                                    {selectedExams.includes(type) && (
                                                        <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[8px]">
                                                            <LuCheck strokeWidth={4} />
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-medium mt-2 text-right">
                                            {selectedExams.length === 2 ? 'Two sittings combined.' : 'Single sitting selected.'}
                                        </p>
                                    </div>

                                    {/* JAMB */}
                                    <div>
                                        <InputLabel>JAMB UTME Score</InputLabel>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={jambScore}
                                                onChange={(e) => setJambScore(Number(e.target.value))}
                                                placeholder="e.g. 260"
                                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 font-mono text-lg font-bold placeholder-gray-300"
                                            />
                                            <div className="absolute right-4 top-3.5 text-xs font-bold text-gray-400 pointer-events-none">/ 400</div>
                                        </div>
                                    </div>

                                    {/* Subjects */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <InputLabel>Subject Combination</InputLabel>
                                            {subjects.length < 9 && (
                                                <button onClick={addSubject} className="text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:text-yellow-700 transition-colors">
                                                    + Add Subject
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            {subjects.map((subject, index) => (
                                                <div key={subject.id} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-gray-50/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-gray-100 sm:border-0 relative">
                                                    <div className="flex-1 w-full">
                                                        <Select
                                                            value={subject.name}
                                                            onChange={(val) => updateSubject(subject.id, 'name', val)}
                                                            options={subjectsList.filter(opt => !subjects.some(s => s.name === opt && s.id !== subject.id))}
                                                            placeholder={`Subject ${index + 1}`}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                                        <div className="flex-1 sm:w-24">
                                                            <GradeSelect
                                                                value={subject.grade}
                                                                onChange={(val) => updateSubject(subject.id, 'grade', val)}
                                                            />
                                                        </div>
                                                        {subjects.length > 5 && (
                                                            <button
                                                                onClick={() => removeSubject(subject.id)}
                                                                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-gray-100 sm:border-0"
                                                            >
                                                                <LuTrash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Selectors */}
                                    <div className="pt-4 border-t border-gray-100 space-y-4">
                                        <div>
                                            <InputLabel>Preferred Course</InputLabel>
                                            <Select
                                                value={targetCourseName}
                                                onChange={(val) => {
                                                    setTargetCourseName(val);
                                                    if (selectedInstitutionId) {
                                                        const dept = filteredDepartments.find(d => d.name === val);
                                                        setTargetDepartmentId(dept?.id || '');
                                                    } else {
                                                        setTargetDepartmentId('');
                                                    }
                                                }}
                                                options={selectedInstitutionId ? filteredDepartments.map(d => d.name) : globalCourses}
                                                placeholder="Select Preferred Course"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel>Preferred Institution (Optional)</InputLabel>
                                            <Select
                                                value={targetUniName}
                                                onChange={(val) => {
                                                    setTargetUniName(val);
                                                    const inst = institutions.find(i => i.name === val);
                                                    setSelectedInstitutionId(inst?.id || '');
                                                    // Reset course when institution changes
                                                    setTargetCourseName('');
                                                    setTargetDepartmentId('');
                                                }}
                                                options={institutions.map(i => i.name)}
                                                placeholder="All Institutions"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={checkAdmission}
                                        disabled={!jambScore || !targetCourseName || isChecking}
                                        className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${!jambScore || !targetCourseName || isChecking
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-yellow-400/25 active:scale-95'
                                            }`}
                                    >
                                        {isChecking ? (
                                            <>
                                                <LuActivity className="w-5 h-5 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Check Eligibility
                                                <LuArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Results Area */}
                    <div className="flex-1 w-full">
                        {!results && !previewData && !isChecking && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white border border-gray-100 shadow-xl shadow-gray-200/20 rounded-3xl"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <LuBookOpen className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-black text-gray-300 mb-2 uppercase tracking-tight">Ready to Analyze</h3>
                                <p className="text-gray-400 max-w-sm font-medium">Complete your academic profile on the left to discover your admission possibilities.</p>
                            </motion.div>
                        )}

                        {previewData && !isPaid && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-6 sm:p-12 bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] relative overflow-hidden"
                            >
                                {/* Background Decorations */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

                                <div className="relative z-10 w-full max-w-lg">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-black text-[10px] font-black rounded-full uppercase tracking-widest mb-4 shadow-lg shadow-yellow-400/20">
                                        <LuZap className="w-3 h-3" />
                                        Analysis Ready
                                    </div>

                                    <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center mb-5 mx-auto shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform">
                                        <LuLock className="w-7 h-7 text-yellow-400" />
                                    </div>

                                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight leading-tight">
                                        {previewData.isRenewal ? 'Renew Access' : previewData.isRetry ? 'Payment Failed' : 'Results Found!'}
                                    </h2>

                                    {/* Status Badge */}
                                    {(previewData.isRenewal || previewData.isRetry) && (
                                        <div className={`mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${previewData.isRenewal ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-red-50 text-red-600 border border-red-100'
                                            }`}>
                                            {previewData.isRenewal ? 'Views Subscription Ended' : 'Transaction Declined'}
                                        </div>
                                    )}

                                    <p className="text-gray-500 font-medium mb-6 leading-relaxed px-4 text-sm">
                                        {previewData.message || (previewData.totalHigh + previewData.totalMedium > 0
                                            ? `We found ${previewData.totalHigh + previewData.totalMedium} opportunities for your profile.`
                                            : "Analyzing your profile completed. No matches found.")}
                                    </p>

                                    <div className="mb-6 inline-flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID:</span>
                                        <code className="text-xs font-mono font-black text-gray-900">{previewData.paymentId}</code>
                                    </div>

                                    {/* Warning about JAMB score lock */}
                                    <div className="mb-6 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-left shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                                <LuInfo className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-amber-900 uppercase tracking-[0.1em] mb-0.5">Security Notice</p>
                                                <p className="text-[11px] text-amber-700/80 font-semibold leading-relaxed">
                                                    Results are tied to Score <span className="text-amber-900 font-black">{jambScore}</span>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 w-full mb-6">
                                        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/20 group hover:border-green-200 transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-2 mx-auto">
                                                <LuCheck className="w-4 h-4" strokeWidth={3} />
                                            </div>
                                            <div className="text-2xl font-black text-gray-900 mb-0">{previewData.totalHigh}</div>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">High Chance</div>
                                        </div>
                                        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/20 group hover:border-yellow-200 transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-2 mx-auto">
                                                <LuInfo className="w-4 h-4" />
                                            </div>
                                            <div className="text-2xl font-black text-gray-900 mb-0">{previewData.totalMedium}</div>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Medium Chance</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Plan Selection */}
                                {previewData.plans && previewData.plans.length > 0 && (
                                    <div className="w-full max-w-sm flex flex-col gap-3 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px bg-gray-100 flex-1"></div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                                Select Plan
                                            </label>
                                            <div className="h-px bg-gray-100 flex-1"></div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {previewData.plans.map((p: any) => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => setSelectedPlanId(p.id)}
                                                    className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-left group relative ${selectedPlanId === p.id
                                                        ? 'border-yellow-400 bg-white shadow-xl shadow-yellow-200/40 scale-[1.01]'
                                                        : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                                                        }`}
                                                >
                                                    {selectedPlanId === p.id && (
                                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                                                    )}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="font-black text-xs text-gray-900 leading-none">{p.name}</span>
                                                            {p.isRecommended && (
                                                                <span className="bg-gray-900 text-yellow-400 text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-lg">Best</span>
                                                            )}
                                                        </div>
                                                        <div className="text-[9px] text-gray-400 font-bold tracking-tight line-clamp-1">
                                                            {p.features?.slice(0, 2).join(' • ') || 'Premium Analysis'}
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <div className="text-lg font-black text-gray-900 leading-none">₦{p.price}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="w-full max-w-sm mb-4">
                                    <input
                                        id="paymentEmail"
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        placeholder="Email Address (Optional)"
                                        className="w-full px-5 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-yellow-400 rounded-xl text-sm font-black transition-all text-center placeholder:text-gray-300 placeholder:uppercase placeholder:tracking-widest"
                                    />
                                </div>

                                <button
                                    onClick={handleUnlock}
                                    disabled={isUnlocking}
                                    className={`w-full max-w-sm py-3.5 rounded-xl font-black uppercase tracking-[0.15em] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 ${selectedPlanId ? 'bg-yellow-400 text-black shadow-yellow-400/20 hover:bg-yellow-500' : 'bg-gray-900 text-white shadow-gray-900/10'
                                        }`}
                                >
                                    {isUnlocking ? (
                                        <>
                                            <LuActivity className="w-5 h-5 animate-spin" />
                                            Encrypting...
                                        </>
                                    ) : (
                                        <>
                                            <LuShoppingCart className="w-5 h-5" />
                                            {previewData.isRenewal ? 'Renew Access' : previewData.isRetry ? 'Retry Setup' : 'Unlock Access'}
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5"><LuLock className="w-3 h-3 text-green-500" /> SECURE</div>
                                    <div className="flex items-center gap-1.5"><LuZap className="w-3 h-3 text-yellow-500" /> INSTANT</div>
                                </div>
                            </motion.div>
                        )}

                        {isChecking && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50"
                            >
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <LuActivity className="w-8 h-8 text-yellow-500 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Crunching Data</h3>
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] animate-pulse">Running institutional audit...</p>
                            </motion.div>
                        )}

                        {results && results.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {/* Search Summary */}
                                <div className="bg-gray-900 text-white rounded-2xl p-5 mb-2 shadow-lg relative overflow-hidden">
                                    <div className="absolute right-0 top-0 opacity-10 -mr-4 -mt-4">
                                        <LuSearch className="w-24 h-24" />
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-3">Analysis Profile</h4>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="text-2xl font-black">{jambScore}</div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JAMB Score</div>
                                            </div>
                                            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {subjects.filter(s => s.name).map((s, i) => (
                                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[9px] sm:text-[10px] font-bold text-gray-300 whitespace-nowrap">
                                                        {s.name} <span className="text-yellow-400 ml-1">{s.grade}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Usage Info Banner */}
                                {usageInfo && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
                                        {/* Header */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <LuInfo className="w-4 h-4 text-blue-600" />
                                            <span className="text-xs font-bold text-blue-900">Usage Tracking</span>
                                        </div>

                                        {/* Stats Grid - Responsive */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {/* Usage Limit */}
                                            <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/50 rounded-lg px-3 py-2">
                                                <span className="text-[11px] text-gray-600 font-medium">Usage:</span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-black text-blue-600 text-sm">{usageInfo.viewCount}/{usageInfo.totalViews || 3}</span>
                                                    <span className="text-[10px] text-gray-400">({usageInfo.viewsRemaining} left)</span>
                                                </div>
                                            </div>

                                            {/* Plan */}
                                            <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/50 rounded-lg px-3 py-2">
                                                <span className="text-[11px] text-gray-600 font-medium">Plan:</span>
                                                <span className="font-black text-blue-600 text-sm capitalize">{usageInfo.planName || 'Basic'}</span>
                                            </div>

                                            {/* Expires */}
                                            <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/50 rounded-lg px-3 py-2">
                                                <span className="text-[11px] text-gray-600 font-medium">Expires:</span>
                                                <span className="font-black text-blue-600 text-sm">
                                                    {new Date(usageInfo.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Premium PDF Download Button */}
                                        {usageInfo.planName?.toLowerCase().includes('premium') && (
                                            <div className="mt-3 pt-3 border-t border-blue-200">
                                                <button
                                                    onClick={generatePDF}
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all text-sm font-black uppercase tracking-widest shadow-lg shadow-gray-200"
                                                >
                                                    <LuBookOpen className="w-4 h-4 text-yellow-400" />
                                                    <span>Download PDF Report</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {results.map((result, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        onClick={() => setSelectedResult(result)}
                                        className="cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-300 relative group overflow-hidden w-full"
                                    >
                                        {/* Status Strip (Left side) */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${result.chance === 'High' ? 'bg-green-500' :
                                            result.chance === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`} />

                                        <div className="p-4 pl-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${result.chance === 'High' ? 'bg-green-500/10 text-green-500' :
                                                        result.chance === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {result.chance} Chance
                                                    </span>
                                                    {result.postUtmeRequired && (
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-600">
                                                            Post-UTME Required
                                                        </span>
                                                    )}
                                                    {result.admissionStage && (
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600">
                                                            {result.admissionStage}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-base font-black uppercase tracking-tight text-gray-900 group-hover:text-yellow-600 transition-colors mb-0.5">
                                                    {result.university}
                                                </h3>
                                                <p className="text-xs font-medium text-gray-500">{result.course}</p>

                                                <div className="mt-2 flex items-start gap-1.5 text-[11px] text-gray-600 leading-snug">
                                                    <div className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${result.chance === 'High' ? 'bg-green-500/10 text-green-500' :
                                                        result.chance === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {result.chance === 'High' ? <LuCheck className="w-2 h-2" strokeWidth={3} /> :
                                                            result.chance === 'Medium' ? <LuInfo className="w-2 h-2" strokeWidth={3} /> :
                                                                <LuX className="w-2 h-2" strokeWidth={3} />}
                                                    </div>
                                                    <span>{result.reason}</span>
                                                </div>
                                            </div>

                                            {result.chance === 'High' && (
                                                <button
                                                    onClick={() => result.universityWebsite ? window.open(result.universityWebsite, '_blank') : showAlert('Website not found', 'Sorry, the website for this institution is not available.', 'info')}
                                                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                                                >
                                                    Apply Now
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {results && results.length === 0 && (
                            <div className="text-center py-12 max-w-2xl mx-auto flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
                                    <LuX className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">No Matches Found</h3>
                                <p className="text-gray-500 font-medium">No university or department can accept this.</p>
                                <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">Try adjusting your subjects or chosen course</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Bottom Sheet Dialog */}
            <AnimatePresence>
                {selectedResult && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedResult(null)}
                            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
                        >
                            <div className="max-w-3xl mx-auto relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-12 h-1.5 bg-gray-200 rounded-full" />

                                <button
                                    onClick={() => setSelectedResult(null)}
                                    className="absolute right-0 top-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <LuX className="w-5 h-5 text-gray-500" />
                                </button>

                                <div className="mt-4">
                                    <div className="flex items-start justify-between gap-4 mb-8">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedResult.chance === 'High' ? 'bg-green-500/10 text-green-500' :
                                                    selectedResult.chance === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {selectedResult.chance} Probability
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 leading-none mb-2">
                                                {selectedResult.university}
                                            </h2>
                                            <p className="text-lg font-medium text-gray-500">{selectedResult.course}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Status Card */}
                                        <div className={`p-6 rounded-3xl ${selectedResult.chance === 'High' ? 'bg-green-50 border border-green-100' :
                                            selectedResult.chance === 'Medium' ? 'bg-yellow-50 border border-yellow-100' : 'bg-red-50 border border-red-100'
                                            }`}>
                                            <h3 className={`text-sm font-black uppercase tracking-widest mb-4 ${selectedResult.chance === 'High' ? 'text-green-800' :
                                                selectedResult.chance === 'Medium' ? 'text-yellow-800' : 'text-red-800'
                                                }`}>Analysis Report</h3>

                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedResult.chance === 'High' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' :
                                                    selectedResult.chance === 'Medium' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                    }`}>
                                                    {selectedResult.chance === 'High' ? <LuCheck className="w-5 h-5" strokeWidth={3} /> :
                                                        selectedResult.chance === 'Medium' ? <LuInfo className="w-5 h-5" strokeWidth={3} /> :
                                                            <LuX className="w-5 h-5" strokeWidth={3} />}
                                                </div>
                                                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                                                    {selectedResult.reason}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Requirements / Info */}
                                        <div className="space-y-6">
                                            {(() => {
                                                if (!selectedResult) return null;
                                                return (
                                                    <>
                                                        <div>
                                                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Faculty</h4>
                                                            <div className="flex items-center gap-2">
                                                                <LuSchool className="text-yellow-500" />
                                                                <span className="font-bold text-gray-900">{selectedResult.faculty || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="h-px bg-gray-100" />
                                                        <div>
                                                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Required Subjects ({selectedResult.requiredSubjects?.length || 0})</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(selectedResult.requiredSubjects || []).map((sub: string) => (
                                                                    <span key={sub} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
                                                                        {sub}
                                                                    </span>
                                                                ))}
                                                                {(!selectedResult.requiredSubjects || selectedResult.requiredSubjects.length === 0) && (
                                                                    <span className="text-xs text-gray-400 italic">No specific subjects listed</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {selectedResult.postUtmeRequired && (
                                                            <>
                                                                <div className="h-px bg-gray-100" />
                                                                <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                                                                            <LuInfo className="w-3.5 h-3.5 text-black" />
                                                                        </div>
                                                                        <h4 className="text-xs font-black uppercase tracking-widest text-yellow-900">Post-UTME Audit</h4>
                                                                    </div>

                                                                    <p className="text-[12px] font-bold text-yellow-800 leading-relaxed mb-4">
                                                                        This university conducts Post-UTME. Your current results qualify you to apply, but your final admission depends on your Post-UTME score.
                                                                    </p>

                                                                    <div className="space-y-3 bg-white/50 p-3 rounded-xl border border-yellow-200/50">
                                                                        {selectedResult.postUtmeInfo?.minScore && (
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="text-[10px] font-black text-yellow-800/60 uppercase tracking-widest">Min Score</span>
                                                                                <span className="text-sm font-black text-yellow-900">{selectedResult.postUtmeInfo.minScore}</span>
                                                                            </div>
                                                                        )}
                                                                        {selectedResult.postUtmeInfo?.fee && (
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-[10px] font-black text-yellow-800/60 uppercase tracking-widest leading-none">Registration Fee</span>
                                                                                    <span className="text-[8px] font-bold text-yellow-600 uppercase mt-1">Paid to School</span>
                                                                                </div>
                                                                                <span className="text-sm font-black text-gray-900">₦{selectedResult.postUtmeInfo.fee}</span>
                                                                            </div>
                                                                        )}
                                                                        {selectedResult.postUtmeInfo?.date && (
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="text-[10px] font-black text-yellow-800/60 uppercase tracking-widest">Period</span>
                                                                                <span className="text-sm font-black text-gray-900">{selectedResult.postUtmeInfo.date}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className="mt-4 pt-3 border-t border-yellow-200/30">
                                                                        <p className="text-[10px] font-bold text-yellow-700/70 italic text-center">
                                                                            * Note: All registration fees are paid directly to the institution's official portal, not to SabiDub.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {selectedResult.courseDuration && (
                                                            <>
                                                                <div className="h-px bg-gray-100" />
                                                                <div>
                                                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Course Duration</h4>
                                                                    <div className="flex items-center gap-2">
                                                                        <LuBookOpen className="text-yellow-500" />
                                                                        <span className="font-bold text-gray-900">{selectedResult.courseDuration} Years</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                );
                                            })()}

                                            <button
                                                onClick={() => selectedResult.universityWebsite ? window.open(selectedResult.universityWebsite, '_blank') : showAlert('Website not found', 'Sorry, the website for this institution is not available.', 'info')}
                                                className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-black uppercase tracking-widest transition-all"
                                            >
                                                Continue to Application
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {alertConfig.isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm px-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                {/* Icon Section */}
                                <div className={`pt-8 pb-6 px-6 flex flex-col items-center ${alertConfig.type === 'error' ? 'bg-gradient-to-b from-red-50 to-white' :
                                    alertConfig.type === 'success' ? 'bg-gradient-to-b from-green-50 to-white' :
                                        'bg-gradient-to-b from-blue-50 to-white'
                                    }`}>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${alertConfig.type === 'error' ? 'bg-red-100' :
                                        alertConfig.type === 'success' ? 'bg-green-100' :
                                            'bg-blue-100'
                                        }`}>
                                        {alertConfig.type === 'error' ? (
                                            <LuX className={`w-7 h-7 text-red-600`} />
                                        ) : alertConfig.type === 'success' ? (
                                            <LuCheck className={`w-7 h-7 text-green-600`} />
                                        ) : (
                                            <LuInfo className={`w-7 h-7 text-blue-600`} />
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                        {alertConfig.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed text-center whitespace-pre-line">
                                        {alertConfig.message}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                                        className={`w-full py-3 rounded-xl font-semibold transition-all active:scale-[0.98] ${alertConfig.type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' :
                                            alertConfig.type === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                                                'bg-gray-900 hover:bg-black text-white'
                                            }`}
                                    >
                                        Got It
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Snackbar / Toast Notification */}
            <AnimatePresence>
                {toastConfig.isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-[100]"
                    >
                        <div className={`px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 min-w-[280px] bg-white ${toastConfig.type === 'success' ? 'border-green-100' : toastConfig.type === 'error' ? 'border-red-100' : 'border-blue-100'
                            }`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${toastConfig.type === 'success' ? 'bg-green-50 text-green-600' : toastConfig.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                {toastConfig.type === 'success' ? <LuCheck className="w-4 h-4" strokeWidth={3} /> :
                                    toastConfig.type === 'error' ? <LuX className="w-4 h-4" strokeWidth={3} /> :
                                        <LuInfo className="w-4 h-4" strokeWidth={3} />}
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 leading-tight">
                                    {toastConfig.type === 'success' ? 'Success' : toastConfig.type === 'error' ? 'Error' : 'Notification'}
                                </p>
                                <p className="text-[11px] font-medium text-gray-500">
                                    {toastConfig.message}
                                </p>
                            </div>
                            <button
                                onClick={() => setToastConfig(prev => ({ ...prev, isOpen: false }))}
                                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <LuX className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
