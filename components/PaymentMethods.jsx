'use client';

export default function PaymentMethods() {
  return (
    <div className="border-t border-gray-200 mt-8 pt-8">
      <div className="flex flex-col items-center">
        <h4 className="font-semibold text-gray-700 mb-4">Ödeme Yöntemleri</h4>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Visa */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-14" viewBox="0 0 50 16" fill="none">
              <rect width="50" height="16" rx="2" fill="#1A1F71"/>
              <text x="25" y="11" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold" fontStyle="italic">VISA</text>
            </svg>
          </div>
          {/* Mastercard */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-14" viewBox="0 0 50 16">
              <rect width="50" height="16" rx="2" fill="#1A1F71"/>
              <circle cx="20" cy="8" r="5" fill="#EB001B"/>
              <circle cx="30" cy="8" r="5" fill="#F79E1B"/>
            </svg>
          </div>
          {/* American Express */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-20" viewBox="0 0 80 24">
              <rect width="80" height="24" rx="3" fill="#006FCF"/>
              <text x="40" y="10" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">AMERICAN</text>
              <text x="40" y="18" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">EXPRESS</text>
            </svg>
          </div>
          {/* Discover */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-14" viewBox="0 0 50 16">
              <rect width="50" height="16" rx="2" fill="#F9F1E8"/>
              <text x="25" y="11" fontSize="6" fill="#FF6000" textAnchor="middle" fontWeight="bold">DISCOVER</text>
            </svg>
          </div>
          {/* PayPal */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-14" viewBox="0 0 50 16">
              <rect width="50" height="16" rx="2" fill="#003087"/>
              <text x="25" y="11" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">PayPal</text>
            </svg>
          </div>
          {/* Stripe */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-14" viewBox="0 0 50 16">
              <rect width="50" height="16" rx="2" fill="#635BFF"/>
              <text x="25" y="11" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">stripe</text>
            </svg>
          </div>
          {/* Havale/EFT */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <svg className="h-7 w-7 text-[#006039]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Havale/EFT</span>
          </div>
          {/* Kripto */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <svg className="h-7 w-7 text-[#F7931A]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.7-.168-1.053-.25l.53-2.12-1.32-.33-.54 2.153c-.285-.065-.565-.13-.84-.2l.001-.006-1.82-.455-.35 1.407s.975.223.955.238c.535.136.63.494.615.78l-.62 2.473c.037.01.085.024.138.046l-.14-.034-.87 3.47c-.065.165-.23.41-.61.32.015.02-.96-.24-.96-.24l-.655 1.51 1.72.43c.32.08.632.163.94.24l-.545 2.19 1.32.33.54-2.17c.36.1.705.19 1.05.273l-.538 2.155 1.32.33.545-2.19c2.24.424 3.93.254 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.2 1.508-.775 1.68-1.96h.003z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-700">Kripto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
