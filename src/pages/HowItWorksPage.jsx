import React from 'react';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge, VerifiedBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const HowItWorksPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col justify-between selection:bg-cx-0 selection:text-cx-950">
      <Navbar onTabChange={(tab) => {
        if (tab === 'overview') onNavigate('/');
        else onNavigate('/marketplace');
      }} />

      <main className="py-16 flex-1">
        <Container size="xl" className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <VerifiedBadge text="PROTOCOL GUIDELINES" size="sm" className="mx-auto" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-cx-0 uppercase">
              HOW CAMPUSXCHANGE WORKS
            </h1>
            <p className="text-base sm:text-lg text-cx-400 font-normal leading-relaxed">
              Step-by-step guide to buying, selling, and exchanging verified campus items safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="technical">
              <CardHeader>
                <CardTitle className="text-xl">FOR BUYERS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs font-mono text-cx-300">
                <div>1. VERIFY: Login with your email pass.</div>
                <div>2. SEARCH: Filter textbooks, electronics, and dorm gear by your campus.</div>
                <div>3. CHAT: Message the seller directly to negotiate price or arrange handover.</div>
                <div>4. EXCHANGE: Inspect the item at the campus center and confirm order completion.</div>
              </CardContent>
            </Card>

            <Card variant="technical">
              <CardHeader>
                <CardTitle className="text-xl">FOR SELLERS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs font-mono text-cx-300">
                <div>1. CREATE LISTING: Upload photos, set condition, price, and pickup spot.</div>
                <div>2. RECEIVE OFFERS: Get real-time notifications when campus buyers contact you.</div>
                <div>3. HANDOVER: Meet the buyer safely on campus to complete the trade.</div>
                <div>4. GET RATED: Build your verified student seller reputation.</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-4">
            <Button variant="primary" size="lg" onClick={() => onNavigate('/signup')}>
              Get Started Now
            </Button>
          </div>

        </Container>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
