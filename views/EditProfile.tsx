
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Fixed: ShieldLock does not exist in lucide-react, using Shield instead.
import { Eye, EyeOff, CheckCircle2, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageHeader from '@/components/PageHeader';

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onBack }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReEnter, setShowReEnter] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    reEnterPassword: ''
  });
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate validation
    if (formData.newPassword !== formData.reEnterPassword || !formData.currentPassword) {
      setError(true);
      return;
    }
    setError(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onBack();
    }, 2000);
  };

  const labelClasses = "text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2 block";
  const inputClasses = "w-full bg-white dark:bg-black/60 border border-slate-300 dark:border-white/20 rounded-lg py-3.5 px-5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/20 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";
  const eyeIconClasses = "absolute right-4 top-1/2 -translate-y-1/2 text-[#ff3131] hover:text-rose-600 transition-colors cursor-pointer";

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-8">
      <PageHeader 
        title="Edit Profile" 
        subtitle="Update your security credentials" 
        onBack={onBack} 
      />

      <GlassCard className="p-8 md:p-10 border border-slate-200 dark:border-white/10 bg-white dark:bg-black/60 shadow-2xl rounded-[2.5rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Current Password Section */}
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Current Password :</label>
              <div className="relative">
                <input 
                  type={showCurrent ? "text" : "password"} 
                  placeholder="Enter Current Password"
                  className={inputClasses}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className={eyeIconClasses}
                >
                  {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* New Password Section */}
          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClasses}>New Password :</label>
              <div className="relative">
                <input 
                  type={showNew ? "text" : "password"} 
                  placeholder="New Password"
                  className={inputClasses}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className={eyeIconClasses}
                >
                  {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="relative">
              <input 
                type={showReEnter ? "text" : "password"} 
                placeholder="Re-Enter New Password"
                className={inputClasses}
                value={formData.reEnterPassword}
                onChange={(e) => setFormData({...formData, reEnterPassword: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowReEnter(!showReEnter)}
                className={eyeIconClasses}
              >
                {showReEnter ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <MDiv 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold text-[#ff3131] italic uppercase"
            >
              Please check again!
            </MDiv>
          )}

          {/* Success Message */}
          {isSuccess && (
            <MDiv 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 text-emerald-500"
            >
              <CheckCircle2 size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest">Security Link Updated Successfully</span>
            </MDiv>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSuccess}
              className="w-full bg-[#a11c1c] text-white py-5 rounded-lg font-black text-base uppercase tracking-[0.1em] shadow-xl shadow-neon-red/10 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSuccess ? 'Processing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Security Tip */}
      <div className="flex items-start gap-4 p-6 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl opacity-60">
        {/* Fixed: Replaced non-existent ShieldLock icon with Shield */}
        <Shield className="text-[#ff3131] flex-shrink-0" size={20} />
        <p className="text-[11px] font-medium text-slate-500 dark:text-white/40 leading-relaxed uppercase tracking-wider">
          Passwords should be at least 8 characters long and include a mix of letters, numbers, and special symbols for maximum protocol security.
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
