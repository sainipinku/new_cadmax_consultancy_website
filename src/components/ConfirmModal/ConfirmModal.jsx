import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertTriangle, X } from 'lucide-react';

// Create Confirm Context
const ConfirmContext = createContext(null);

// Confirm Provider Component
export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    type: 'warning', // warning, danger, info
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title: options.title || 'Confirm Action',
        message: options.message || 'Are you sure?',
        type: options.type || 'warning',
        onConfirm: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal {...confirmState} />
    </ConfirmContext.Provider>
  );
};

// Custom hook to use confirm
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context.confirm;
};

// Individual Confirm Modal Component
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, type }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmBtn: 'bg-red-600 hover:bg-red-700',
          border: 'border-red-200',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          confirmBtn: 'bg-blue-600 hover:bg-blue-700',
          border: 'border-blue-200',
        };
      case 'warning':
      default:
        return {
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          confirmBtn: 'bg-amber-600 hover:bg-amber-700',
          border: 'border-amber-200',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Header with Warning */}
        <div className={`rounded-t-2xl p-6 ${styles.iconBg} border-b ${styles.border}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-white ${styles.iconColor} shadow-sm`}>
              <AlertTriangle size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">Warning: This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed">{message}</p>
          
          {/* Additional Warning */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Please confirm your action
            </p>
          </div>
        </div>

        {/* Footer with Yes/No Buttons */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-5 py-3 ${styles.confirmBtn} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200`}
          >
            Yes, Confirm
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmProvider;
