import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle, 
  ShieldCheck,
  Building
} from 'lucide-react';

const HospitalDetail = ({ hospital, onBack }) => {
  if (!hospital) return null;

  // Use schemes from DB or fallback to empty array
  const schemes = hospital.schemes || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
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
            {schemes.length > 0 ? (
              schemes.map((scheme, idx) => (
                <div key={idx} className={`rounded-xl p-4 flex items-center justify-between border ${
                  scheme === 'PMJAY-MA' || scheme.includes('Ayushman') 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100' 
                    : 'bg-white border-slate-100'
                }`}>
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full shadow-xs ${
                       scheme === 'PMJAY-MA' || scheme.includes('Ayushman') ? 'bg-white' : 'bg-slate-50'
                     }`}>
                      <ShieldCheck className={`w-6 h-6 ${
                        scheme === 'PMJAY-MA' || scheme.includes('Ayushman') ? 'text-emerald-600' : 'text-slate-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{scheme}</h4>
                      {(scheme === 'PMJAY-MA' || scheme.includes('Ayushman')) && (
                         <p className="text-xs text-slate-600">Government Health Scheme</p>
                      )}
                    </div>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${
                    scheme === 'PMJAY-MA' || scheme.includes('Ayushman') ? 'text-emerald-500 fill-white' : 'text-slate-300'
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-3xl mx-auto">
          <button 
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            onClick={() => alert('Eligibility Check initiated...')}
          >
            <ShieldCheck className="w-5 h-5" />
            Check Eligibility
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
