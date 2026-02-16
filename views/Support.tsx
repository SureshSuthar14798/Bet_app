
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: 'gusdnd8448@gmail.com',
    title: '',
    department: 'Partnership Inquiry',
    details: ''
  });

  const departmentOptions = [
    { value: 'Partnership Inquiry', label: 'Partnership Inquiry' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Billing Issues', label: 'Billing Issues' },
    { value: 'Account Verification', label: 'Account Verification' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting consultation:', formData);
    alert('Your inquiry has been sent to our support team.');
  };

  const inputBaseClasses = "w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 px-5 py-3.5 text-slate-900 dark:text-white font-black focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all rounded-xl";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="relative p-8 md:p-12 border border-slate-200 dark:border-white/10 bg-white dark:bg-black/60 rounded-[2.5rem] shadow-2xl transition-all duration-300">
        
        <div className="space-y-8 relative z-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">Customer Service</h2>
            <div className="space-y-4 text-[13px] leading-relaxed text-slate-600 dark:text-white/60 font-medium">
              <p>
                Our customer service email address is your primary contact for questions or issues related to your account, betting or payments. 
                Our customer service staff is available to assist you 24 hours a day, 7 days a week.
              </p>
              <p>
                If you are an existing member, please use the email address registered with your SML account and include your customer ID.
              </p>
              <p>
                You can contact us by sending an email to <span className="text-neon-red font-bold hover:underline cursor-pointer">help.sportmylife@gmail.com</span>
              </p>
            </div>
          </section>

          <div className="flex items-center gap-4">
             <div className="h-px bg-slate-100 dark:bg-white/10 flex-1" />
             <div className="w-1.5 h-1.5 rotate-45 border border-slate-300 dark:border-white/20" />
             <div className="h-px bg-slate-100 dark:bg-white/10 flex-1" />
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">Contact Us</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/40 italic uppercase tracking-widest ml-1 block">
                  your email address<span className="text-neon-red ml-0.5">*</span>
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={inputBaseClasses}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/40 italic uppercase tracking-widest ml-1 block">
                  Title<span className="text-neon-red ml-0.5">*</span>
                </label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={inputBaseClasses}
                  required
                />
              </div>

              <CustomSelect 
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(val) => setFormData({...formData, department: val})}
              />

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/40 italic uppercase tracking-widest ml-1 block">
                  Details<span className="text-neon-red ml-0.5">*</span>
                </label>
                <textarea 
                  rows={6}
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className={`${inputBaseClasses} resize-none`}
                  required
                />
              </div>

              <div className="flex items-center justify-center gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 max-w-[220px] bg-[#a11c1c] text-white font-black text-sm uppercase tracking-widest py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-neon-red/20"
                >
                  <Send size={16} />
                  SUBMIT
                </button>
                <button 
                  type="button"
                  className="flex-1 max-w-[220px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white font-black text-sm uppercase tracking-widest py-4 px-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
