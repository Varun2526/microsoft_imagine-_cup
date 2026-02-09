import React from 'react';
import { ShieldAlert } from 'lucide-react';

const DisclaimerBanner: React.FC = () => {
    return (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-sm text-amber-900 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="font-medium text-center">
                ConsentShield does not block AI image generation, prevent deepfakes, or enforce compliance.
                It provides a machine-readable consent signal for AI training datasets.
            </span>
        </div>
    );
};

export default DisclaimerBanner;
