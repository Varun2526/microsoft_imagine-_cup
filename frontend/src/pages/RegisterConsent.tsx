import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, Lock, Globe, ShieldCheck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { registerConsent } from '../lib/api';
import { ConsentPolicy } from '../lib/types';

const RegisterConsent: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [policy, setPolicy] = useState<ConsentPolicy>(ConsentPolicy.AI_ALLOWED);
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);

    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload an image.");
            return;
        }
        setLoading(true);
        try {
            const data = await registerConsent(file, policy);
            setSuccessData(data);
      } catch (error: any) {
    console.error("Registration Error:", error);
    alert(
        typeof error?.message === "string"
            ? error.message
            : "Failed to register consent. Please try again."
    );
} finally {
    setLoading(false);
}

    };

    if (successData) {
        return (
            <div className="max-w-xl mx-auto space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-900">Policy Registered!</h2>
                    <p className="text-emerald-800">Your image consent policy has been permanently recorded.</p>

                    <div className="bg-white rounded-xl p-4 text-left shadow-sm border border-emerald-100 space-y-3">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hash ID</p>
                            <p className="font-mono text-sm break-all text-slate-700">{successData.image_hash}</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 mt-1">
                                    ACTIVE
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Policy</p>
                                <p className="font-semibold text-slate-900 mt-1">{successData.policy}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Timestamp</p>
                            <p className="font-mono text-sm text-slate-700">{new Date(successData.timestamp).toLocaleString()}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => { setSuccessData(null); setFile(null); }}
                        className="w-full py-3 bg-white border border-emerald-200 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                        Register Another
                    </button>
                    <button
                        onClick={() => navigate('/registry')}
                        className="text-sm text-emerald-700 hover:underline"
                    >
                        View in Registry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">Register Consent</h1>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-8">
                <div>
                    <h3 className="text-slate-500 font-medium uppercase text-sm tracking-wider mb-3">Source Image</h3>
                    <ImageUploader onImageSelected={setFile} label="Tap to upload image" />
                </div>

                <div>
                    <h3 className="text-slate-500 font-medium uppercase text-sm tracking-wider mb-3">Select Policy</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => setPolicy(ConsentPolicy.AI_ALLOWED)}
                            className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${policy === ConsentPolicy.AI_ALLOWED ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${policy === ConsentPolicy.AI_ALLOWED ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                                {policy === ConsentPolicy.AI_ALLOWED && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-900">AI_ALLOWED</span>
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Open</span>
                                </div>
                                <p className="text-slate-500 text-sm">Full training usage permitted.</p>
                            </div>
                            <Globe className={`w-5 h-5 ${policy === ConsentPolicy.AI_ALLOWED ? 'text-emerald-500' : 'text-slate-300'}`} />
                        </button>

                        <button
                            onClick={() => setPolicy(ConsentPolicy.AI_RESTRICTED)}
                            className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${policy === ConsentPolicy.AI_RESTRICTED ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${policy === ConsentPolicy.AI_RESTRICTED ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                                {policy === ConsentPolicy.AI_RESTRICTED && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-900">AI_RESTRICTED</span>
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Limited</span>
                                </div>
                                <p className="text-slate-500 text-sm">Non-generative use only.</p>
                            </div>
                            <Shield className={`w-5 h-5 ${policy === ConsentPolicy.AI_RESTRICTED ? 'text-amber-500' : 'text-slate-300'}`} />
                        </button>

                        <button
                            onClick={() => setPolicy(ConsentPolicy.PLATFORM_ONLY)}
                            className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${policy === ConsentPolicy.PLATFORM_ONLY ? 'border-red-500 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${policy === ConsentPolicy.PLATFORM_ONLY ? 'border-red-500 bg-red-500' : 'border-slate-300'}`}>
                                {policy === ConsentPolicy.PLATFORM_ONLY && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-900">PLATFORM_ONLY</span>
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Private</span>
                                </div>
                                <p className="text-slate-500 text-sm">No AI training permitted.</p>
                            </div>
                            <Lock className={`w-5 h-5 ${policy === ConsentPolicy.PLATFORM_ONLY ? 'text-red-500' : 'text-slate-300'}`} />
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>By registering, you affirm you hold the necessary rights to this image. This action creates a permanent verification record.</p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registering...' : 'Register Consent →'}
                </button>
            </div>

            <div className="mt-8 bg-slate-100/50 p-4 rounded-xl">
                <details>
                    <summary className="font-medium text-slate-700 cursor-pointer flex items-center gap-2">
                        <Info className="w-4 h-4" /> How ConsentShield Works
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Images are not stored. We generate a perceptual hash (dHash) that represents the visual structure of your image. This hash is stored in our public registry along with your selected policy. AI labs and platforms can query this registry to verify usage rights without needing access to the original image.
                    </p>
                </details>
            </div>
        </div>
    );
};

export default RegisterConsent;
