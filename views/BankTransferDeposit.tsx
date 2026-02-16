
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, List, ChevronDown } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

interface BankTransferDepositProps {
  onBack: () => void;
}

const BankTransferDeposit: React.FC<BankTransferDepositProps> = ({ onBack }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [bankName, setBankName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'USDT', label: 'USDT' },
    { value: 'EUR', label: 'EUR' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Submission processed. Please wait for validation.");
    }, 1500);
  };

  const labelClasses = "text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 block";
  const subtextClasses = "text-[11px] font-bold text-slate-400 dark:text-white/30 mb-2 block italic uppercase tracking-wider";
  const inputClasses = "w-full bg-white dark:bg-black border border-slate-300 dark:border-white/20 rounded-md py-3.5 px-4 text-slate-900 dark:text-white font-black focus:outline-none focus:border-neon-red/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#a11c1c] hover:text-white transition-all shadow-sm group"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">Bank Transfer Deposit</h1>
        </div>
        <button 
          onClick={() => window.location.hash = '#/deposit-list'}
          className="flex items-center gap-2 bg-[#a11c1c]/10 border border-[#a11c1c] px-4 py-1.5 rounded-full text-[#a11c1c] hover:bg-[#a11c1c] hover:text-white transition-all group"
        >
          <List size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Deposit List</span>
        </button>
      </div>

      <p className="text-[12px] font-bold text-slate-500 dark:text-white/70 leading-relaxed uppercase tracking-wider italic">
        SML will not be responsible for any financial loss that may be incurred if an incorrect blockchain network is used.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Deposit Amount */}
        <div className="space-y-2">
          <label className={labelClasses}>Deposit amount :</label>
          <div className="flex gap-2">
            <div className="w-[120px] shrink-0">
              <CustomSelect 
                options={currencyOptions}
                value={currency}
                onChange={setCurrency}
                className="[&_button]:py-3.5 [&_button]:rounded-md [&_button]:bg-white dark:[&_button]:bg-black"
              />
            </div>
            <input 
              type="text" 
              placeholder="Enter amount"
              className={inputClasses}
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        {/* Your Bank Name */}
        <div>
          <label className={labelClasses}>Your Bank Name :</label>
          <input 
            type="text" 
            placeholder="Enter Bank Name"
            className={inputClasses}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelClasses}>Last Name :</label>
          <span className={subtextClasses}>(As registered in the bank account)</span>
          <input 
            type="text" 
            placeholder="Enter Last Name"
            className={inputClasses}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* First Name */}
        <div>
          <label className={labelClasses}>First Name :</label>
          <span className={subtextClasses}>(As registered in the bank account)</span>
          <input 
            type="text" 
            placeholder="Enter First Name"
            className={inputClasses}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-snug italic">
          This name cannot be changed and will be saved for use in all future bank transfers and payments.
        </p>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#a11c1c] text-white py-5 rounded-md font-black text-xl uppercase tracking-tighter shadow-xl shadow-[#a11c1c]/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </button>

        {/* Post-Submit Info */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-2">
            <span className="text-slate-400 dark:text-white/20 mt-1">•</span>
            <p className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider leading-relaxed italic">
              Click this button only once. If you return to this page and click this button again, multiple bank transfers may be requested.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 dark:text-white/20 mt-1">•</span>
            <p className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider leading-relaxed italic">
              <span className="text-yellow-500 underline cursor-pointer hover:text-yellow-400 transition-colors">Click here</span> for more information about bank transfer deposit
            </p>
          </div>
        </div>

        {/* Deposit Limits Box */}
        <div className="space-y-3">
          <h3 className={labelClasses}>Bank Transfer deposit limit :</h3>
          <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-lg p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Minimum deposit amount :</span>
              <span className="text-[13px] font-black text-slate-700 dark:text-white/60 uppercase tracking-tighter italic">USD 3,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Maximum deposit amount :</span>
              <span className="text-[13px] font-black text-slate-700 dark:text-white/60 uppercase tracking-tighter italic">USD 50,000</span>
            </div>
          </div>
        </div>

        {/* Footer Warning */}
        <p className="text-[11px] font-black text-[#ff3131] uppercase tracking-[0.05em] leading-relaxed italic text-center">
          Payment system via KYC verification. The KYC process is only available in designated countries. Eligible country: The Bahamas
        </p>
      </form>
    </div>
  );
};

export default BankTransferDeposit;
