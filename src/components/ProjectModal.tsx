'use client';

import { useEffect } from 'react';

interface ProjectModalProps {
  open: boolean;
  title?: string;
  variant?: 'in-progress' | 'private';
  onClose: () => void;
}

export default function ProjectModal({ open, title, variant = 'in-progress', onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const isPrivate = variant === 'private';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Project status">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal__title">{isPrivate ? 'Private Repository' : 'In Progress'}</h3>
        <p className="modal__desc">
          {isPrivate
            ? title
              ? `The GitHub repository for ${title} is private and can't be accessed. Please contact the owner for access.`
              : 'This GitHub repository is private and can\'t be accessed.'
            : title
              ? `${title} is currently in active development. Stay tuned for the live preview.`
              : 'This project is currently in active development. Stay tuned for the live preview.'}
        </p>
        <button className="modal__close" onClick={onClose} autoFocus>
          Close
        </button>
      </div>
    </div>
  );
}
