import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Search,
  HelpCircle,
  FileX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import { verifyImage } from "../lib/api";
import { ConsentPolicy } from "../lib/types";

const VerifyConsent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await verifyImage(file);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (policy) => {
    switch (policy) {
      case ConsentPolicy.AI_ALLOWED:
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case ConsentPolicy.AI_RESTRICTED:
        return "text-amber-600 bg-amber-50 border-amber-200";
      case ConsentPolicy.PLATFORM_ONLY:
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Verify Consent</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-8">
        <div>
          <h3 className="text-slate-500 font-medium uppercase text-sm tracking-wider mb-3">
            Candidate Image
          </h3>
          <ImageUploader
            onImageSelected={(f) => {
              setFile(f);
              setResult(null);
            }}
            label="Upload image to verify"
            compact={!!result}
          />
        </div>

        {!result && (
          <button
            onClick={handleVerify}
            disabled={!file || loading}
            className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <Search className="w-5 h-5" /> Verify Consent
              </>
            )}
          </button>
        )}

        {result && (
          <div className="animate-fade-in space-y-6 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Verification Result
              </h3>
              <span className="text-sm font-mono text-slate-400">
                ID: req_{Date.now().toString().slice(-6)}
              </span>
            </div>

            {result.match ? (
              <div
                className={`p-6 rounded-xl border-2 ${getStatusColor(result.policy)}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full bg-white border ${getStatusColor(result.policy).split(" ")[2]}`}
                  >
                    {result.policy === ConsentPolicy.AI_RESTRICTED ? (
                      <ShieldCheck className="w-8 h-8" />
                    ) : result.policy === ConsentPolicy.PLATFORM_ONLY ? (
                      <ShieldCheck className="w-8 h-8" />
                    ) : (
                      <ShieldCheck className="w-8 h-8" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1">
                      {result.policy === ConsentPolicy.AI_RESTRICTED
                        ? "Restricted"
                        : result.policy === ConsentPolicy.PLATFORM_ONLY
                          ? "Platform Only"
                          : "Allowed"}
                    </h4>
                    <p className="font-medium opacity-90">
                      {result.policy === ConsentPolicy.AI_RESTRICTED
                        ? "Do not use for AI Training"
                        : result.policy === ConsentPolicy.PLATFORM_ONLY
                          ? "Restricted to hosting platform use only"
                          : "Authorized for AI Training"}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-xs uppercase tracking-wider font-semibold opacity-70">
                          Confidence
                        </p>
                        <p className="text-lg font-bold">
                          {result.confidence}%
                        </p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-xs uppercase tracking-wider font-semibold opacity-70">
                          Registered
                        </p>
                        <p className="text-lg font-bold">
                          {result.matched_at
                            ? new Date(result.matched_at).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 border-slate-200 bg-slate-50">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white border border-slate-200 text-slate-400">
                    <FileX className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                      No Record Found
                    </h4>
                    <p className="text-slate-600">
                      No matching consent policy was found in the registry for
                      this image.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-slate-50 text-slate-500 text-sm rounded-lg flex gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <p>
                Results are based on current ConsentShield database records.
                This tool is for verification purposes only and does not
                constitute legal advice.
              </p>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Verify Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyConsent;
