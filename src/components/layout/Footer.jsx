import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';

export const Footer = ({ onNavigate = () => {} }) => {
  const cols = [
    {
      heading: 'Marketplace',
      links: [
        { label: 'Browse Listings', path: '/marketplace' },
        { label: 'Sell an Item', path: '/dashboard/listings/create' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Safety Tips', path: '/about' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/about' },
        { label: 'Privacy Policy', path: '/about' },
        { label: 'Terms of Service', path: '/about' },
      ],
    },
    {
      heading: 'Account',
      links: [
        { label: 'Register', path: '/signup' },
        { label: 'Login', path: '/login' },
        { label: 'My Listings', path: '/dashboard/listings' },
        { label: 'Messages', path: '/dashboard/messages' },
      ],
    },
  ];

  return (
    <footer className="border-t border-cx-800 bg-cx-950 text-cx-400 pt-14 pb-8 font-sans mb-14 md:mb-0">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 bg-cx-0 text-cx-950 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter group-hover:scale-105 transition-transform">
                CX
              </div>
              <span className="font-bold text-sm tracking-tight text-cx-0 uppercase font-mono">
                CAMPUS<span className="font-light text-cx-400">XCHANGE</span>
              </span>
            </button>
            <p className="text-xs text-cx-500 leading-relaxed">
              Your campus. Your marketplace.<br />
              Buy, sell and exchange with verified students within your campus community.
            </p>
            <div className="inline-flex items-center space-x-1.5 border border-cx-800 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-cx-400" />
              <span className="font-mono text-[10px] text-cx-500 uppercase tracking-wider">College Verified</span>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading} className="space-y-3">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-cx-0">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.path)}
                      className="text-xs font-mono text-cx-500 hover:text-cx-0 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-cx-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cx-600 gap-3">
          <div>CampusXchange — Verified College Marketplace Network</div>
          <div>Indian University Campus Network</div>
        </div>
      </Container>
    </footer>
  );
};
