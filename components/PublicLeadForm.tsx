

import React, { useState, useMemo } from 'react';
import { Lead, LeadStatus, ContactChannel, Profile } from '../types';
import { submitLeadForm } from '../lib/api';

interface PublicLeadFormProps {
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    userProfile: Profile;
    showNotification: (message: string) => void;
}

const PublicLeadForm: React.FC<PublicLeadFormProps> = ({ setLeads, userProfile }) => {
    const [formState, setFormState] = useState({
        name: '',
        whatsapp: '',
        eventType: userProfile.projectTypes[0] || '',
        eventDate: '',
        eventLocation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const leadData = {
            name: formState.name,
            whatsapp: formState.whatsapp,
            eventType: formState.eventType,
            eventDate: formState.eventDate,
            eventLocation: formState.eventLocation,
        };
        
        submitLeadForm(leadData)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.error('Error submitting lead:', error);
                alert('Gagal mengirim formulir. Silakan coba lagi.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (isSubmitted) {
        const whatsappMessage = `Halo admin Vena Pictures, saya ${formState.name}. Saya baru saja mengisi formulir prospek dan ingin menanyakan informasi lebih lanjut.`;
        const whatsappUrl = `https://wa.me/62895406181407?text=${encodeURIComponent(whatsappMessage)}`;

        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
                <div className="w-full max-w-lg p-8 text-center bg-brand-surface rounded-2xl shadow-lg border border-brand-border">
                    <h1 className="text-2xl font-bold text-gradient">Terima Kasih!</h1>
                    <p className="mt-4 text-brand-text-primary">Informasi Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
                    <p className="mt-2 text-sm text-brand-text-secondary">Untuk bantuan atau informasi lebih lanjut, silakan hubungi admin kami.</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 button-primary inline-block">
                        Hubungi Admin via WhatsApp
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
            <div className="w-full max-w-lg p-8 space-y-6 bg-brand-surface rounded-2xl shadow-lg border border-brand-border">
                <div className="text-center space-y-3">
                    <h1 className="text-2xl font-bold text-brand-text-light">Hai! Terimakasih telah menghubungi #venapictures</h1>
                    <p className="text-brand-text-primary">Perkenalkan aku Nina! (๑•ᴗ•๑)♡</p>
                    <p className="text-sm text-brand-text-secondary">Untuk informasi mengenai pricelist dan availability, mohon mengisi data berikut ya!</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input id="name" name="name" type="text" value={formState.name} onChange={handleFormChange} className="input-field" placeholder=" " required />
                        <label htmlFor="name" className="input-label">Nama</label>
                    </div>
                     <div className="input-group">
                        <input id="whatsapp" name="whatsapp" type="tel" value={formState.whatsapp} onChange={handleFormChange} className="input-field" placeholder=" " required />
                        <label htmlFor="whatsapp" className="input-label">Nomor WhatsApp</label>
                    </div>
                    <div className="input-group">
                        <select id="eventType" name="eventType" value={formState.eventType} onChange={handleFormChange} className="input-field" required>
                             {userProfile.projectTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                        </select>
                        <label htmlFor="eventType" className="input-label">Jenis Acara</label>
                    </div>
                    <div className="input-group">
                        <input id="eventDate" name="eventDate" type="date" value={formState.eventDate} onChange={handleFormChange} className="input-field" placeholder=" " required />
                        <label htmlFor="eventDate" className="input-label">Tanggal Acara</label>
                    </div>
                    <div className="input-group">
                        <input id="eventLocation" name="eventLocation" type="text" value={formState.eventLocation} onChange={handleFormChange} className="input-field" placeholder=" " required />
                        <label htmlFor="eventLocation" className="input-label">Lokasi Acara</label>
                    </div>
                    <div className="pt-2">
                        <button type="submit" disabled={isSubmitting} className="w-full button-primary">
                            {isSubmitting ? 'Mengirim...' : 'Kirim Informasi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PublicLeadForm;
