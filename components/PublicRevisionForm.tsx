
import React, { useState, useMemo, useEffect } from 'react';
import { Project, TeamMember, Revision, RevisionStatus } from '../types';
import { getRevisionData, updateRevision } from '../lib/api';

interface PublicRevisionFormProps {
    projects: Project[];
    teamMembers: TeamMember[];
    onUpdateRevision: (projectId: string, revisionId: string, updatedData: { freelancerNotes: string, driveLink: string, status: RevisionStatus }) => void;
}

const PublicRevisionForm: React.FC<PublicRevisionFormProps> = ({ projects, teamMembers, onUpdateRevision }) => {
    const [params, setParams] = useState<{ projectId: string, freelancerId: string, revisionId: string } | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [revisionData, setRevisionData] = useState<{
        project: Project | null;
        freelancer: TeamMember | null;
        revision: Revision | null;
    }>({ project: null, freelancer: null, revision: null });

    const [formData, setFormData] = useState({
        freelancerNotes: '',
        driveLink: '',
        status: RevisionStatus.IN_PROGRESS,
    });

    useEffect(() => {
        try {
            const hash = window.location.hash;
            const urlParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
            const projectId = urlParams.get('projectId');
            const freelancerId = urlParams.get('freelancerId');
            const revisionId = urlParams.get('revisionId');

            if (!projectId || !freelancerId || !revisionId) {
                throw new Error("Parameter URL tidak lengkap.");
            }
            setParams({ projectId, freelancerId, revisionId });
            
            // Load revision data from API
            getRevisionData(projectId, freelancerId, revisionId)
                .then(result => {
                    setRevisionData(result.data);
                })
                .catch(err => {
                    console.error('Error loading revision data:', err);
                    setError('Gagal memuat data revisi');
                    // Fallback to props data
                    const p = projects.find(proj => proj.id === projectId);
                    const f = teamMembers.find(m => m.id === freelancerId);
                    const r = p?.revisions?.find(rev => rev.id === revisionId && rev.freelancerId === freelancerId);
                    setRevisionData({ project: p || null, freelancer: f || null, revision: r || null });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (e) {
            setError("Tautan revisi tidak valid atau rusak.");
            setIsLoading(false);
        } finally {
            // setIsLoading(false); // Moved to API call completion
        }
    }, []);

    const { project, freelancer, revision } = revisionData;
    
    useEffect(() => {
        if (revision) {
            setFormData(prev => ({
                ...prev,
                freelancerNotes: revision.freelancerNotes || '',
                driveLink: revision.driveLink || '',
                status: revision.status === RevisionStatus.PENDING ? RevisionStatus.IN_PROGRESS : revision.status,
            }));
        }
    }, [revision]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen bg-brand-bg"><p>Memuat...</p></div>;
    }

    if (error || !project || !freelancer || !revision) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
                <div className="w-full max-w-lg p-8 text-center bg-brand-surface rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-brand-danger">Tautan Tidak Valid</h1>
                    <p className="mt-4 text-brand-text-primary">{error || "Tugas revisi tidak ditemukan. Mohon periksa kembali tautan yang Anda terima."}</p>
                </div>
            </div>
        );
    }
    
    if (isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
                <div className="w-full max-w-lg p-8 text-center bg-brand-surface rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gradient">Terima Kasih!</h1>
                    <p className="mt-4 text-brand-text-primary">Pembaruan revisi Anda untuk proyek <strong>{project.projectName}</strong> telah berhasil dikirim.</p>
                </div>
            </div>
        );
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const updateData = {
            projectId: project.id,
            revisionId: revision.id,
            freelancerNotes: formData.freelancerNotes,
            driveLink: formData.driveLink,
            status: formData.status,
        };

        updateRevision(updateData)
            .then(() => {
                onUpdateRevision(project.id, revision.id, updateData);
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error updating revision:', error);
                alert('Gagal memperbarui revisi. Silakan coba lagi.');
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
            <div className="w-full max-w-2xl mx-auto">
                 <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-brand-border">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gradient">Formulir Update Revisi</h1>
                        <p className="text-sm text-brand-text-secondary mt-2">Untuk: {freelancer.name} / Proyek: {project.projectName}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <h4 className="text-base font-semibold text-brand-text-light">Catatan Revisi dari Admin</h4>
                        <div className="p-4 bg-brand-bg rounded-lg">
                            <p className="text-sm text-brand-text-primary whitespace-pre-wrap">{revision.adminNotes}</p>
                            <p className="text-right text-xs text-brand-text-secondary mt-3">Deadline: <strong>{new Date(revision.deadline).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</strong></p>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <select id="status" name="status" value={formData.status} onChange={e => setFormData(p => ({...p, status: e.target.value as RevisionStatus}))} className="input-field" required>
                                <option value={RevisionStatus.IN_PROGRESS}>Sedang Dikerjakan</option>
                                <option value={RevisionStatus.COMPLETED}>Revisi Selesai</option>
                            </select>
                            <label htmlFor="status" className="input-label">Update Status Revisi Anda</label>
                        </div>
                        <div className="input-group">
                            <textarea id="freelancerNotes" name="freelancerNotes" value={formData.freelancerNotes} onChange={e => setFormData(p => ({...p, freelancerNotes: e.target.value}))} className="input-field" placeholder=" " rows={3}></textarea>
                            <label htmlFor="freelancerNotes" className="input-label">Catatan dari Anda (Opsional)</label>
                        </div>
                        <div className="input-group">
                           <input type="url" id="driveLink" name="driveLink" value={formData.driveLink} onChange={e => setFormData(p => ({...p, driveLink: e.target.value}))} className="input-field" placeholder=" " required/>
                           <label htmlFor="driveLink" className="input-label">Tautan Google Drive Hasil Revisi</label>
                       </div>
                        
                        <div className="pt-6">
                            <button type="submit" className="w-full button-primary">Kirim Pembaruan</button>
                        </div>
                    </form>
                 </div>
            </div>
        </div>
    );
};

export default PublicRevisionForm;
