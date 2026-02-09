import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    onImageSelected: (file: File) => void;
    label?: string;
    className?: string;
    compact?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageSelected,
    label = "Upload Image",
    className = "",
    compact = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = (file: File) => {
        // Validate type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        // Validate size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelected(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const clearImage = () => {
        setPreview(null);
        setFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`w-full ${className}`}>
            {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                    <img
                        src={preview}
                        alt="Preview"
                        className={`w-full object-contain ${compact ? 'h-48' : 'h-64'}`}
                    />
                    <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2 text-xs font-mono text-slate-600 truncate border-t border-slate-100">
                        {fileName}
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    className={`
            cursor-pointer border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors
            ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}
            ${compact ? 'p-6 h-48' : 'p-12 h-64'}
          `}
                >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        {compact ? <ImageIcon className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                    </div>
                    <p className="font-medium text-slate-900 mb-1 text-center">{label}</p>
                    <p className="text-sm text-slate-500 text-center">PNG, JPG, WebP up to 10MB</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
