import React, { useState } from 'react';
import { ShieldCheck, User, Bell, Lock, Save } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { VerifiedBadge } from '../../components/ui/Badge';

export const SettingsPage = () => {
  const { currentUser, updateUserProfile, showToast } = useStore();
  
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    college: currentUser ? currentUser.college : '',
    course: currentUser ? currentUser.course : '',
    year: currentUser ? currentUser.year : '',
    bio: currentUser ? currentUser.bio : ''
  });

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [msgNotifs, setMsgNotifs] = useState(true);
  const [offerNotifs, setOfferNotifs] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  return (
    <div className="space-y-6 font-sans max-w-3xl">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          ACCOUNT & CAMPUS SETTINGS
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Manage your verified campus profile specs, notifications, and security protocols.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Settings */}
        <Card variant="technical" className="space-y-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <User className="w-4 h-4 text-cx-0" />
              <span>STUDENT IDENTITY SPECS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="FULL NAME"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="INSTITUTIONAL EMAIL"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="UNIVERSITY / CAMPUS"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                required
              />

              <Input
                label="MAJOR / COURSE"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
            </div>

            <Textarea
              label="CAMPUS BIO / HANDOVER PREFERENCES"
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card variant="technical" className="space-y-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Bell className="w-4 h-4 text-cx-0" />
              <span>NOTIFICATION PREFERENCES</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            {[
              { label: 'Email Notifications for New Messages', state: emailNotifs, setState: setEmailNotifs },
              { label: 'Instant Alerts for Item Offers Received', state: msgNotifs, setState: setMsgNotifs },
              { label: 'Wishlist Item Price Drop Alerts', state: offerNotifs, setState: setOfferNotifs },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center justify-between p-3 bg-cx-950 rounded-cx-md border border-cx-800 cursor-pointer">
                <span className="text-cx-300">{item.label}</span>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={(e) => item.setState(e.target.checked)}
                  className="rounded bg-cx-900 border-cx-700 accent-cx-0"
                />
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Profile Settings
          </Button>
        </div>

      </form>

    </div>
  );
};
