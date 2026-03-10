import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Manrope } from 'next/font/google';
import {
    FaCheck as LuCheck,
    FaXmark as LuX,
    FaCircleInfo as LuInfo,
    FaSchool as LuSchool,
    FaGraduationCap as LuGraduationCap,
    FaMagnifyingGlass as LuSearch,
    FaChevronRight as LuChevronRight,
    FaChevronDown as LuChevronDown,
    FaSliders as LuSettings2,
    FaClockRotateLeft as LuHistory,
    FaBolt as LuZap,
    FaChartLine as LuActivity,
    FaBookOpen as LuBookOpen,
    FaArrowRight as LuArrowRight,
    FaPlus as LuPlus,
    FaTrashCan as LuTrash2,
    FaLock as LuLock,
    FaLockOpen as LuLockOpen,
    FaCartShopping as LuShoppingCart,
    FaChartBar as LuChartBar,
    FaFileCircleCheck as LuFileCheck,
    FaDownload as LuDownload,
    FaCopy as LuCopy,
    FaTriangleExclamation as LuTriangleAlert
} from 'react-icons/fa6';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// --- Type Definitions ---
type Grade = 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9';
type ExamType = 'WAEC' | 'NECO' | 'NABTEB' | 'GCE';

interface SubjectEntry {
    id: string;
    name: string;
    grade: Grade;
}

const GRADE_VALUES: Record<Grade, number> = {
    'A1': 6, 'B2': 5, 'B3': 4, 'C4': 3, 'C5': 2, 'C6': 1, 'D7': 0, 'E8': -1, 'F9': -2
};

// --- Components ---

const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#014751]/60 mb-2.5">{children}</label>
);

const Select = ({ value, onChange, options, placeholder, icon: Icon }: { value: string, onChange: (val: string) => void, options: string[], placeholder?: string, icon?: any }) => (
    <div className="relative group">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-2xl px-5 py-4 appearance-none focus:outline-none focus:border-[#014751] focus:ring-4 focus:ring-[#014751]/5 transition-all font-semibold text-sm shadow-sm"
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-gray-400 group-focus-within:text-[#014751] transition-colors">
            {Icon && <Icon className="w-4 h-4" />}
            <LuChevronDown className="w-4 h-4" />
        </div>
    </div>
);

const GradeSelect = ({ value, onChange }: { value: Grade, onChange: (val: Grade) => void }) => (
    <div className="relative min-w-[90px]">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Grade)}
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-2xl px-4 py-4 appearance-none focus:outline-none focus:border-[#014751] focus:ring-4 focus:ring-[#014751]/5 text-center font-extrabold text-sm shadow-sm transition-all"
        >
            {Object.keys(GRADE_VALUES).map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <LuChevronDown className="w-3.5 h-3.5" />
        </div>
    </div>
);

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdmissionChecker() {
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
        { id: '5', name: '', grade: 'C6' },
        { id: '6', name: '', grade: 'C6' },
        { id: '7', name: '', grade: 'C6' },
        { id: '8', name: '', grade: 'C6' },
        { id: '9', name: '', grade: 'C6' }
    ]);
    const [utmeSubjects, setUtmeSubjects] = useState<string[]>(['English Language', '', '', '']);
    const [jambScore, setJambScore] = useState<number | ''>('');
    const [targetCourseName, setTargetCourseName] = useState<string>('');
    const [targetUniName, setTargetUniName] = useState<string>('');

    const [results, setResults] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [previewData, setPreviewData] = useState<any | null>(null);
    const [selectedResult, setSelectedResult] = useState<any | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [isChecking, setIsChecking] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [usageInfo, setUsageInfo] = useState<{
        viewCount: number;
        totalViews: number;
        viewsRemaining: number;
        expiresAt: string | Date;
        planName?: string;
    } | null>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [savedPaymentId, setSavedPaymentId] = useState<string>('');
    const [resumePaymentId, setResumePaymentId] = useState<string>('');
    const [isResuming, setIsResuming] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [courseRequirements, setCourseRequirements] = useState<any>(null);
    const [loadingRequirements, setLoadingRequirements] = useState(false);

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

    const [toastConfig, setToastConfig] = useState<{
        isOpen: boolean;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        isOpen: false,
        message: '',
        type: 'info'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);

    // Enhanced Features State
    const [courseSuggestions, setCourseSuggestions] = useState<any[]>([]);
    const [comparisons, setComparisons] = useState<any[]>([]);
    const [simulationResults, setSimulationResults] = useState<any | null>(null);
    const [isComparing, setIsComparing] = useState(false);

    // Pagination for Enhanced Features
    const [comparisonPage, setComparisonPage] = useState(1);
    const [comparisonTotalPages, setComparisonTotalPages] = useState(1);
    const [isComparingMore, setIsComparingMore] = useState(false);

    const [suggestionsPage, setSuggestionsPage] = useState(1);
    const [suggestionsTotalPages, setSuggestionsTotalPages] = useState(1);
    const [isSuggestionsLoadingMore, setIsSuggestionsLoadingMore] = useState(false);

    const [isSimulating, setIsSimulating] = useState(false);
    const [simulatedScore, setSimulatedScore] = useState<number | ''>('');
    const [activeTab, setActiveTab] = useState<'results' | 'suggestions' | 'comparison' | 'simulation' | 'form'>('results');
    const [showPaymentIdModal, setShowPaymentIdModal] = useState(false);
    const [paymentIdToCopy, setPaymentIdToCopy] = useState('');

    const router = useRouter();
    const verifyingRef = useRef<string | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastConfig({ isOpen: true, message, type });
        setTimeout(() => setToastConfig(prev => ({ ...prev, isOpen: false })), 3000);
    };

    const showAlert = (title: string, message: string, type: 'error' | 'success' | 'info' = 'info') => {
        setAlertConfig({ isOpen: true, title, message, type });
    };


    const fetchAdmissionResults = useCallback(async (paymentId: string, pageNum: number, searchStr: string = '', append = false, isResume = false) => {
        if (!paymentId) return;
        if (pageNum === 1 && !append) {
            if (isResume) setIsChecking(true);
            else setIsUnlocking(true);
        }
        else setIsFetchingMore(true);
        setHasError(false);

        try {
            const url = `${API_BASE_URL}/admission/results/${paymentId.trim()}?page=${pageNum}&pageSize=50${searchStr ? `&search=${encodeURIComponent(searchStr)}` : ''}${isResume ? '&mode=resume' : ''}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch results");
            const data = await res.json();

            if (data.unlocked) {
                if (append) {
                    setResults(prev => [...prev, ...(data.results || [])]);
                } else {
                    setResults(data.results || []);
                }

                if (data.pagination) {
                    setPage(data.pagination.currentPage);
                    setTotalPages(data.pagination.totalPages);
                }

                if (data.courseSuggestions) {
                    setCourseSuggestions(data.courseSuggestions);
                    setSuggestionsPage(1);
                    if (data.totalSuggestionsCount !== undefined) {
                        setSuggestionsTotalPages(Math.ceil(data.totalSuggestionsCount / 15));
                    }
                }
                if (data.subjects && data.subjects.length > 0) {
                    setSubjects(data.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                }

                // Repopulate form fields for seamless resume
                if (data.jambScore) setJambScore(data.jambScore);
                if (data.utmeSubjects && data.utmeSubjects.length > 0) {
                    setUtmeSubjects(data.utmeSubjects);
                }
                if (data.targetInstitution) setSelectedInstitutionId(data.targetInstitution);
                if (data.targetCourse) setTargetCourseName(data.targetCourse);
                if (data.targetDepartment) setTargetDepartmentId(data.targetDepartment);
                if (data.email) setUserEmail(data.email);

                setIsPaid(true);
                setSavedPaymentId(paymentId.trim());
                setUsageInfo({
                    viewCount: data.viewCount,
                    totalViews: data.totalViews,
                    viewsRemaining: data.viewsRemaining,
                    expiresAt: data.expiresAt,
                    planName: data.planName
                });
            }
            if (data.email) setUserEmail(data.email);
            return data;
        } catch (err) {
            console.error("Error fetching results:", err);
            setHasError(true);
            return null;
        } finally {
            setIsUnlocking(false);
            setIsFetchingMore(false);
        }
    }, []);

    const handleVerifyReturn = useCallback(async (payId: string, ref: string) => {
        setIsUnlocking(true);
        try {
            const res = await fetch(`${API_BASE_URL}/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: ref, payerType: 'ADMISSION_CHECK', profileId: payId })
            });
            const data = await res.json();
            if (data.status === 'success' || data.status === 'completed') {
                await fetchAdmissionResults(payId, 1, '', false);
                setPreviewData(null);
                setActiveTab('results');
                showToast("Payment verified! Results unlocked.");
            } else {
                showAlert('Verification', data.error || 'Payment verification failed.', 'error');
            }
        } catch (err) {
            console.error("Verification failed", err);
            showAlert('Error', 'Failed to verify payment.', 'error');
        } finally {
            setIsUnlocking(false);
            // Clear query params to prevent re-verification
            router.replace('/admission-checker', undefined, { shallow: true });
        }
    }, [fetchAdmissionResults, router]);

    const checkAdmission = async () => {
        setIsChecking(true);
        try {
            const body = {
                jambScore: Number(jambScore),
                subjects: subjects.filter(s => s.name).map(s => ({ name: s.name, grade: s.grade })),
                utmeSubjects: utmeSubjects.filter(s => s && s.trim()),
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
                showAlert('Check Failed', errorData.message || 'Analysis failed.', 'error');
                return;
            }

            const data = await res.json();
            if (data.subjects) {
                setSubjects(data.subjects.map((s: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    name: s.name,
                    grade: s.grade
                })));
            }

            if (data.email) setUserEmail(data.email);
            setResults([]);
            setPreviewData(null);

            // Initial check for existing payment/unlock
            if (data.isPaid && (data.paymentId || data.previewId)) {
                const payId = data.paymentId || data.previewId;
                const success = await fetchAdmissionResults(payId, 1, '', false);
                if (success?.unlocked) {
                    setActiveTab('results');
                    return;
                }
                if (success?.preview) {
                    setPreviewData(success);
                    if (success.planId) setSelectedPlanId(success.planId);
                    setActiveTab('results');
                    return;
                }
            }

            if (data.isLocked && data.preview) {
                // SECURITY ENHANCEMENT: Handle locked preview explicitly
                setPreviewData(data);
                if (data.planId) setSelectedPlanId(data.planId);
                setResults([]);

                // Show Payment ID to user
                const payId = data.paymentId || data.previewId;
                if (payId) {
                    setPaymentIdToCopy(payId);
                    setShowPaymentIdModal(true);
                }
            } else if (data.unlocked) {
                setResults(data.results || []);
                if (data.pagination) {
                    setPage(data.pagination.currentPage);
                    setTotalPages(data.pagination.totalPages);
                }
                setCourseSuggestions(data.courseSuggestions || []);
                setSuggestionsPage(1);
                if (data.totalSuggestionsCount !== undefined) {
                    setSuggestionsTotalPages(Math.ceil(data.totalSuggestionsCount / 15));
                }
                setIsPaid(true);
                setSavedPaymentId(data.paymentId);

                // Show Payment ID for record
                if (data.paymentId) {
                    setPaymentIdToCopy(data.paymentId);
                    setShowPaymentIdModal(true);
                }

                setUsageInfo({
                    viewCount: data.viewCount,
                    totalViews: data.totalViews,
                    viewsRemaining: data.viewsRemaining,
                    expiresAt: data.expiresAt,
                    planName: data.planName
                });
                setActiveTab('results');
            } else if (data.preview) {
                // Fallback for non-locked previews
                setPreviewData(data);
                if (data.planId) setSelectedPlanId(data.planId);

                const payId = data.paymentId || data.previewId;
                if (payId) {
                    setPaymentIdToCopy(payId);
                    setShowPaymentIdModal(true);
                }
            }
        } catch (err) {
            showAlert('Connection Error', "Could not reach the analysis server. Please check your internet connection and try again.", 'error');
        } finally {
            setIsChecking(false);
        }
    };

    // Debounced search
    useEffect(() => {
        if (!isPaid || !savedPaymentId || !showSearch) return;

        const timer = setTimeout(() => {
            fetchAdmissionResults(savedPaymentId, 1, searchTerm, false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, isPaid, savedPaymentId, showSearch, fetchAdmissionResults]);

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
                showToast("Could not connect to server. Check your connection.", "error");
            }
        };

        if (router.isReady) {
            loadInitialData();
            const { reference, paymentId, status } = router.query;
            if (reference && paymentId && status === 'success' && verifyingRef.current !== reference) {
                verifyingRef.current = reference as string;
                handleVerifyReturn(paymentId as string, reference as string);
            }
        }
    }, [router.isReady, router.query, handleVerifyReturn]);

    useEffect(() => {
        if (previewData?.plans && previewData.plans.length > 0) {
            setSelectedPlanId(String(previewData.plans[0].id));
        }
    }, [previewData]);


    // Fetch Departments
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

    // Fetch Requirements
    useEffect(() => {
        if (targetCourseName) {
            setLoadingRequirements(true);
            const params = new URLSearchParams({ courseName: targetCourseName });
            if (selectedInstitutionId) params.append('institutionId', selectedInstitutionId);
            fetch(`${API_BASE_URL}/admission/course-requirements?${params}`)
                .then(res => res.json())
                .then(data => data.found ? setCourseRequirements(data) : setCourseRequirements(null))
                .catch(() => setCourseRequirements(null))
                .finally(() => setLoadingRequirements(false));
        } else {
            setCourseRequirements(null);
        }
    }, [targetCourseName, selectedInstitutionId]);

    const addSubject = () => {
        if (subjects.length < 9) setSubjects([...subjects, { id: Math.random().toString(), name: '', grade: 'C6' }]);
    };

    const removeSubject = (id: string) => {
        if (subjects.length > 1) setSubjects(subjects.filter(s => s.id !== id));
    };

    const updateSubject = (id: string, field: 'name' | 'grade', value: string) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };


    const handleUnlock = async () => {
        const payId = previewData?.paymentId || previewData?.previewId;
        if (!payId) return;

        if (previewData.isPaid) {
            const success = await fetchAdmissionResults(payId, 1, '', false);
            if (success?.unlocked) {
                setPreviewData(null);
                setActiveTab('results');
                showToast("Results unlocked.");
            }
            return;
        }

        const plan = previewData.plans?.find((p: any) => String(p.id) === selectedPlanId) || previewData.plans?.[0];
        setIsUnlocking(true);
        try {
            const initRes = await fetch(`${API_BASE_URL}/payment/initialize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail.trim() || 'guest@sabidub.com',
                    amount: plan.price,
                    payerType: 'ADMISSION_CHECK',
                    planId: plan.id,
                    profileId: payId,
                    jambScore: previewData.isNewCheck ? Number(jambScore) : undefined,
                    subjects: previewData.isNewCheck ? subjects : undefined,
                    utmeSubjects: previewData.isNewCheck ? utmeSubjects : undefined,
                    targetInstitution: previewData.isNewCheck ? selectedInstitutionId : undefined,
                    targetCourse: previewData.isNewCheck ? targetCourseName : undefined,
                    targetDepartment: previewData.isNewCheck ? targetDepartmentId : undefined,
                })
            });
            const init = await initRes.json();
            if (init.authorization_url) window.location.href = init.authorization_url;
        } catch (err) {
            showToast("Payment initialization failed.", "error");
        } finally {
            setIsUnlocking(false);
        }
    };

    const handleResumeCheck = async () => {
        if (!resumePaymentId.trim()) return;
        setIsResuming(true);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const res = await fetch(`${API_BASE_URL}/admission/results/${resumePaymentId.trim()}?mode=resume`, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.resumed) {
                setJambScore(data.jambScore || '');
                if (data.subjects) {
                    setSubjects(data.subjects.map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s.name,
                        grade: s.grade
                    })));
                }
                setSavedPaymentId(resumePaymentId.trim());
                if (data.utmeSubjects && Array.isArray(data.utmeSubjects)) setUtmeSubjects(data.utmeSubjects);
                if (data.targetInstitution) setSelectedInstitutionId(data.targetInstitution);
                if (data.targetCourse) setTargetCourseName(data.targetCourse);
                if (data.targetDepartment) setTargetDepartmentId(data.targetDepartment);

                if (data.email) setUserEmail(data.email);
                if (data.unlocked) {
                    setResults(data.results || []);
                    if (data.pagination) {
                        setPage(data.pagination.currentPage);
                        setTotalPages(data.pagination.totalPages);
                    }
                    setCourseSuggestions(data.courseSuggestions || []);
                    setIsPaid(true);
                    setUsageInfo({
                        viewCount: data.viewCount,
                        totalViews: data.totalViews,
                        viewsRemaining: data.viewsRemaining,
                        expiresAt: data.expiresAt,
                        planName: data.planName
                    });
                    setActiveTab('results');
                    setPreviewData(null);
                    setShowResumeModal(false);
                    showToast('Results restored successfully!');
                } else if (data.preview) {
                    setPreviewData(data);
                    if (data.planId) setSelectedPlanId(data.planId);
                    setActiveTab('results');
                    setShowResumeModal(false);
                    showToast('Preview restored.');
                } else {
                    setActiveTab('form');
                    setPreviewData(null);
                    setShowResumeModal(false);
                    showToast('Previous data loaded. Complete your check!');
                }
            } else {
                showToast(data.message || 'Payment ID not found or expired.', 'error');
            }
        } catch (error: any) {
            console.error('Resume error:', error);
            let errorMessage = 'Failed to resume check. ';

            if (error.name === 'AbortError') {
                errorMessage += 'Request timed out. Please check your connection and try again.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Cannot connect to server. Please ensure the backend is running on port 4000.';
            } else {
                errorMessage += error.message || 'Please try again.';
            }

            showToast(errorMessage, 'error');
        } finally {
            setIsResuming(false);
        }
    };

    const handleCompareRequest = async (loadMore = false) => {
        if (!savedPaymentId || !targetCourseName) return;

        const nextPage = loadMore ? comparisonPage + 1 : 1;
        if (loadMore) setIsComparingMore(true);
        else setIsComparing(true);

        try {
            const res = await fetch(`${API_BASE_URL}/admission/compare-universities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseName: targetCourseName,
                    jambScore: Number(jambScore),
                    subjects: subjects.filter(s => s.name).map(s => ({ name: s.name, grade: s.grade })),
                    utmeSubjects: utmeSubjects.filter(s => s && s.trim()),
                    paymentId: savedPaymentId,
                    page: nextPage,
                    pageSize: 15
                })
            });
            const data = await res.json();
            if (data.locked) showAlert('Premium Feature', data.message);
            else {
                if (loadMore) {
                    setComparisons(prev => [...prev, ...(data.comparisons || [])]);
                    setComparisonPage(nextPage);
                } else {
                    setComparisons(data.comparisons || []);
                    setComparisonPage(1);
                }

                if (data.pagination) {
                    setComparisonTotalPages(data.pagination.totalPages);
                }

                // Update usage limit
                if (data.viewsRemaining !== undefined) {
                    setUsageInfo((prev: any) => ({
                        ...prev,
                        viewCount: data.viewCount,
                        viewsRemaining: data.viewsRemaining,
                        totalViews: data.totalViews,
                        expiresAt: prev?.expiresAt || new Date().toISOString()
                    }));
                }
            }
        } catch (error: any) {
            console.error('Comparison error:', error);
            showToast('Connection lost. Please check your internet.', 'error');
        } finally {
            setIsComparing(false);
            setIsComparingMore(false);
        }
    };

    const handleLoadMoreSuggestions = async () => {
        if (!savedPaymentId) return;

        const nextPage = suggestionsPage + 1;
        setIsSuggestionsLoadingMore(true);

        try {
            const res = await fetch(`${API_BASE_URL}/admission/suggestions/${savedPaymentId}?page=${nextPage}&pageSize=15`);
            const data = await res.json();

            if (data.unlocked) {
                setCourseSuggestions(prev => [...prev, ...(data.courseSuggestions || [])]);
                setSuggestionsPage(nextPage);
                if (data.pagination) {
                    setSuggestionsTotalPages(data.pagination.totalPages);
                }
            } else if (data.locked) {
                showAlert('Premium Feature', data.message);
            }
        } catch (error: any) {
            console.error('Suggestions error:', error);
            showToast('Connection failed. Could not load more suggestions.', 'error');
        } finally {
            setIsSuggestionsLoadingMore(false);
        }
    };

    const handleSimulationRequest = async () => {
        if (!savedPaymentId || !simulatedScore) return;
        setIsSimulating(true);
        try {
            const res = await fetch(`${API_BASE_URL}/admission/simulate-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    simulatedScore: Number(simulatedScore),
                    subjects: subjects.filter(s => s.name).map(s => ({ name: s.name, grade: s.grade })),
                    utmeSubjects: utmeSubjects.filter(s => s && s.trim()),
                    targetInstitutionId: selectedInstitutionId || undefined,
                    targetCourseName: targetCourseName || undefined,
                    paymentId: savedPaymentId
                })
            });
            const data = await res.json();
            if (data.locked) showAlert('Premium Feature', data.message);
            else {
                setSimulationResults(data);
                // Update usage limit
                if (data.viewsRemaining !== undefined) {
                    setUsageInfo((prev: any) => ({
                        ...prev,
                        viewCount: data.viewCount,
                        viewsRemaining: data.viewsRemaining,
                        totalViews: data.totalViews,
                        expiresAt: prev?.expiresAt || new Date().toISOString()
                    }));
                }
            }
        } catch (error: any) {
            console.error('Simulation error:', error);
            showToast('Connection failed. Could not run simulation.', 'error');
        } finally {
            setIsSimulating(false);
        }
    };

    const generatePDF = async () => {
        if (!results) return;
        const doc = new jsPDF();

        // Note: jsPDF only supports helvetica, times, and courier fonts natively.
        // Helvetica is used throughout as it's the cleanest option (similar to Manrope).
        // To use custom fonts like Manrope, we'd need to convert TTF to base64 and embed it.

        // Brand colors - explicitly typed as tuples
        const brandPrimary: [number, number, number] = [1, 71, 81]; // #014751
        const brandLight: [number, number, number] = [240, 249, 250]; // #f0f9fa
        const brandAccent: [number, number, number] = [0, 150, 136]; // Teal accent
        const textDark: [number, number, number] = [31, 41, 55]; // Gray-800
        const textLight: [number, number, number] = [107, 114, 128]; // Gray-500

        // ========================================
        // HEADER SECTION - Modern gradient design
        // ========================================

        // Main header background
        doc.setFillColor(...brandPrimary);
        doc.rect(0, 0, 210, 55, 'F');

        // Accent stripe
        doc.setFillColor(...brandAccent);
        doc.rect(0, 55, 210, 3, 'F');

        // Add logo (centered)
        try {
            const logoUrl = '/images/white.png';
            const img = new Image();
            img.src = logoUrl;
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
            if (img.complete && img.naturalHeight !== 0) {
                // Centered white logo
                const imgWidth = 45;
                const imgHeight = 12;
                doc.addImage(img, 'PNG', (210 - imgWidth) / 2, 14, imgWidth, imgHeight);
            }
        } catch (e) {
            // Fallback: Stylized text logo
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(26);
            doc.setFont('helvetica', 'bold');
            doc.text('SabiDub', 105, 22, { align: 'center' });
        }

        // Title with modern typography
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Admission Eligibility Report', 105, 38, { align: 'center' });

        // Subtitle
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(200, 220, 225);
        doc.text('Comprehensive Analysis & Recommendations', 105, 46, { align: 'center' });

        // ========================================
        // METADATA CARDS - Modern card design
        // ========================================

        const cardY = 68;
        const cardHeight = 28;

        // Background card
        doc.setFillColor(...brandLight);
        doc.roundedRect(15, cardY, 180, cardHeight, 3, 3, 'F');

        // Left section - Date & Payment ID
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(20, cardY + 5, 90, 18, 2, 2, 'F');

        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textLight);
        doc.text('GENERATED ON', 26, cardY + 10);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textDark);
        doc.text(new Date().toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }), 26, cardY + 16);

        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textLight);
        doc.text('PAYMENT ID', 65, cardY + 10);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textDark);
        doc.text(savedPaymentId, 65, cardY + 16);

        // Right section - JAMB Score (highlighted)
        doc.setFillColor(...brandPrimary);
        doc.roundedRect(115, cardY + 5, 75, 18, 2, 2, 'F');

        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(200, 220, 225);
        doc.text('YOUR JAMB SCORE', 120, cardY + 10);

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(String(jambScore), 120, cardY + 18);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('/ 400', 142, cardY + 18);

        // ========================================
        // STATISTICS BAR
        // ========================================

        const statsY = cardY + cardHeight + 8;
        const highCount = results.filter(r => r.chance === 'High').length;
        const mediumCount = results.filter(r => r.chance === 'Medium').length;
        const lowCount = results.filter(r => r.chance === 'Low').length;

        // Stats container
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(15, statsY, 180, 16, 2, 2, 'F');

        // High stat
        doc.setFillColor(34, 197, 94); // Green
        doc.circle(25, statsY + 8, 3, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(34, 197, 94);
        doc.text(`${highCount}`, 30, statsY + 9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textLight);
        doc.text('High Match', 38, statsY + 9);

        // Medium stat
        doc.setFillColor(234, 179, 8); // Yellow
        doc.circle(80, statsY + 8, 3, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(234, 179, 8);
        doc.text(`${mediumCount}`, 85, statsY + 9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textLight);
        doc.text('Medium', 93, statsY + 9);

        // Low stat
        doc.setFillColor(239, 68, 68); // Red
        doc.circle(125, statsY + 8, 3, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(239, 68, 68);
        doc.text(`${lowCount}`, 130, statsY + 9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textLight);
        doc.text('Low Match', 138, statsY + 9);

        // Total
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...brandPrimary);
        doc.text(`Total: ${results.length} Courses`, 170, statsY + 9);

        // ========================================
        // RESULTS TABLE - Modern design
        // ========================================

        const cleanText = (text: string) => {
            if (!text) return 'N/A';
            return text
                .replace(/[\uD800-\uDFFF]/g, '')
                .replace(/[^\x00-\x7F]/g, '')
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const rows = results.map(r => [
            r.university || 'N/A',
            r.course || 'N/A',
            r.chance || 'N/A',
            cleanText(r.reason || '')
        ]);

        autoTable(doc, {
            startY: statsY + 22,
            head: [['Institution', 'Program', 'Match', 'Analysis']],
            body: rows,
            theme: 'plain',
            headStyles: {
                fillColor: brandPrimary,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9,
                cellPadding: 4,
            },
            bodyStyles: {
                fontSize: 8,
                textColor: textDark,
                cellPadding: 3,
                lineColor: [230, 230, 230],
                lineWidth: 0.1,
            },
            alternateRowStyles: {
                fillColor: [252, 252, 252],
            },
            columnStyles: {
                0: { cellWidth: 48, fontStyle: 'bold' },
                1: { cellWidth: 45 },
                2: {
                    cellWidth: 22,
                    halign: 'center',
                    fontStyle: 'bold',
                },
                3: {
                    cellWidth: 65,
                    fontSize: 7,
                    textColor: textLight,
                    overflow: 'linebreak'
                },
            },
            didDrawCell: (data) => {
                if (data.column.index === 2 && data.section === 'body') {
                    const chance = data.cell.raw as string;
                    // Add colored badge background
                    if (chance === 'High') {
                        doc.setFillColor(220, 252, 231); // Light green
                        doc.setTextColor(22, 163, 74); // Dark green
                    } else if (chance === 'Medium') {
                        doc.setFillColor(254, 249, 195); // Light yellow
                        doc.setTextColor(161, 98, 7); // Dark yellow
                    } else {
                        doc.setFillColor(254, 226, 226); // Light red
                        doc.setTextColor(220, 38, 38); // Dark red
                    }
                }
            },
        });

        // ========================================
        // FOOTER - Modern with branding
        // ========================================

        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            // Footer line
            doc.setDrawColor(...brandPrimary);
            doc.setLineWidth(0.5);
            doc.line(15, 282, 195, 282);

            // Footer text
            doc.setFontSize(7);
            doc.setTextColor(...textLight);
            doc.setFont('helvetica', 'normal');
            doc.text(
                'Generated by SabiDub Admission Assistant',
                15,
                287
            );

            // Page number
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...brandPrimary);
            doc.text(
                `Page ${i} of ${pageCount}`,
                195,
                287,
                { align: 'right' }
            );
        }

        doc.save('Sabidub_Eligibility_Report.pdf');
    };

    return (
        <div className={`min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-[#014751]/10 ${manrope.className}`}>
            <Head>
                <title>Admission Assistant | SabiDub</title>
            </Head>

            <Navbar />

            {/* Premium Header/Banner */}
            <div className="pt-32 pb-4 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#014751]/5 text-[#014751] text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <LuActivity className="w-3.5 h-3.5" />
                                Smart Admission Intelligence
                            </div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-gray-900 mb-2">
                                Future-Proof Your <span className="text-[#014751] relative">
                                    Admission
                                    <span className="absolute bottom-1 left-0 w-full h-[3px] md:h-[4px] bg-[#014751]/10 -z-10 rounded-full"></span>
                                </span>
                            </h1>
                            <p className="max-w-md text-[10px] md:text-xs font-bold text-gray-400 leading-relaxed">
                                Our AI-powered analyzer evaluates your academic profile against thousands of institutional requirements across Nigeria.
                            </p>
                        </div>

                        {/* Resume Section */}
                        <div className="bg-white border border-gray-100 rounded-[1.5rem] p-4 shadow-sm max-w-xs w-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#014751]/5 rounded-full -mr-12 -mt-12 blur-xl group-hover:bg-[#014751]/10 transition-colors" />
                            <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#014751]/50 mb-2 ml-1">
                                RESUME PREVIOUS CHECK
                            </label>
                            <div className="flex gap-2 relative z-10">
                                <input
                                    type="text"
                                    value={resumePaymentId}
                                    onChange={(e) => setResumePaymentId(e.target.value)}
                                    placeholder="Enter Payment ID"
                                    className="flex-1 bg-gray-50 px-3.5 py-2.5 rounded-xl text-xs font-bold border-none focus:ring-1 focus:ring-[#014751]/20 transition-all placeholder:text-gray-300"
                                />
                                <button
                                    onClick={handleResumeCheck}
                                    disabled={isResuming || !resumePaymentId.trim()}
                                    className="w-10 h-10 bg-[#014751] hover:bg-[#013b43] text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 active:scale-95 shadow-md shadow-[#014751]/10"
                                >
                                    {isResuming ? (
                                        <div className="w-4 h-4 border-2 border-t-white border-white/20 rounded-full animate-spin" />
                                    ) : (
                                        <LuArrowRight className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 font-bold">

                {/* Status Bar */}
                {savedPaymentId && (
                    <div className="mb-6 p-0.5 bg-gradient-to-r from-[#014751] to-[#015d69] rounded-2xl shadow-lg max-w-5xl mx-auto w-full">
                        <div className="bg-white/95 rounded-xl md:rounded-[0.9rem] px-4 md:px-5 py-2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                            <div className="flex items-center gap-3 w-full md:w-auto overflow-hidden">
                                <div className="w-8 h-8 rounded-lg bg-[#014751]/5 flex items-center justify-center text-[#014751] shrink-0">
                                    <LuFileCheck className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-2 bg-[#014751]/5 px-2 py-1 rounded-md border border-[#014751]/10 min-w-0">
                                    <code className="text-[10px] md:text-xs font-black text-[#014751] tracking-wider truncate">{savedPaymentId}</code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(savedPaymentId);
                                            if (!toastConfig.isOpen) showToast("Payment ID copied to clipboard");
                                        }}
                                        className="p-1 hover:bg-white rounded text-[#014751]/60 hover:text-[#014751] transition-all shrink-0"
                                        title="Copy Payment ID"
                                    >
                                        <LuCopy className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            {usageInfo && (
                                <div className="flex items-center gap-4 md:gap-5 px-4 md:px-5 py-1.5 bg-gray-50/50 rounded-xl border border-gray-100 w-full md:w-auto justify-center">
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Usage</p>
                                        <p className="text-[11px] md:text-xs font-black text-gray-700">{(usageInfo.viewCount ?? 0)}/{(usageInfo.totalViews ?? 3)}</p>
                                    </div>
                                    <div className="w-[1px] h-3 bg-gray-200" />
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Plan</p>
                                        <p className="text-[11px] md:text-xs font-black text-[#014751]">{usageInfo.planName || 'Basic'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT PANEL */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5 space-y-8"
                    >
                        {/* Identify */}
                        <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#014751] text-white flex items-center justify-center shadow-lg">
                                    <LuGraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <h2 className="text-lg md:text-xl font-extrabold tracking-tight">Academic Identity</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel>Exam Body</InputLabel>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['WAEC', 'NECO', 'NABTEB', 'GCE'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => toggleExam(t)}
                                                className={`py-3 rounded-xl text-[10px] font-black transition-all ${selectedExams.includes(t) ? 'bg-[#014751] text-white' : 'bg-gray-50 text-gray-400'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel>JAMB Score</InputLabel>
                                        <input
                                            type="number"
                                            id="jambScore"
                                            name="jambScore"
                                            value={jambScore}
                                            onChange={e => setJambScore(e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-black text-[#014751] outline-none text-sm"
                                            placeholder="000"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Email</InputLabel>
                                        <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm font-semibold outline-none" placeholder="Email" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subject Matrix */}
                        <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 p-4 md:p-6 shadow-sm">
                            <div className="mb-6">
                                <h2 className="text-lg md:text-xl font-extrabold">Subject Matrix</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel>UTME (4 Subjects)</InputLabel>
                                    <div className="grid grid-cols-2 gap-2">
                                        {utmeSubjects.map((s, i) => {
                                            const otherSelected = utmeSubjects.filter((subj, idx) => idx !== i && subj);
                                            const availableSubjects = subjectsList.filter(opt => !otherSelected.includes(opt));

                                            return (
                                                <Select
                                                    key={i}
                                                    value={s}
                                                    onChange={v => { const n = [...utmeSubjects]; n[i] = v; setUtmeSubjects(n); }}
                                                    options={availableSubjects}
                                                    placeholder={i === 0 ? 'English' : 'Subject'}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <InputLabel>O&apos;Level Credits</InputLabel>
                                        <button onClick={addSubject} className="flex items-center gap-1 text-[10px] font-black uppercase text-[#014751] hover:bg-[#014751]/5 px-2 py-1 rounded-lg transition-colors">
                                            <LuPlus className="w-3 h-3" /> Add Subject
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {subjects.map((s, i) => {
                                            // Filter out subjects already selected in other rows
                                            const otherSelected = subjects
                                                .filter(subj => subj.id !== s.id && subj.name)
                                                .map(subj => subj.name);

                                            const availableOptions = subjectsList.filter(opt =>
                                                !otherSelected.includes(opt)
                                            );

                                            return (
                                                <div key={s.id} className="flex gap-2 items-center">
                                                    <div className="flex-1">
                                                        <Select
                                                            value={s.name}
                                                            onChange={v => updateSubject(s.id, 'name', v)}
                                                            options={availableOptions}
                                                            placeholder="Subject"
                                                        />
                                                    </div>
                                                    <GradeSelect value={s.grade} onChange={v => updateSubject(s.id, 'grade', v)} />
                                                    <button onClick={() => removeSubject(s.id)} className="text-gray-300 hover:text-red-500">
                                                        <LuTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strategic Target */}
                        <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 p-4 md:p-6 shadow-sm">
                            <h2 className="text-lg md:text-xl font-extrabold mb-6">Strategic Target</h2>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel>Institution</InputLabel>
                                    <Select value={targetUniName} onChange={v => { setTargetUniName(v); const i = institutions.find(inst => inst.name === v); setSelectedInstitutionId(i?.id || ''); setTargetCourseName(''); }} options={institutions.map(i => i.name)} placeholder="All Universities" icon={LuSchool} />
                                </div>
                                <div>
                                    <InputLabel>Preferred Course</InputLabel>
                                    <Select value={targetCourseName} onChange={v => setTargetCourseName(v)} options={selectedInstitutionId ? filteredDepartments.map(d => d.name) : globalCourses} placeholder="Select Course" icon={LuBookOpen} />
                                </div>

                                {courseRequirements?.found && courseRequirements.requirements?.[0] && (
                                    <div className="p-4 bg-[#014751]/5 rounded-2xl border border-[#014751]/10">
                                        <div className="flex items-center gap-2 mb-3"><LuInfo className="w-4 h-4 text-[#014751]" /><span className="text-[10px] font-black uppercase text-[#014751]">Requirements</span></div>
                                        <div className="text-[11px] font-bold text-gray-600">
                                            UTME: {(courseRequirements.requirements[0].jamb?.compulsory || []).join(', ')} + {(courseRequirements.requirements[0].jamb?.groups?.length || 0)} Elective Groups
                                        </div>
                                    </div>
                                )}

                                <button onClick={checkAdmission} disabled={isChecking || !jambScore || !targetCourseName} className="w-full py-4 rounded-xl md:rounded-2xl bg-[#014751] text-white font-black uppercase text-xs md:text-sm tracking-widest shadow-xl shadow-[#014751]/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                                    {isChecking ? <LuActivity className="animate-spin text-lg" /> : <>Run Analysis <LuArrowRight className="text-lg" /></>}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-7">
                        {!results && !previewData && (
                            <div className="h-[300px] md:h-[500px] bg-gray-50/50 rounded-3xl md:rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6 md:p-12">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-gray-200 mb-6 shadow-sm"><LuChartBar className="w-6 h-6 md:w-8 md:h-8" /></div>
                                <h3 className="text-lg md:text-xl font-black text-gray-800 mb-2">Ready for analysis</h3>
                                <p className="text-xs md:text-sm font-medium text-gray-400">Complete your profile to generate your report.</p>
                            </div>
                        )}

                        {/* Preview / Pay */}
                        <AnimatePresence>
                            {previewData && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] border border-gray-100  p-10 text-center">
                                    <div className="w-16 h-16 bg-[#014751]/5 rounded-2xl flex items-center justify-center text-[#014751] mx-auto mb-6"><LuZap className="w-8 h-8" /></div>
                                    <div className="inline-flex items-center gap-2 bg-[#014751]/5 px-6 py-2 rounded-full text-[#014751] font-black uppercase tracking-widest text-xs mb-6">
                                        <LuCheck className="w-4 h-4" />
                                        {(previewData.totalEligible || 0) > 0
                                            ? `${previewData.totalEligible} Strong Matches Found`
                                            : `${previewData.totalResults || 0} Courses Analyzed`}
                                    </div>

                                    <h2 className="text-3xl font-black mb-2">Analysis Complete</h2>
                                    <p className="text-gray-500 font-medium mb-10 text-sm">{previewData.message || "We've identified potential schools and courses where you meet the admission requirements."}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                                        {previewData.plans?.map((p: any) => (
                                            <button
                                                key={p.id}
                                                onClick={() => setSelectedPlanId(String(p.id))}
                                                className={`p-6 rounded-[2.5rem] border-2 transition-all relative overflow-hidden group ${selectedPlanId === String(p.id)
                                                    ? 'border-[#014751] bg-[#014751]/5 ring-4 ring-[#014751]/5'
                                                    : 'border-gray-50 bg-gray-50/30'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#014751] mb-1">{p.name}</p>
                                                        <p className="text-3xl font-black">₦{p.price}</p>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlanId === String(p.id) ? 'border-[#014751] bg-[#014751]' : 'border-gray-200'
                                                        }`}>
                                                        {selectedPlanId === String(p.id) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                                                    {(p.planFeatures || []).map((feat: any, idx: number) => (
                                                        <div key={idx} className="flex items-start gap-2 text-[11px] font-bold text-gray-500">
                                                            <LuCheck className="text-green-500 mt-0.5 shrink-0" />
                                                            <span>{feat.feature}</span>
                                                        </div>
                                                    ))}
                                                    {(!p.planFeatures || p.planFeatures.length === 0) && (
                                                        <>
                                                            <div className="flex items-start gap-2 text-[11px] font-bold text-gray-500">
                                                                <LuCheck className="text-green-500 mt-0.5 shrink-0" />
                                                                <span>Detailed Eligibility Report</span>
                                                            </div>
                                                            <div className="flex items-start gap-2 text-[11px] font-bold text-gray-500">
                                                                <LuCheck className="text-green-500 mt-0.5 shrink-0" />
                                                                <span>{p.name.toLowerCase().includes('premium') ? '10' : p.name.toLowerCase().includes('standard') ? '5' : '2'} Full Report Access</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <button onClick={handleUnlock} disabled={isUnlocking} className="w-full py-5 rounded-3xl bg-[#014751] text-white font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                                        {isUnlocking ? 'Please wait...' : previewData.insufficientCredits ? <>Get More Credit <LuZap /></> : <>Unlock Full Access <LuShoppingCart /></>}
                                    </button>
                                    {(() => {
                                        const selectedPlan = previewData.plans?.find((p: any) => String(p.id) === selectedPlanId);
                                        const planName = (selectedPlan?.name || '').toLowerCase();
                                        const hasSuggestions = planName.includes('standard') || planName.includes('premium');
                                        const totalCost = hasSuggestions ? 25 : 10;
                                        return (
                                            <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                ⚠️ Unlocking this report will use {totalCost} credits from your plan.
                                            </p>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Full Results */}
                        {results && !previewData && (
                            <div className="space-y-6">
                                {(() => {
                                    // Determine plan tier
                                    const planName = (usageInfo?.planName || '').toLowerCase();
                                    const isPremium = planName.includes('premium');
                                    const isStandard = planName.includes('standard');
                                    const isBasic = !isPremium && !isStandard;

                                    // Define available tabs based on plan
                                    let availableTabs: ('results' | 'suggestions' | 'comparison' | 'simulation')[] = ['results'];

                                    if (isPremium) {
                                        availableTabs = ['results', 'suggestions', 'comparison', 'simulation'];
                                    } else if (isStandard) {
                                        availableTabs = ['results', 'suggestions', 'comparison'];
                                    }
                                    // Basic: only 'results'

                                    return (
                                        <>
                                            <div className="bg-white p-1 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-xl flex gap-1 overflow-x-auto no-scrollbar scroll-smooth">
                                                {availableTabs.map(t => (
                                                    <button key={t} onClick={() => setActiveTab(t as any)} className={`flex-1 min-w-[100px] md:min-w-0 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === t ? 'bg-[#014751] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>{t}</button>
                                                ))}
                                            </div>
                                        </>
                                    );
                                })()}

                                <div className="mx-4 md:mx-8 bg-white rounded-3xl md:rounded-[3rem] border border-gray-100 p-4 md:p-8 min-h-[400px] md:min-h-[500px]">
                                    {activeTab === 'results' && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-8">
                                                {showSearch ? (
                                                    <div className="flex-1 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 mr-2">
                                                        <LuSearch className="text-gray-400" />
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            placeholder="Search university or course..."
                                                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:font-medium"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                        <button onClick={() => { setSearchTerm(''); setShowSearch(false); }} className="p-1 hover:bg-gray-200 rounded-full text-gray-400"><LuX /></button>
                                                    </div>
                                                ) : (
                                                    <h2 className="text-2xl font-black">Eligibility Report</h2>
                                                )}

                                                <div className="flex gap-2">
                                                    {!showSearch && (
                                                        <button onClick={() => setShowSearch(true)} className="p-3 bg-gray-50 rounded-xl text-gray-400 border border-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                                            <LuSearch />
                                                        </button>
                                                    )}
                                                    {(() => {
                                                        const planName = (usageInfo?.planName || '').toLowerCase();
                                                        const isBasic = !planName.includes('premium') && !planName.includes('standard');
                                                        return !isBasic && (
                                                            <button onClick={generatePDF} className="p-3 bg-[#014751] text-white rounded-xl border border-[#014751] hover:opacity-90 transition-opacity">
                                                                <LuDownload />
                                                            </button>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                            {(() => {
                                                const hasMore = page < totalPages;

                                                return isUnlocking ? (
                                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                        <div className="w-12 h-12 border-4 border-t-[#014751] border-gray-100 rounded-full animate-spin" />
                                                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Analyzing Credentials...</p>
                                                    </div>
                                                ) : results.length > 0 ? (
                                                    <div className="space-y-8">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {results.map((r, i) => (
                                                                <div key={i} onClick={() => setSelectedResult(r)} className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50/50 border border-transparent hover:border-[#014751]/20 hover:bg-white transition-all cursor-pointer group">
                                                                    <div className={`w-16 md:w-20 py-1 rounded-full text-[9px] md:text-[10px] font-black text-center uppercase mb-3 md:mb-4 ${r.chance === 'High' ? 'bg-green-100 text-green-700' : r.chance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-50 text-red-500'}`}>{r.chance || 'N/A'}</div>
                                                                    <h3 className="font-black text-sm md:text-base text-gray-900 mb-1">{r.university || 'Unknown Institution'}</h3>
                                                                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{r.course || 'Unknown Course'}</p>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {hasMore && (
                                                            <div className="flex justify-center pb-10">
                                                                <button
                                                                    onClick={() => fetchAdmissionResults(savedPaymentId, page + 1, searchTerm, true)}
                                                                    disabled={isFetchingMore}
                                                                    className="px-8 py-4 bg-white border border-[#014751]/10 text-[#014751] font-black rounded-3xl hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center gap-2"
                                                                >
                                                                    {isFetchingMore ? (
                                                                        <>
                                                                            <div className="w-4 h-4 border-2 border-t-[#014751] border-gray-200 rounded-full animate-spin" />
                                                                            Loading...
                                                                        </>
                                                                    ) : 'Load More Results'}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                                            {hasError ? <LuInfo className="w-8 h-8 text-red-500" /> : <LuSearch className="w-8 h-8 text-gray-300" />}
                                                        </div>
                                                        <div className="max-w-md space-y-2">
                                                            <h3 className="text-xl font-extrabold text-gray-900">{hasError ? 'Analysis Timeout' : 'No Eligible Report Found'}</h3>
                                                            <p className="text-gray-500 font-medium">
                                                                {hasError
                                                                    ? "The analysis is taking longer than expected. Please wait a moment and try refreshing the results."
                                                                    : searchTerm ? `No results match "${searchTerm}"` : "There is no report available for your current subject combination. Please try adjusting your subjects or selecting a different institution."}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            {hasError && (
                                                                <button onClick={() => fetchAdmissionResults(savedPaymentId || '', 1, '', false)} className="px-6 py-3 bg-[#014751] text-white font-black rounded-2xl shadow-lg hover:opacity-90">
                                                                    Retry Analysis
                                                                </button>
                                                            )}
                                                            {!hasError && savedPaymentId && (
                                                                <button
                                                                    onClick={() => fetchAdmissionResults(savedPaymentId, 1, '', false, true)}
                                                                    disabled={isUnlocking}
                                                                    className="px-6 py-3 border border-[#014751] text-[#014751] font-black rounded-2xl hover:bg-[#014751]/5 transition-all flex items-center gap-2 disabled:opacity-50"
                                                                >
                                                                    {isUnlocking ? (
                                                                        <div className="w-4 h-4 border-2 border-t-[#014751] border-gray-200 rounded-full animate-spin" />
                                                                    ) : null}
                                                                    Resume My Session
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}

                                    {activeTab === 'suggestions' && (
                                        <div className="space-y-6">
                                            <h2 className="text-2xl font-black">Alternative Suggestions</h2>
                                            {courseSuggestions.length > 0 ? (
                                                <div className="space-y-4">
                                                    {courseSuggestions.map((s, i) => (
                                                        <div key={i} className="p-4 md:p-6 bg-[#014751]/5 rounded-2xl md:rounded-3xl border border-[#014751]/10">
                                                            <div className="mb-4 pb-4 border-b border-[#014751]/10">
                                                                <h3 className="font-black text-base md:text-lg text-[#014751] truncate">{s.institution}</h3>
                                                                <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-[#014751]/60 truncate">Alternatives for {s.failedCourse}</p>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {s.alternatives?.map((alt: any, j: number) => (
                                                                    <div key={j} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                                                                        <div className="flex justify-between items-start gap-4 mb-2">
                                                                            <div className="min-w-0">
                                                                                <h4 className="font-bold text-sm md:text-base text-gray-900 truncate">{alt.course}</h4>
                                                                                <p className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 truncate">{alt.faculty}</p>
                                                                            </div>
                                                                            {alt.cutoff && (
                                                                                <span className="px-2 py-1 bg-green-50 text-green-700 text-[9px] md:text-[10px] font-black rounded-lg border border-green-100 shrink-0">
                                                                                    {alt.cutoff} pts
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-none">{alt.reason}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {suggestionsPage < suggestionsTotalPages && (
                                                        <div className="flex justify-center pt-4">
                                                            <button
                                                                onClick={handleLoadMoreSuggestions}
                                                                disabled={isSuggestionsLoadingMore}
                                                                className="px-8 py-4 bg-white border border-[#014751]/10 text-[#014751] font-black rounded-3xl hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center gap-2"
                                                            >
                                                                {isSuggestionsLoadingMore ? (
                                                                    <>
                                                                        <div className="w-4 h-4 border-2 border-t-[#014751] border-gray-200 rounded-full animate-spin" />
                                                                        Loading...
                                                                    </>
                                                                ) : 'Load More Suggestions'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                (usageInfo?.planName?.toLowerCase().includes('premium') || usageInfo?.planName?.toLowerCase().includes('standard')) ? (
                                                    <div className="p-12 text-center text-gray-400 border-2 border-dashed rounded-3xl">No alternative suggestions found for your profile.</div>
                                                ) : (
                                                    <div className="p-12 text-center text-gray-400 border-2 border-dashed rounded-3xl">Premium required for smart suggestions</div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'comparison' && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-2xl font-black">Comparison</h2>
                                                <button onClick={() => handleCompareRequest()} className="text-[10px] font-black uppercase text-[#014751]">Refresh</button>
                                            </div>

                                            {isComparing ? (
                                                <div className="space-y-3 animate-pulse">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className="h-16 bg-gray-100 rounded-2xl w-full"></div>
                                                    ))}
                                                </div>
                                            ) : comparisons.length > 0 ? (
                                                <div className="space-y-3">
                                                    {comparisons.map((c, i) => (
                                                        <div key={i} className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl gap-3">
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-xs md:text-sm truncate">{c.institution || 'Unknown University'}</p>
                                                                {c.course && <p className="text-[9px] md:text-[10px] text-gray-400 truncate">{c.course}</p>}
                                                            </div>
                                                            <div className={`px-2 md:px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black shrink-0 ${c.eligibility === 'High' ? 'bg-green-100 text-green-700' :
                                                                c.eligibility === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-red-50 text-red-500'
                                                                }`}>
                                                                {c.eligibility || 'N/A'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {comparisonPage < comparisonTotalPages && (
                                                        <div className="flex justify-center pt-4">
                                                            <button
                                                                onClick={() => handleCompareRequest(true)}
                                                                disabled={isComparingMore}
                                                                className="px-8 py-4 bg-white border border-[#014751]/10 text-[#014751] font-black rounded-3xl hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center gap-2"
                                                            >
                                                                {isComparingMore ? (
                                                                    <>
                                                                        <div className="w-4 h-4 border-2 border-t-[#014751] border-gray-200 rounded-full animate-spin" />
                                                                        Loading...
                                                                    </>
                                                                ) : 'Load More Comparisons'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                usageInfo?.planName?.toLowerCase().includes('premium') || usageInfo?.planName?.toLowerCase().includes('standard') ? (
                                                    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl gap-4">
                                                        <p className="text-sm text-gray-400 font-medium">See your admission chances for <span className="text-[#014751] font-bold">{targetCourseName || 'this course'}</span> across other top universities.</p>
                                                        <button onClick={() => handleCompareRequest()} disabled={isComparing} className="px-6 py-3 rounded-xl bg-[#014751] text-white font-black uppercase text-xs shadow-lg shadow-[#014751]/20 active:scale-95 disabled:opacity-50">
                                                            Run Comparison
                                                        </button>
                                                        <p className="text-[10px] text-gray-400 font-bold">⚠️ Comparing institutions will use 15 credits from your plan usage limit.</p>
                                                    </div>
                                                ) : (
                                                    <div className="p-12 text-center text-gray-400 border-2 border-dashed rounded-3xl">Unlock comparison insights</div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'simulation' && (
                                        <div className="space-y-6">
                                            <h2 className="text-xl md:text-2xl font-black">Simulator</h2>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <input type="number" value={simulatedScore} onChange={e => setSimulatedScore(Number(e.target.value))} className="flex-1 bg-gray-50 px-5 py-4 rounded-xl md:rounded-2xl outline-none font-black text-sm" placeholder="Simulated Score" />
                                                    <button onClick={handleSimulationRequest} className="px-8 py-4 bg-[#014751] text-white rounded-xl md:rounded-2xl font-black uppercase text-xs tracking-widest whitespace-nowrap">Run Simulation</button>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold ml-2">⚠️ This simulation will use 15 credits from your plan usage limit.</p>
                                            </div>
                                            {simulationResults && <p className="p-4 md:p-6 bg-green-50 text-green-700 rounded-2xl md:rounded-3xl font-bold text-xs md:text-sm">{simulationResults.message}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />

            {/* Modal Components (Alert, Toast, Result Detail) */}
            {/* Loading Overlay */}
            <AnimatePresence>
                {isUnlocking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center bg-white/80 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-[#014751]/10 rounded-full" />
                                <div className="absolute top-0 w-20 h-20 border-4 border-t-[#014751] rounded-full animate-spin" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-1">
                                    {savedPaymentId ? 'Analyzing Credentials' : 'Confirming Payment'}
                                </h3>
                                <p className="text-xs font-bold text-gray-400">Please do not close this window...</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment ID Modal */}
            <AnimatePresence>
                {showPaymentIdModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full text-center shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-[#014751]/5 rounded-2xl flex items-center justify-center text-[#014751] mx-auto mb-6">
                                <LuFileCheck className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black mb-3 text-gray-900">Copy Payment ID</h2>
                            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                                Please copy and save your Payment ID. You will need it to resume your session or if you encounter any payment issues.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex items-center justify-between border border-gray-100 group hover:border-[#014751]/20 transition-colors" title="Copy Payment ID">
                                <code className="text-[#014751] font-black text-lg tracking-wider mr-4">{paymentIdToCopy}</code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(paymentIdToCopy);
                                        showToast("Payment ID copied to clipboard");
                                    }}
                                    className="p-3 bg-white rounded-xl shadow-sm text-[#014751] hover:bg-[#014751] hover:text-white transition-all active:scale-95"
                                    title="Copy to clipboard"
                                >
                                    <LuCopy className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => setShowPaymentIdModal(false)}
                                className="w-full py-4 rounded-2xl bg-[#014751] text-white font-black uppercase text-sm tracking-widest shadow-xl shadow-[#014751]/20 active:scale-95 transition-all"
                            >
                                Continue to Report
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {alertConfig.isOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-10 max-w-lg w-full text-center">
                            <h2 className="text-xl md:text-2xl font-black mb-4">{alertConfig.title}</h2>
                            <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">{alertConfig.message}</p>
                            <button onClick={() => setAlertConfig({ ...alertConfig, isOpen: false })} className="w-full py-4 rounded-xl md:rounded-2xl bg-[#014751] text-white font-black uppercase text-xs md:text-sm tracking-widest">Got It</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {selectedResult && (
                <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/40" onClick={() => setSelectedResult(null)}>
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 150) setSelectedResult(null);
                        }}
                        className="bg-white w-full max-w-4xl rounded-t-3xl md:rounded-t-[3rem] p-6 md:p-10 max-h-[90vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar relative"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Drag Handle */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />

                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 mt-4">
                            <div className="flex-1">
                                <div className={`inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3 ${selectedResult.chance === 'High' ? 'bg-green-100 text-green-700' : selectedResult.chance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-50 text-red-500'}`}>
                                    {selectedResult.chance} Chance
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black mb-1 text-gray-900 leading-tight">{selectedResult.university}</h2>
                                <p className="text-base md:text-lg font-bold text-gray-400">{selectedResult.course}</p>
                            </div>
                            {selectedResult.universityWebsite && (
                                <a href={selectedResult.universityWebsite} target="_blank" rel="noopener noreferrer" className="p-4 bg-[#014751]/5 text-[#014751] rounded-2xl hover:bg-[#014751] hover:text-white transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                                    Visit Site <LuArrowRight className="-rotate-45 text-lg" />
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                            <div className="p-4 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl">
                                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Faculty</p>
                                <p className="font-bold text-xs md:text-sm truncate">{selectedResult.faculty || 'N/A'}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl">
                                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Cutoff Mark</p>
                                <p className="font-bold text-xs md:text-sm">{selectedResult.cutoffMark || 'N/A'}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-gray-50 rounded-2xl md:rounded-3xl col-span-2 md:col-span-1">
                                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Duration</p>
                                <p className="font-bold text-xs md:text-sm">{selectedResult.courseDuration ? `${selectedResult.courseDuration} Years` : 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs md:text-sm font-black uppercase text-gray-900 mb-3">Analysis</h3>
                                <div className="p-5 md:p-6 bg-[#014751]/5 rounded-2xl md:rounded-3xl border border-[#014751]/10 text-xs md:text-sm font-medium leading-relaxed text-gray-700">
                                    {selectedResult.reason}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {selectedResult.requiredUtmeSubjects && selectedResult.requiredUtmeSubjects.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-black uppercase text-gray-400 mb-3 flex items-center gap-2"><LuBookOpen /> UTME Requirements</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedResult.requiredUtmeSubjects.map((s: string, i: number) => (
                                                <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedResult.requiredSubjects && selectedResult.requiredSubjects.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-black uppercase text-gray-400 mb-3 flex items-center gap-2"><LuFileCheck /> O&apos;Level Requirements</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedResult.requiredSubjects.map((s: string, i: number) => (
                                                <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {(selectedResult.postUtmeInfo || selectedResult.postUtmeFee || selectedResult.postUtmeDate) && (
                                <div>
                                    <h3 className="text-xs md:text-sm font-black uppercase text-gray-900 mb-3">Post-UTME Details</h3>
                                    <div className="p-5 md:p-6 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100">
                                        <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
                                            <span className="px-2 md:px-3 py-1 md:py-1.5 bg-white rounded-lg text-[8px] md:text-[10px] font-black uppercase border border-gray-100 shadow-sm">Type: {selectedResult.postUtmeType || 'Standard'}</span>
                                            <span className="px-2 md:px-3 py-1 md:py-1.5 bg-white rounded-lg text-[8px] md:text-[10px] font-black uppercase border border-gray-100 shadow-sm">Stage: {selectedResult.admissionStage || 'N/A'}</span>
                                            {selectedResult.postUtmeFee && (
                                                <span className="px-2 md:px-3 py-1 md:py-1.5 bg-white rounded-lg text-[8px] md:text-[10px] font-black uppercase border border-gray-100 shadow-sm text-green-600">
                                                    Fee: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(selectedResult.postUtmeFee)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                                            {selectedResult.postUtmeDate && (
                                                <div className="min-w-0">
                                                    <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Date</p>
                                                    <p className="font-bold text-xs md:text-sm truncate">{new Date(selectedResult.postUtmeDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                                </div>
                                            )}
                                            {selectedResult.postUtmeVenue && (
                                                <div className="min-w-0">
                                                    <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Venue</p>
                                                    <p className="font-bold text-xs md:text-sm truncate">{selectedResult.postUtmeVenue}</p>
                                                </div>
                                            )}
                                        </div>

                                        {selectedResult.postUtmeTitle && <h4 className="font-bold text-sm md:text-base text-gray-900 mb-2 truncate">{selectedResult.postUtmeTitle}</h4>}
                                        {selectedResult.postUtmeInfo && <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedResult.postUtmeInfo}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            <AnimatePresence>
                {toastConfig.isOpen && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, x: '-50%' }}
                        animate={{ y: 0, opacity: 1, x: '-50%' }}
                        exit={{ y: 50, opacity: 0, x: '-50%' }}
                        className={`fixed bottom-10 left-1/2 z-[200] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 min-w-[320px] max-w-[90vw] ${toastConfig.type === 'error' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'
                            }`}
                    >
                        {toastConfig.type === 'error' ? (
                            <LuTriangleAlert className="text-red-500 w-5 h-5 shrink-0" />
                        ) : (
                            <LuCheck className="text-green-500 w-5 h-5 shrink-0" />
                        )}
                        <span className={`text-sm font-bold ${toastConfig.type === 'error' ? 'text-red-900' : 'text-gray-900'}`}>
                            {toastConfig.message}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #01475120; border-radius: 10px; }
            `}</style>
        </div>
    );
}
