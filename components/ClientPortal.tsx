
import React, { useState, useMemo, useEffect } from 'react';
import { TeamMember, Project, TeamProjectPayment, FreelancerFeedback, Client, Profile } from '../types';
import Modal from './Modal';
import { CalendarIcon, CreditCardIcon, MessageSquareIcon, ClockIcon, UsersIcon, FileTextIcon, MapPinIcon, HomeIcon, FolderKanbanIcon, StarIcon, DollarSignIcon, AlertCircleIcon, BookOpenIcon, PrinterIcon, CheckSquareIcon } from '../constants';
import StatCard from './StatCard';
import { getClientPortalData, clientPortalAction } from '../lib/api';

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

interface ClientPortalProps {
    accessId: string;
    clients: Client[];
    projects: Project[];
    teamProjectPayments: TeamProjectPayment[];
    showNotification: (message: string) => void;
    profile: Profile;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ accessId, clients, projects, teamProjectPayments, showNotification, profile }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [portalData, setPortalData] = useState<{
        client: Client | null;
        projects: Project[];
    }>({ client: null, projects: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load portal data from API
    useEffect(() => {
        const loadPortalData = async () => {
            try {
                setLoading(true);
                const result = await getClientPortalData(accessId);
                setPortalData(result.data);
            } catch (err) {
                console.error('Error loading portal data:', err);
                setError('Gagal memuat data portal');
                // Fallback to props data
                const client = clients.find(c => c.portalAccessId === accessId);
                const clientProjects = projects.filter(p => p.clientId === client?.id);
                setPortalData({ 
                    client: client || null, 
                    projects: clientProjects
                });
            } finally {
                setLoading(false);
            }
        };
        loadPortalData();
    }, [accessId, clients, projects]);

    const client = portalData.client;
    const clientProjects = portalData.projects;
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
                <div className="w-full max-w-lg p-8 text-center bg-brand-surface rounded-2xl shadow-lg">
                    <p className="text-brand-text-primary">Memuat data portal...</p>
                </div>
            </div>
        );
    }

    if (error || !client) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
                <div className="w-full max-w-lg p-8 text-center bg-brand-surface rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-brand-danger">Portal Tidak Ditemukan</h1>
                    <p className="mt-4 text-brand-text-primary">{error || 'Tautan yang Anda gunakan tidak valid. Silakan hubungi admin.'}</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'dashboard', label: 'Dasbor', icon: HomeIcon },
        { id: 'projects', label: 'Proyek', icon: FolderKanbanIcon },
        { id: 'feedback', label: 'Feedback', icon: MessageSquareIcon },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardTab client={client} projects={clientProjects} />;
            case 'projects': return <ProjectsTab projects={clientProjects} onProjectClick={setSelectedProject} />;
            case 'feedback': return <FeedbackTab client={client} />;
            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-brand-bg text-brand-text-primary p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8 p-6 bg-brand-surface rounded-2xl shadow-lg border border-brand-border widget-animate">
                    <h1 className="text-3xl font-bold text-gradient">Portal Klien</h1>
                    <p className="text-lg text-brand-text-secondary mt-2">Selamat Datang, {client.name}!</p>
                </header>
                <div className="border-b border-brand-border mb-6 widget-animate" style={{ animationDelay: '100ms' }}>
                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)} 
                                className={`shrink-0 inline-flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id 
                                        ? 'border-brand-accent text-brand-accent' 
                                        : 'border-transparent text-brand-text-secondary hover:text-brand-text-light'
                                }`}
                            >
                                <tab.icon className="w-5 h-5"/> 
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <main>{renderTabContent()}</main>
                <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={`Detail Proyek: ${selectedProject?.projectName}`} size="3xl">
                    {selectedProject && <ProjectDetailModal project={selectedProject} />}
                </Modal>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const DashboardTab: React.FC<{client: Client, projects: Project[]}> = ({ client, projects }) => {
    const stats = useMemo(() => {
        const totalProjects = projects.length;
        const completedProjects = projects.filter(p => p.status === 'Selesai').length;
        const activeProjects = projects.filter(p => p.status !== 'Selesai' && p.status !== 'Dibatalkan').length;
        
        return { totalProjects, completedProjects, activeProjects };
    }, [projects]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="widget-animate" style={{ animationDelay: '200ms' }}>
                    <StatCard 
                        icon={<FolderKanbanIcon className="w-6 h-6"/>} 
                        title="Total Proyek" 
                        value={stats.totalProjects.toString()} 
                        iconBgColor="bg-blue-500/20" 
                        iconColor="text-blue-400" 
                    />
                </div>
                <div className="widget-animate" style={{ animationDelay: '300ms' }}>
                    <StatCard 
                        icon={<ClockIcon className="w-6 h-6"/>} 
                        title="Proyek Aktif" 
                        value={stats.activeProjects.toString()} 
                        iconBgColor="bg-yellow-500/20" 
                        iconColor="text-yellow-400" 
                    />
                </div>
                <div className="widget-animate" style={{ animationDelay: '400ms' }}>
                    <StatCard 
                        icon={<CheckSquareIcon className="w-6 h-6"/>} 
                        title="Proyek Selesai" 
                        value={stats.completedProjects.toString()} 
                        iconBgColor="bg-green-500/20" 
                        iconColor="text-green-400" 
                    />
                </div>
            </div>
        </div>
    );
};

const ProjectsTab: React.FC<{projects: Project[], onProjectClick: (p: Project) => void}> = ({ projects, onProjectClick }) => (
    <div className="space-y-4">
        {projects.map((p, index) => (
            <div 
                key={p.id} 
                onClick={() => onProjectClick(p)} 
                className="p-4 bg-brand-surface rounded-xl border border-brand-border cursor-pointer hover:border-brand-accent flex justify-between items-center transition-all duration-200 hover:shadow-md widget-animate" 
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div>
                    <h3 className="font-semibold text-lg text-brand-text-light">{p.projectName}</h3>
                    <p className="text-sm text-brand-text-secondary mt-1">{formatDate(p.date)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    p.status === 'Selesai' ? 'bg-green-500/20 text-green-300' :
                    p.status === 'Dibatalkan' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                }`}>
                    {p.status}
                </span>
            </div>
        ))}
        {projects.length === 0 && (
            <div className="bg-brand-surface p-6 rounded-2xl text-center widget-animate">
                <p className="text-brand-text-secondary py-8">Belum ada proyek yang tersedia.</p>
            </div>
        )}
    </div>
);

const FeedbackTab: React.FC<{client: Client}> = ({ client }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-brand-border widget-animate">
        <h2 className="text-xl font-bold text-brand-text-light mb-4">Berikan Feedback</h2>
        <p className="text-brand-text-secondary">Fitur feedback akan segera tersedia.</p>
    </div>
);

const ProjectDetailModal: React.FC<{project: Project}> = ({ project }) => (
    <div className="space-y-6">
        <div>
            <h4 className="font-semibold text-gradient mb-2">Informasi Proyek</h4>
            <div className="text-sm space-y-2 p-3 bg-brand-bg rounded-lg">
                <p><strong>Lokasi:</strong> {project.location}</p>
                <p><strong>Waktu:</strong> {project.startTime || 'N/A'} - {project.endTime || 'N/A'}</p>
                <p><strong>Status:</strong> {project.status}</p>
                {project.driveLink && (
                    <p><strong>File Proyek:</strong> 
                        <a href={project.driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                            Buka Tautan
                        </a>
                    </p>
                )}
                {project.notes && (
                    <p className="whitespace-pre-wrap mt-2 pt-2 border-t border-brand-border">
                        <strong>Catatan:</strong> {project.notes}
                    </p>
                )}
            </div>
        </div>
    </div>
);

export default ClientPortal;
