import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  label?: string;
}

type UploadStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = ".pdf,.doc,.docx,.zip",
  maxSizeMB = 10,
  className,
  label = "Upload de Arquivo"
}) => {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setStatus('dragging');
  };

  const handleDragLeave = () => {
    setStatus('idle');
  };

  const processFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Arquivo muito grande. Máximo permitido: ${maxSizeMB}MB`);
      setStatus('idle');
      return;
    }
    
    setFileName(file.name);
    setStatus('uploading');
    
    // Simula delay de upload para feedback visual
    setTimeout(() => {
      setStatus('success');
      onFileSelect(file);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    setStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">
        {label}
      </label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden",
          status === 'idle' && "border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.01] hover:border-slate-300 dark:hover:border-white/20",
          status === 'dragging' && "border-condu-emerald bg-condu-emerald/5 scale-[1.01]",
          status === 'uploading' && "border-condu-emerald/30 bg-slate-50 dark:bg-white/[0.01] cursor-wait",
          status === 'success' && "border-emerald-500/30 bg-emerald-500/[0.02]"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleInputChange}
        />

        {/* Background Progress Decorator */}
        {status === 'uploading' && (
          <div className="absolute bottom-0 left-0 h-1 bg-condu-emerald animate-progress-loading w-full" />
        )}

        <div className="flex flex-col items-center text-center space-y-2">
          <div className={cn(
            "p-3 rounded-full border transition-all duration-300",
            status === 'idle' && "bg-white dark:bg-[#16171d] border-slate-200 dark:border-white/10 group-hover:scale-110",
            status === 'dragging' && "bg-condu-emerald text-premium-bg-dark border-transparent",
            status === 'uploading' && "bg-slate-100 dark:bg-white/5 border-transparent animate-pulse",
            status === 'success' && "bg-emerald-500/20 border-emerald-500/20 text-emerald-500"
          )}>
            {status === 'idle' && <FileText className="w-5 h-5 text-slate-400 group-hover:text-condu-emerald transition-colors" />}
            {status === 'dragging' && <Upload className="w-5 h-5" />}
            {status === 'uploading' && <Loader2 className="w-5 h-5 animate-spin text-condu-emerald" />}
            {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
          </div>

          <div className="space-y-1">
            {status === 'idle' && (
              <>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Clique ou arraste o arquivo</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-medium">{accept.replace(/\./g, ' ')} • MAX {maxSizeMB}MB</p>
              </>
            )}
            
            {status === 'dragging' && (
              <p className="text-xs font-bold text-condu-emerald">Solte para fazer o upload</p>
            )}

            {status === 'uploading' && (
              <>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Processando arquivo...</p>
                <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{fileName}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="flex items-center gap-1.5 justify-center">
                  <p className="text-xs font-bold text-emerald-500">Upload concluído!</p>
                  <button 
                    onClick={reset}
                    className="p-0.5 hover:bg-emerald-500/10 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3 text-emerald-500" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{fileName}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
