import React from 'react';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg mx-4 md:mx-0 rounded-lg shadow-lg p-6">
                {children}
            </div>
        </div>
    );
}
