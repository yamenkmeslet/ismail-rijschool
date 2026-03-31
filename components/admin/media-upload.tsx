'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Film, File, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  preview?: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}

interface MediaUploadProps {
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  onUpload?: (files: File[]) => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon
  if (type.startsWith('video/')) return Film
  return File
}

export function MediaUpload({
  accept = 'image/*,video/*',
  multiple = true,
  maxSizeMB = 50,
  onUpload,
  className,
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback(
    (rawFiles: FileList | null) => {
      if (!rawFiles) return
      const validFiles = Array.from(rawFiles).filter(
        (f) => f.size <= maxSizeMB * 1024 * 1024
      )
      if (onUpload) onUpload(validFiles)

      const newUploads: UploadedFile[] = validFiles.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        size: f.size,
        type: f.type,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
        progress: 0,
        status: 'uploading',
      }))

      setFiles((prev) => [...prev, ...newUploads])

      // Simulate upload progress
      newUploads.forEach((upload) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += Math.random() * 25 + 10
          if (progress >= 100) {
            progress = 100
            clearInterval(interval)
            setFiles((prev) =>
              prev.map((f) =>
                f.id === upload.id ? { ...f, progress: 100, status: 'done' } : f
              )
            )
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === upload.id ? { ...f, progress: Math.round(progress) } : f
              )
            )
          }
        }, 200)
      })
    },
    [maxSizeMB, onUpload]
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const onDragLeave = () => setIsDragging(false)
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) URL.revokeObjectURL(file.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
              isDragging ? 'bg-blue-100' : 'bg-gray-100'
            )}
          >
            <Upload
              className={cn(
                'w-6 h-6',
                isDragging ? 'text-blue-600' : 'text-gray-400'
              )}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {isDragging ? 'Laat los om te uploaden' : 'Klik of sleep bestanden hier'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Afbeeldingen en video&apos;s tot {maxSizeMB}MB
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="pointer-events-none"
          >
            Bestand kiezen
          </Button>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => {
            const Icon = getFileIcon(file.type)
            return (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                {/* Preview / icon */}
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                  {file.status === 'uploading' && (
                    <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Status / remove */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {file.status === 'done' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                  {file.status === 'uploading' && (
                    <span className="text-xs text-gray-500">{file.progress}%</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
