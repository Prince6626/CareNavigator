import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle, 
  ShieldCheck,
  Building,
  ExternalLink,
  Info
} from 'lucide-react';

const HospitalDetail = ({ hospital, onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);

  if (!hospital) return null;

  // Use acceptedSchemes from DB or fallback to empty array
  const acceptedSchemes = hospital.acceptedSchemes || [];

  // Check for specific schemes to conditionally show buttons
  const hasPMJAY = acceptedSchemes.some(s => s.schemeName === "Ayushman Bharat PM-JAY");
  const hasMA = acceptedSchemes.some(s => s.schemeName === "Mukhyamantri Amrutum Yojana");

  const openOfficialPortal = (url) => {
    if (isDisclaimerChecked) {
      window.open(url, '_blank', 'noopener,noreferrer');
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative">
      {/* Header / Nav */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-800 truncate">
            {hospital.name}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Hospital Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            {hospital.rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-slate-700">{hospital.rating}</span>
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{hospital.name}</h2>
          
          <div className="space-y-3 text-slate-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p>{hospital.address}, {hospital.city} {hospital.pincode}</p>
            </div>
            {hospital.contact && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                <p>{hospital.contact}</p>
              </div>
            )}
          </div>
        </div>

        {/* Specialities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            Medical Specialities
          </h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialities && hospital.specialities.length > 0 ? (
              hospital.specialities.map((spec, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100"
                >
                  {spec}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm">General Medicine</span>
            )}
          </div>
        </div>

        {/* Government Schemes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">Accepted Government Schemes</h3>
          <div className="space-y-3">
            {acceptedSchemes.length > 0 ? (
              acceptedSchemes.map((scheme, idx) => (
                <div key={idx} className={`rounded-xl p-4 flex items-center justify-between border ${
                  scheme.schemeName === "Ayushman Bharat PM-JAY" || scheme.schemeName === "Mukhyamantri Amrutum Yojana"
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100' 
                    : 'bg-white border-slate-100'
                }`}>
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full shadow-xs ${
                       scheme.schemeName === "Ayushman Bharat PM-JAY" || scheme.schemeName === "Mukhyamantri Amrutum Yojana" ? 'bg-white' : 'bg-slate-50'
                     }`}>
                      <ShieldCheck className={`w-6 h-6 ${
                        scheme.schemeName === "Ayushman Bharat PM-JAY" || scheme.schemeName === "Mukhyamantri Amrutum Yojana" ? 'text-emerald-600' : 'text-slate-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{scheme.schemeName}</h4>
                      {(scheme.schemeName === "Ayushman Bharat PM-JAY" || scheme.schemeName === "Mukhyamantri Amrutum Yojana") && (
                         <p className="text-xs text-slate-600">Government Health Scheme</p>
                      )}
                    </div>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${
                    scheme.schemeName === "Ayushman Bharat PM-JAY" || scheme.schemeName === "Mukhyamantri Amrutum Yojana" ? 'text-emerald-500 fill-white' : 'text-slate-300'
                  }`} />
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No specific schemes listed for this hospital.</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button - Floating on mobile, fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <button 
            className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-300 hover:shadow-xl hover:from-slate-900 hover:to-black transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            onClick={() => setShowModal(true)}
          >
            <ShieldCheck className="w-5 h-5" />
            Verify Eligibility (Official Portal)
          </button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5" />
            Eligibility verification is handled securely by the respective government portal.
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Verify Eligibility</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 flex gap-3">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  For accurate results, eligibility verification is handled directly by the official government portals.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {hasPMJAY && (
                  <button
                    onClick={() => openOfficialPortal('https://pmjay.gov.in/search')}
                    disabled={!isDisclaimerChecked}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 group transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-100 disabled:hover:bg-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
                        PM
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 group-hover:text-emerald-700">Check on PMJAY Portal</div>
                        <div className="text-xs text-slate-500">mera.pmjay.gov.in</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </button>
                )}

                {hasMA && (
                  <button
                    onClick={() => openOfficialPortal('https://ma.gujarat.gov.in/')}
                    disabled={!isDisclaimerChecked}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 group transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-100 disabled:hover:bg-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        MA
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700">Check on MA Portal</div>
                        <div className="text-xs text-slate-500">maa.gujarat.gov.in</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                )}

                {!hasPMJAY && !hasMA && (
                  <div className="text-center py-4 text-slate-500 text-sm">
                    No direct government portal integrations available for this hospital's schemes.
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <input 
                  type="checkbox" 
                  id="disclaimer"
                  checked={isDisclaimerChecked}
                  onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="disclaimer" className="text-sm text-slate-600 cursor-pointer select-none">
                  I understand I am leaving CareNavigator and going to an official government website.
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetail;
