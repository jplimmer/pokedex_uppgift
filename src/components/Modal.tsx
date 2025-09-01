'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  backdropClassName?: string;
  dialogClassName?: string;
}

export function Modal({
  children,
  backdropClassName,
  dialogClassName,
}: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 bg-black/80 flex items-center justify-center ${backdropClassName}`}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        className={`bg-neutral-50 rounded-lg p-10 overflow-auto ${dialogClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
