import React from 'react';
import { ShieldCheck, Lock, Building, Users } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col justify-between selection:bg-cx-0 selection:text-cx-950">
      
      <Navbar currentPath="/about" onNavigate={onNavigate} />

      <main className="py-16 flex-1">
        <Container size="xl" className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-cx-900 border border-cx-750 px-3 py-1 rounded text-xs font-mono text-cx-300">
              <ShieldCheck className="w-4 h-4 text-cx-0" />
              <span>ACCREDITED CAMPUS SAFETY STANDARD</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-cx-0 uppercase">
              ABOUT CAMPUSXCHANGE
            </h1>
            <p className="text-base sm:text-lg text-cx-400 font-normal leading-relaxed">
              CampusXchange is a verified peer-to-peer marketplace built exclusively for college students to discover, buy, sell, and exchange items within their university campus network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="technical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-cx-0" />
                  <span>College Email Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-cx-400 leading-relaxed space-y-2">
                <p>
                  Every member must authenticate using an official accredited college email (.edu.in, .ac.in, or .edu) to ensure institutional safety.
                </p>
              </CardContent>
            </Card>

            <Card variant="technical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-cx-0" />
                  <span>In-Person Campus Handover</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-cx-400 leading-relaxed space-y-2">
                <p>
                  Zero shipping fees and zero transit delays. All handovers happen inside university grounds at libraries, canteens, or hostel blocks.
                </p>
              </CardContent>
            </Card>

            <Card variant="technical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-cx-0" />
                  <span>Verified Peer Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-cx-400 leading-relaxed space-y-2">
                <p>
                  Designed with a high-contrast monochrome design aesthetic, instant student search, live offer bargaining, and zero clutter.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-8 bg-cx-900 border border-cx-750 rounded-cx-2xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-cx-0 uppercase">READY TO ACCESS YOUR CAMPUS MARKETPLACE?</h2>
            <Button variant="primary" size="lg" onClick={() => onNavigate('/marketplace')} className="font-mono text-xs uppercase">
              Explore Marketplace Now
            </Button>
          </div>

        </Container>
      </main>

      <Footer onNavigate={onNavigate} />

      <MobileBottomNav currentPath="/about" onNavigate={onNavigate} />

    </div>
  );
};
