

import React from 'react';
import { ViewType, TransactionType, PaymentStatus, PocketType, ClientStatus, LeadStatus, ContactChannel, CardType, AssetStatus, PerformanceNoteType, SatisfactionLevel, RevisionStatus, Notification, SocialMediaPost, PostType, PostStatus, PromoCode, SOP, ClientType, ProjectStatusConfig } from './types';
import type { User, Client, Project, Package, TeamMember, Transaction, FinancialPocket, AddOn, Profile, TeamProjectPayment, TeamPaymentRecord, AssignedTeamMember, Lead, NotificationSettings, SecuritySettings, RewardLedgerEntry, Card, Asset, PerformanceNote, ClientFeedback, Contract } from './types';

// --- ICONS (NEW THEME) ---
// A collection of SVG icon components used throughout the application.
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const FolderKanbanIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
);
export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
export const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
export const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15.08a2 2 0 0 0 .73-2.73l.22.38a2 2 0 0 0-2.73-.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
export const ChartPieIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);
export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);
export const Trash2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
export const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);
export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
export const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
);
export const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
);
export const CashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M6 12h2"/><path d="M14 12h4"/></svg>
);
export const QrCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><path d="M21 16v3a2 2 0 0 1-2 2h-1"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1a2 2 0 0 0-2-2h-1"/></svg>
);
export const Share2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
export const HistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);
export const AlertCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
export const PiggyBankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.45 5.55 21 7.1c.82.82.82 2.15 0 2.97l-2.02 2.02c-.38.38-.89.6-1.42.6h-3.09a2 2 0 0 1-1.41-.59L10 9.5a2 2 0 0 0-2.83 0L2.83 13.83a2 2 0 0 0 0 2.83L4.24 18c.82.82 2.15.82 2.97 0l2.59-2.59c.38-.38.89-.6 1.42-.6h3.09a2 2 0 0 1 1.41.59l3.42 3.42c.82.82 2.15.82 2.97 0l1.41-1.41"/><path d="m11 16.5 6-6"/><path d="M15 5h.01"/></svg>
);
export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
export const Users2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="10" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>
);
export const ClipboardListIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
);
export const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
export const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
export const PhoneIncomingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 2 16 8 22 8"/><line x1="22" y1="2" x2="16" y2="8"/><path d="M22 16.5A10 10 0 0 1 5.5 8"/><path d="M2 7.9A15 15 0 0 1 15.1 3h5.9"/></svg>
);
export const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
export const LayoutGridIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
);
export const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
export const TrendingDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
        <polyline points="16 17 22 17 22 11"/>
    </svg>
);
export const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
);
export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7-7-7-7"/></svg>
);
export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);
export const CheckSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
);
export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
export const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const BarChart2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
export const SmileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const ThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
);
export const MehIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const FrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const UserCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
export const PercentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
);
export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
export const GalleryHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3v18"/><path d="M22 3v18"/><path d="M6 12h12"/><path d="M6 3h12v3H6z"/><path d="M6 18h12v3H6z"/></svg>
);


// --- HELPERS ---
// Utility functions used across multiple components.

export const CONTRACT_PLACEHOLDERS = [
    { placeholder: '{{nomor_kontrak}}', description: 'Nomor unik kontrak.' },
    { placeholder: '{{tanggal_ttd}}', description: 'Tanggal penandatanganan kontrak.' },
    { placeholder: '{{lokasi_ttd}}', description: 'Lokasi penandatanganan kontrak.' },
    { placeholder: '{{nama_perusahaan}}', description: 'Nama perusahaan Anda.' },
    { placeholder: '{{alamat_perusahaan}}', description: 'Alamat perusahaan Anda.' },
    { placeholder: '{{telepon_perusahaan}}', description: 'Telepon perusahaan Anda.' },
    { placeholder: '{{nama_penandatangan_perusahaan}}', description: 'Nama penandatangan dari pihak Anda.' },
    { placeholder: '{{nama_klien_1}}', description: 'Nama klien utama.' },
    { placeholder: '{{alamat_klien_1}}', description: 'Alamat klien utama.' },
    { placeholder: '{{telepon_klien_1}}', description: 'Telepon klien utama.' },
    { placeholder: '{{nama_klien_2}}', description: 'Nama klien kedua (jika ada).' },
    { placeholder: '{{alamat_klien_2}}', description: 'Alamat klien kedua (jika ada).' },
    { placeholder: '{{telepon_klien_2}}', description: 'Telepon klien kedua (jika ada).' },
    { placeholder: '{{nama_proyek}}', description: 'Nama proyek yang disepakati.' },
    { placeholder: '{{tanggal_acara}}', description: 'Tanggal pelaksanaan acara.' },
    { placeholder: '{{lokasi_acara}}', description: 'Lokasi pelaksanaan acara.' },
    { placeholder: '{{nama_paket}}', description: 'Nama paket layanan yang dipilih.' },
    { placeholder: '{{total_biaya}}', description: 'Total biaya proyek (termasuk PPN jika ada).' },
    { placeholder: '{{jumlah_dp}}', description: 'Jumlah DP yang sudah atau akan dibayar.' },
    { placeholder: '{{sisa_pembayaran}}', description: 'Sisa pembayaran yang harus dilunasi.' },
    { placeholder: '{{tanggal_pelunasan}}', description: 'Batas akhir tanggal pelunasan.' },
    { placeholder: '{{rekening_bank_perusahaan}}', description: 'Nomor rekening bank perusahaan Anda.' },
    { placeholder: '{{detail_paket_fisik}}', description: 'Daftar rincian item fisik dari paket.' },
    { placeholder: '{{detail_paket_digital}}', description: 'Daftar rincian item digital dari paket.' },
    { placeholder: '{{detail_addon}}', description: 'Daftar rincian add-on yang dipilih.' },
    { placeholder: '{{syarat_ketentuan}}', description: 'Syarat dan ketentuan umum dari profil Anda.' },
];

// --- NAVIGATION ---
// Defines the items available in the main sidebar navigation.
export const NAV_ITEMS = [
  { view: ViewType.DASHBOARD, label: 'Dashboard', icon: HomeIcon },
  { view: ViewType.PROSPEK, label: 'Prospek', icon: LightbulbIcon },
  { view: ViewType.CLIENTS, label: 'Manajemen Klien', icon: UsersIcon },
  { view: ViewType.PROJECTS, label: 'Proyek', icon: FolderKanbanIcon },
  { view: ViewType.TEAM, label: 'Freelancer', icon: BriefcaseIcon },
  { view: ViewType.FINANCE, label: 'Keuangan', icon: DollarSignIcon },
  { view: ViewType.CALENDAR, label: 'Kalender', icon: CalendarIcon },
  { view: ViewType.CLIENT_REPORTS, label: 'Laporan Klien', icon: ChartPieIcon },
  { view: ViewType.PACKAGES, label: 'Paket Layanan', icon: PackageIcon },
  { view: ViewType.PROMO_CODES, label: 'Kode Promo', icon: PercentIcon },
  { view: ViewType.ASSETS, label: 'Manajemen Aset', icon: CameraIcon },
  { view: ViewType.CONTRACTS, label: 'Kontrak Kerja', icon: FileTextIcon },
  { view: ViewType.SOP, label: 'SOP', icon: BookOpenIcon },
  { view: ViewType.SOCIAL_MEDIA_PLANNER, label: 'Perencana Medsos', icon: Share2Icon },
  { view: ViewType.SETTINGS, label: 'Pengaturan', icon: SettingsIcon },
];

// --- MOCK DATA (RESTRUCTURED & INTEGRATED) ---

const VENDOR_SIGNATURE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9ImN1cnNpdmUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9ImJsYWNrIj5TaWduYXR1cmU8L3RleHQ+PC9zdmc+';
const CLIENT_SIGNATURE_1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkJydXNoIFNjcmlwdCBNVCwgY3Vyc2l2ZSIgZm9udC1zaXplPSIyOCIgZmlsbD0iYmx1ZSI+QS4gU2lza2E8L3RleHQ+PC9zdmc+';

const createMockDate = (monthOffset: number, day: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(day);
    date.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
    return date.toISOString().split('T')[0];
};

// --- Base Static Data ---
export const MOCK_USERS: User[] = [
    { id: 'user-01', email: 'admin@venapictures.com', password: 'password123', fullName: 'Admin Vena', role: 'Admin' },
    { 
        id: 'user-02', 
        email: 'boceng@venapictures.com', 
        password: 'password123', 
        fullName: 'Boceng Staf', 
        role: 'Member',
        permissions: [
            ViewType.DASHBOARD, ViewType.PROSPEK, ViewType.CLIENTS, ViewType.PROJECTS, ViewType.TEAM,
            ViewType.CALENDAR, ViewType.PACKAGES, ViewType.ASSETS, ViewType.CONTRACTS, ViewType.SOP,
            ViewType.SOCIAL_MEDIA_PLANNER
        ]
    }
];

export const MOCK_USER_PROFILE: Profile = {
    fullName: "Admin Vena", email: "admin@venapictures.com", phone: "081234567890",
    companyName: "Vena Pictures", website: "https://venapictures.com", address: "Jl. Raya Fotografi No. 123, Jakarta, Indonesia",
    bankAccount: "BCA 1234567890 a/n Vena Pictures", authorizedSigner: "Vena Pictures Management", idNumber: "3171234567890001",
    bio: "Vendor fotografi pernikahan profesional dengan spesialisasi pada momen-momen otentik dan sinematik.",
    incomeCategories: ["DP Proyek", "Pelunasan Proyek", "Penjualan Album", "Sewa Alat", "Lain-lain", "Modal"],
    expenseCategories: ["Gaji Freelancer", "Hadiah Freelancer", "Penarikan Hadiah Freelancer", "Sewa Tempat", "Transportasi", "Konsumsi", "Marketing", "Sewa Alat", "Cetak Album", "Cetak Foto", "Flashdisk", "Custom", "Operasional Kantor", "Transfer Internal", "Penutupan Anggaran"],
    projectTypes: ["Pernikahan", "Pre-wedding", "Lamaran", "Acara Korporat", "Ulang Tahun"],
    eventTypes: ["Meeting Klien", "Survey Lokasi", "Libur", "Workshop", "Lainnya"],
    assetCategories: ["Kamera", "Lensa", "Drone", "Lighting", "Audio", "Tripod & Stabilizer", "Lainnya"],
    sopCategories: ["Fotografi", "Videografi", "Editing", "Umum", "Layanan Klien"],
    projectStatusConfig: [
        { id: 'status_1', name: 'Tertunda', color: '#eab308', subStatuses: [{ name: 'Menunggu DP', note: 'Klien belum melakukan pembayaran uang muka.'}, { name: 'Jadwal Bentrok', note: 'Perlu koordinasi ulang jadwal dengan klien atau tim.'}], note: 'Proyek yang masih menunggu konfirmasi pembayaran atau penjadwalan ulang.' },
        { id: 'status_3', name: 'Dikonfirmasi', color: '#3b82f6', subStatuses: [{ name: 'DP Lunas', note: 'Uang muka sudah diterima.'}, { name: 'Kontrak Ditandatangani', note: 'Dokumen kontrak sudah disetujui kedua belah pihak.'}], note: 'Proyek siap dieksekusi.' },
        { id: 'status_2', name: 'Persiapan', color: '#6366f1', subStatuses: [{ name: 'Briefing Tim', note: 'Pastikan semua anggota tim memahami rundown dan tugas.'}, { name: 'Survey Lokasi', note: 'Kunjungi lokasi acara untuk perencanaan teknis.'}, { name: 'Cek Peralatan', note: 'Pastikan semua gear dalam kondisi prima dan baterai penuh.'}], note: 'Tahap persiapan sebelum hari H acara.' },
        { id: 'status_4', name: 'Editing', color: '#8b5cf6', subStatuses: [{ name: 'Seleksi Foto', note: 'Memilih foto-foto terbaik dari acara.'}, { name: 'Editing Foto', note: 'Proses color grading dan retouching foto.'}, { name: 'Editing Video', note: 'Menyusun klip video menjadi satu kesatuan cerita.'}, { name: 'Color Grading', note: 'Menyesuaikan warna video agar sinematik.'}], note: 'Proses pasca-produksi sedang berjalan.' },
        { id: 'status_5', name: 'Revisi', color: '#14b8a6', subStatuses: [{ name: 'Revisi Klien 1', note: 'Menerima dan mengerjakan masukan revisi dari klien.'}, { name: 'Revisi Internal', note: 'Pengecekan kualitas internal sebelum finalisasi.'}, { name: 'Finalisasi', note: 'Menyelesaikan sentuhan akhir setelah semua revisi.'}], note: 'Tahap revisi berdasarkan masukan klien atau internal.' },
        { id: 'status_6', name: 'Cetak', color: '#f97316', subStatuses: [{ name: 'Layouting Album', note: 'Menyusun tata letak foto pada album.'}, { name: 'Proses Cetak', note: 'File dikirim ke percetakan.'}, { name: 'Quality Control', note: 'Memeriksa hasil cetakan untuk memastikan kualitas.'}], note: 'Proses pencetakan item fisik.' },
        { id: 'status_7', name: 'Dikirim', color: '#06b6d4', subStatuses: [{ name: 'Packing', note: 'Mengemas hasil fisik dengan aman.'}, { name: 'Dalam Pengiriman', note: 'Paket sudah diserahkan ke kurir.'}], note: 'Hasil fisik sedang dalam perjalanan ke klien.' },
        { id: 'status_8', name: 'Selesai', color: '#10b981', subStatuses: [], note: 'Proyek telah selesai dan semua hasil telah diterima klien.' },
        { id: 'status_9', name: 'Dibatalkan', color: '#ef4444', subStatuses: [], note: 'Proyek dibatalkan oleh klien atau vendor.' },
    ],
    notificationSettings: { newProject: true, paymentConfirmation: true, deadlineReminder: true },
    securitySettings: { twoFactorEnabled: false },
    briefingTemplate: "Tim terbaik! Mari berikan yang terbaik untuk klien kita. Jaga semangat, komunikasi, dan fokus pada detail. Let's create magic!",
    termsAndConditions: `📜 Syarat & Ketentuan Umum

Pemesanan & Pembayaran:
- Pemesanan dianggap sah setelah pembayaran Uang Muka (DP) sebesar 50% dari total biaya.
- Pelunasan sisa pembayaran wajib dilakukan paling lambat 3 (tiga) hari sebelum tanggal acara.
- Semua pembayaran dilakukan melalui transfer ke rekening yang tertera pada invoice.

📅 Jadwal & Waktu Kerja
- Durasi kerja tim sesuai dengan detail yang tertera pada paket yang dipilih.
- Penambahan jam kerja akan dikenakan biaya tambahan per jam.
- Klien wajib memberikan rundown acara yang jelas kepada tim paling lambat 7 (tujuh) hari sebelum acara.

📦 Penyerahan Hasil
- Hasil akhir (foto edit, video, album) akan diserahkan dalam kurun waktu yang tertera pada paket (misal: 30-60 hari kerja).
- Hari kerja tidak termasuk hari Sabtu, Minggu, dan hari libur nasional.
- File mentah (RAW) tidak diberikan kepada klien.
- Hasil digital akan diberikan melalui tautan Google Drive.

➕ Revisi
- Klien berhak mendapatkan 1 (satu) kali revisi minor untuk hasil video (misal: penggantian lagu, pemotongan klip).
- Revisi mayor (perubahan konsep total) akan dikenakan biaya tambahan.
- Revisi tidak berlaku untuk hasil foto, kecuali terdapat kesalahan teknis fatal dari pihak fotografer.

❌ Pembatalan
- Jika pembatalan dilakukan oleh klien, Uang Muka (DP) yang telah dibayarkan tidak dapat dikembalikan.
- Jika pembatalan dilakukan oleh pihak Vena Pictures, seluruh pembayaran yang telah diterima akan dikembalikan 100%.

Lain-lain:
- Vena Pictures tidak bertanggung jawab atas kegagalan pelaksanaan acara yang disebabkan oleh kejadian di luar kendali (bencana alam, kerusuhan, dll.).
- Jika terjadi kerusakan alat yang tidak disengaja, Vena Pictures akan memberikan kompensasi sesuai dengan kesepakatan bersama.
- Hak cipta hasil foto dan video tetap menjadi milik Vena Pictures.
- Vena Pictures berhak menggunakan hasil karya untuk kepentingan portofolio dan promosi di media sosial atau website, kecuali jika ada perjanjian tertulis sebelumnya dengan klien.`,
    contractTemplate: `KONTRAK KERJA
KK/001/MMXXIV

Berikut ini adalah Kontrak Kerja yang dilampirkan oleh VENAPICTURES kepada CLIENT
Para pihak menerangkan terlebih dahulu hal-hal sebagai berikut:
-   Pihak Pertama adalah VENAPICTURES sebagai penyedia layanan dokumentasi pernikahan
-   Pihak Kedua adalah CLIENT atau pemberi kerja kepada pihak pertama
-   Event adalah sesi foto/video apapun yang akan melibatkan Pihak Pertama dan Pihak Kedua
-   Para pihak sepakat untuk menggunakan peraturan yang ada dalam Perjanjian Kerjasama ini

PROSES PENGERJAAN FILE PHOTO DAN VIDEO
Berikut kami sebagai VENAPICTURES melampirkan proses dan waktu dalam pengerjaan file photo dan video :

• WEDDING
| Preview (sampel) photo | 7 hari kerja setelah pemotretan berlangsung |
|---|---|
| Video Teaser | 14 hari kerja setelah pemotretan berlangsung |
| Video Highlight | 30 hari kerja setelah pemotretan berlangsung |
| Final edit photo | 14 hari kerja setelah pemotretan berlangsung |
| Layout draft album | 14 hari kerja setelah pemotretan berlangsung |
| Produksi album + Box | 30-60 hari kerja setelah pihak kedua menyetujui desain album dari pihak pertama |

* Sabtu, Minggu tidak dihitung

• PREWEDDING, ENGAGEMENT, PENGAJIAN SIRAMAN,
| Preview (sampel) photo | 7 hari kerja setelah pemotretan berlangsung |
|---|---|
| Final edit photo | 14 hari kerja setelah pemotretan berlangsung |
| Final Video Teaser | 14 hari kerja setelah pemotretan berlangsung |
| Produksi cetak pembesaran foto | 20 hari kerja setelah pihak kedua memilih foto yang akan dicetak |

* Sabtu, Minggu tidak dihitung

PEMILIHAN MUSIK UNTUK VIDEO
Pemilihan musik sebaiknya dilakukan sebelum hari H event oleh Pihak Kedua, namun apabila sampai dengan H+7 belum ada pemilihan musik, berarti Pihak Kedua telah menyerahkan pemilihan musik sepenuhnya kepada Pihak Pertama.

KELEBIHAN JAM KERJA (EXTRA HOURS)
Berikut adalah rincian biaya mengenai KELEBIHAN JAM KERJA / EXTRA HOURS jika terjadi pada saat proses pemotretan:
| Akad / resepsi saja | Rp 300.000/ jam |
|---|---|
| Engagement | Rp 300.000/ jam |
| Prewedding | Rp 500.000/ jam |
| Studio session | Rp 300.000,-/jam |
| Pengajian siraman | Rp 300.000/ jam |
| Wedding (akad & resepsi) | Rp 400.000/ jam |

Detail jam kerja yang disediakan oleh Pihak Pertama tertera pada pricelist & invoice.

PERIZINAN LOKASI PREWEDDING
PASAL 1
Seluruh paket sesi foto tidak termasuk dengan perias/kostum/perizinan lokasi/properti tambahan diluar properti yang sudah dimiliki Pihak Pertama.
PASAL 2
Terkait perias/kostum/perizinan lokasi/persewaan properti pendukung, Pihak Pertama hanya merekomendasikan kepada Pihak Kedua. Jika diperlukan pemesanan sebelumnya, sepenuhnya dilakukan oleh Pihak Kedua.

KETERLAMBATAN
Jam kerja akan dihitung dari waktu yang sudah disepakati bersama. Pihak Pertama akan memberikan ekstra tambahan jam kerja apabila pihak pertama datang terlambat saat sesi foto berlangsung sesuai dengan jam keterlambatan yang sudah disepakati.
Pihak Pertama akan memberikan charge penambahan ekstra jam kerja kepada Pihak Kedua apabila Pihak Kedua datang terlambat dari jam yang sudah disepakati dengan toleransi waktu 30 menit. Additional charge diberikan sesuai dengan pricelist extra penambahan jam kerja sesuai dengan paket yang dipilih.

KETERIKATAN JUMLAH OUTFIT SAAT SESI PREWEDDING
Jumlah konsep/outfit yang sudah tertera di Invoice bersifat mengikat dan tidak bisa ditambah, sekalipun masih dalam lingkup jam kerja.
Pihak Pertama akan memberikan charge penambahan ekstra outfit sebesar Rp300.000,-/outfit apabila selama sesi prewedding terdapat tambahan outfit.

REVISI
Berikut adalah proses pengerjaan revisi yang kami (Pihak Pertama) lakukan :
REVISI PHOTO DAN VIDEO :
PASAL 1
Pihak Pertama hanya akan memberikan 1x revisi photo dan video kepada Pihak Kedua
PASAL 2
Waktu yang diberikan untuk revisi adalah 7 Hari setelah Pihak Pertama mengirimkan file preview kepada Pihak Kedua, jika lewat dari waktu tersebut maka Pihak Pertama tidak akan memproses pengerjaan revisi yang diajukan oleh Pihak Kedua
PASAL 3
Pihak Pertama hanya menerima revisi dari Pihak Kedua berupa CROP PHOTO, DELETING SCENE, dan TRANSITION EFFECT. Pihak Pertama hanya merevisi warna sesuai dengan tone yang ada di portofolio Pihak Pertama.
PASAL 4
Pihak Pertama TIDAK MENERIMA REVISI BERUPA PENGHILANGAN KERUTAN, PENGHILANGAN TATO, PENGURUSAN ATAU PENGECILAN ANGGOTA BADAN dan hal yang sejenisnya.
PASAL 5
Pihak Pertama tidak menerima revisi perubahan lagu pada backsound video apapun.

REVISI ALBUM
PASAL 1
Pihak Pertama hanya memproses revisi album dengan daftar foto yang sudah terdapat di dalam folder edited photos. Revisi album menggunakan foto selain foto yang sudah diedit akan dikenakan biaya tambahan edit penambahan foto.

CANCELATION PROCESS (PEMBATALAN) DAN PENGGANTIAN JADWAL
Berikut adalah rincian mengenai CANCELATION PROCESS (PEMBATALAN) dan PENGGANTIAN JADWAL :
PASAL 1
Pembatalan yang dilakukan sepihak maka uang muka TIDAK DAPAT DIKEMBALIKAN (non-refundable).

DATA MANAGEMENT
Berikut adalah rincian mengenai Pengelolaan Data:
PASAL 1
Pihak Pertama bertanggung jawab untuk memastikan keamanan dan keselamatan data (baik foto ataupun video) yang diserahkan oleh Pihak Kedua untuk keperluan kerjasama.
Pihak Pertama hanya akan bertanggung jawab terhadap file cloud (Google Drive) Pihak Kedua selama 3 bulan. Setelah 3 bulan Pihak Kedua menerima link Google Drive, maka Pihak Pertama tidak bertanggung jawab lagi untuk cadangan file di Google Drive dikarenakan penyimpanan yang terbatas. Sebaiknya Pihak Kedua segera mengunduh dan menyalin data segera setelah Pihak Pertama memberikan link Google Drive. Pihak Pertama sarankan untuk segera mencadangkan data baik di hard drive maupun di penyimpanan awan Pihak Kedua untuk keamanan tambahan.
Pihak Pertama akan bertanggung jawab apabila terjadi kehilangan pada seluruh data (baik foto ataupun video) yang disebabkan oleh non-human error sebelum file edited selesai/dikirimkan. Apabila dalam waktu 30 hari setelah sesi, seluruh file rusak/hilang, maka Pihak Pertama akan melakukan refund sebesar 70% dari total invoice.
PASAL 2
Pihak Pertama bertanggung jawab untuk menyimpan data pada Pihak Kedua (hard drive) terhitung 3 bulan sejak acara berlangsung.

FORCE MAJEURE
Berikut adalah rincian mengenai FORCE MAJEURE :
PASAL 1
Jika terdapat FORCE MAJEURE saat proses pemotretan maka akan dilakukan PENGATURAN ULANG JADWAL sesuai kesepakatan bersama dalam hal ini antara Pihak Pertama DAN Pihak Kedua TANPA MENGHANGUSKAN DOWN PAYMENT (Uang Muka) yang telah dibayarkan sebelumnya.
PASAL 2
Sehubungan dengan penjelasan yang terdapat dalam PASAL 1 proses pemotretan dilakukan sesuai dengan SISA JAM KERJA.
PASAL 3
Jika FORCE MAJEURE terjadi sebelum dilakukannya proses pemotretan, maka akan dilakukan PENGATURAN ULANG JADWAL sesuai kesepakatan bersama dalam hal ini antara Pihak Pertama DAN Pihak Kedua TANPA MENGHANGUSKAN DOWN PAYMENT (Uang Muka) yang telah dibayarkan sebelumnya.

PENGERJAAN ALBUM
Berikut adalah rincian mengenai Pengerjaan Album Wedding:
PASAL 1
Pihak Pertama mengirimkan draft album Wedding kepada Pihak Kedua dalam kurun waktu 14 hari kerja dari final edit foto dikirimkan.
PASAL 2
Apabila dalam kurun 14 hari dari file draft album dikirim Pihak Pertama tidak mendapatkan respon balik/ daftar revisi dari Pihak Kedua, maka Pihak Pertama akan langsung memproses cetak album wedding dan album yang sudah dalam proses cetak tidak dapat direvisi kembali.

PENYIMPANAN OUTPUT
PASAL 1
Apabila dalam kurun waktu 2 bulan sejak output (frame ataupun album) Pihak Pertama belum menerima konfirmasi pengiriman/pengambilan barang dari Pihak Kedua, maka output diluar tanggung jawab Pihak Pertama.

PENGIRIMAN OUTPUT
Berikut adalah rincian mengenai Pengiriman Output:
PASAL 1
Pihak Pertama tidak bertanggung jawab untuk kondisi output setelah output diletakkan di ekspedisi. Segala bentuk kerusakan oleh pengiriman merupakan resiko dari pihak ekspedisi. Untuk pengiriman.
Pihak Kedua menanggung ongkos kirim pengiriman output yang akan diinfokan di hari pengiriman.

PAYMENT (PEMBAYARAN)
Berikut rincian dari proses PAYMENT (Pembayaran) yang harus dilakukan Pihak Kedua kepada Pihak Pertama
• Down payment 30%
• Full payment H-3

Pihak Kedua hanya melakukan pembayaran ke:
BANK BCA
No Rekening: 4930446411
Atas Nama: BAIHAQI

Demikian rincian Surat Perjanjian Kontrak Kerja yang Pihak Pertama ajukan kepada Pihak Kedua dimohon agar Pihak Kedua membaca baik-baik setiap rincian yang Pihak Pertama sampaikan sebelum menyetujui untuk melakukan kerjasama ini. Terima kasih.

Pihak Pertama,                                Pihak Kedua,



_________________________                       _________________________
BAIHAQI
(FOUNDER VENAPICTURES)
`
};

export const MOCK_SOPS: SOP[] = [
    { id: 'sop-01', title: 'SOP Fotografi Acara Pernikahan', category: 'Fotografi', content: `# SOP Fotografi Acara Pernikahan... (Content unchanged)`, lastUpdated: createMockDate(-5, 1) },
    { id: 'sop-02', title: 'SOP Editing Tone Warna Cinematic', category: 'Editing', content: `# SOP Editing Tone Warna Cinematic... (Content unchanged)`, lastUpdated: createMockDate(-10, 1) },
    { id: 'sop-03', title: 'Prosedur Follow Up Klien', category: 'Layanan Klien', content: `# Prosedur Follow Up Klien\n\n1.  **Follow Up Awal (H+2):** Kirim pesan terima kasih setelah diskusi awal.\n2.  **Follow Up Kedua (H+7):** Tanyakan apakah ada pertanyaan lebih lanjut mengenai penawaran.\n3.  **Follow Up Terakhir (H+14):** Berikan informasi promo atau penawaran khusus jika ada.`, lastUpdated: createMockDate(-2, 5) },
];

export const MOCK_PACKAGES: Package[] = [
    { id: 'pkg-01', name: 'Paket Ruby', price: 12000000, photographers: '2 Fotografer', videographers: '1 Videografer', physicalItems: [{ name: '1 Album (20x30 cm, 20 halaman)', price: 800000 }], digitalItems: ['300 Foto Edit', 'Video Teaser 1 Menit', 'Semua File (Link Drive)'], processingTime: '30 hari kerja', defaultPrintingCost: 800000, defaultTransportCost: 500000 },
    { id: 'pkg-02', name: 'Paket Sapphire', price: 18500000, photographers: '2 Fotografer', videographers: '2 Videografer', physicalItems: [{ name: '1 Album (20x30 cm, 20 halaman, Box)', price: 1200000 }, { name: 'Cetak 4R (20 lembar + Box)', price: 300000 }], digitalItems: ['400 Foto Edit', 'Video Teaser 1 Menit', '3 Menit Cinematic Clip', 'Semua File (USB)'], processingTime: '45 hari kerja', defaultPrintingCost: 1500000, defaultTransportCost: 750000 },
    { id: 'pkg-03', name: 'Paket Emerald', price: 28000000, photographers: '3 Fotografer', videographers: '2 Videografer', physicalItems: [{ name: '1 Album Magazine (30x30 cm, 40 halaman, Box)', price: 2500000 }, { name: 'Cetak 40x60 cm (1 lembar)', price: 750000 }, { name: 'Cetak 4R (40 lembar + Box)', price: 500000 }], digitalItems: ['500 Foto Edit', 'Video Teaser 1 Menit', '5 Menit Cinematic Clip', 'Semua File (USB)'], processingTime: '60 hari kerja', defaultPrintingCost: 3750000, defaultTransportCost: 1000000 },
    { id: 'pkg-04', name: 'Paket Engagement Simple', price: 5000000, photographers: '1 Fotografer', videographers: '1 Videografer', physicalItems: [], digitalItems: ['200 Foto Edit', 'Video Teaser 1 Menit', 'Semua File (Link Drive)'], processingTime: '21 hari kerja', defaultPrintingCost: 0, defaultTransportCost: 400000 },
    { id: 'pkg-05', name: 'Paket Prewedding Classic', price: 7500000, photographers: '2 Fotografer', videographers: '1 Videografer', physicalItems: [{ name: 'Cetak 40x60 cm (2 lembar)', price: 1500000 }], digitalItems: ['150 Foto Edit', 'Video Prewedding 1 Menit', 'Semua File (Link Drive)'], processingTime: '21 hari kerja', defaultPrintingCost: 1500000, defaultTransportCost: 1000000 }
];

export const MOCK_ADDONS: AddOn[] = [
    { id: 'addon-01', name: 'Same Day Edit Video', price: 3500000 },
    { id: 'addon-02', name: 'Sewa Drone', price: 2000000 },
    { id: 'addon-03', name: 'Cetak Kanvas 60x40', price: 750000 },
    { id: 'addon-04', name: 'Jam Liputan Tambahan', price: 1000000 },
];

export const MOCK_PROMO_CODES: PromoCode[] = [
    { id: 'promo-01', code: 'VENA10', discountType: 'percentage', discountValue: 10, isActive: true, usageCount: 0, maxUsage: 10, expiryDate: createMockDate(3, 1), createdAt: createMockDate(-1, 1) },
    { id: 'promo-02', code: 'DISKON500K', discountType: 'fixed', discountValue: 500000, isActive: true, usageCount: 0, maxUsage: null, expiryDate: null, createdAt: createMockDate(-2, 1) },
    { id: 'promo-03', code: 'EXPIRED', discountType: 'percentage', discountValue: 15, isActive: false, usageCount: 5, maxUsage: 5, expiryDate: createMockDate(-1, 1), createdAt: createMockDate(-6, 1) },
];


// --- Core Entities ---
let teamMembersData: TeamMember[] = [
  { id: 'freelancer-01', name: 'Budi Darmawan', role: 'Fotografer', email: 'budi@photographer.com', phone: '081211112222', standardFee: 1500000, noRek: 'BCA 1234567890', rewardBalance: 0, rating: 5, performanceNotes: [{ id: 'pn-01', date: createMockDate(-1, 15), type: PerformanceNoteType.PRAISE, note: 'Komunikasi sangat baik dengan klien di proyek Baskara Corp.' }], portalAccessId: 'portal-budi-123'},
  { id: 'freelancer-02', name: 'Citra Kirana', role: 'Fotografer', email: 'citra@photographer.com', phone: '081233334444', standardFee: 1500000, noRek: 'Mandiri 0987654321', rewardBalance: 0, rating: 4.5, performanceNotes: [], portalAccessId: 'portal-citra-456' },
  { id: 'freelancer-03', name: 'David Setiadi', role: 'Videografer', email: 'david@videographer.com', phone: '081255556666', standardFee: 2000000, noRek: 'BRI 1122334455', rewardBalance: 0, rating: 4, performanceNotes: [{ id: 'pn-02', date: createMockDate(-2, 20), type: PerformanceNoteType.LATE_DEADLINE, note: 'Terlambat 2 hari dalam pengiriman file mentah untuk proyek Dian & Farhan.' }], portalAccessId: 'portal-david-789' },
  { id: 'freelancer-04', name: 'Eka Lestari', role: 'Editor', email: 'eka@editor.com', phone: '081277778888', standardFee: 1000000, noRek: 'BCA 9876543210', rewardBalance: 0, rating: 5, performanceNotes: [], portalAccessId: 'portal-eka-012' },
  { id: 'freelancer-05', name: 'Agung Perkasa', role: 'Videografer', email: 'agung@videographer.com', phone: '081299990000', standardFee: 2000000, noRek: 'BNI 5544332211', rewardBalance: 0, rating: 4, performanceNotes: [], portalAccessId: 'portal-agung-345' },
];

let leadsData: Lead[] = [
  { id: 'lead-01', name: 'Jasmine & Reza', contactChannel: ContactChannel.INSTAGRAM, location: 'Jakarta', status: LeadStatus.CONVERTED, date: createMockDate(0, -20), notes: `Melihat portofolio di IG, tertarik dengan paket Sapphire.`, whatsapp: '081111111111' },
  { id: 'lead-02', name: 'Baskara Corp (Ibu Sarah)', contactChannel: ContactChannel.REFERRAL, location: 'Surabaya', status: LeadStatus.CONVERTED, date: createMockDate(-2, 1), notes: `Referensi dari Hendra Wijaya EO. Butuh dokumentasi untuk acara tahunan.`, whatsapp: '082222222222' },
  { id: 'lead-03', name: 'Lina Amelia', contactChannel: ContactChannel.WHATSAPP, location: 'Bandung', status: LeadStatus.DISCUSSION, date: createMockDate(0, -5), notes: `Menanyakan paket prewedding untuk bulan depan.`, whatsapp: '081298765432' },
  { id: 'lead-04', name: 'Putra Wijaya', contactChannel: ContactChannel.WEBSITE, location: 'Jakarta', status: LeadStatus.REJECTED, date: createMockDate(-1, 10), notes: `Budget tidak sesuai. Ditolak.` },
  { id: 'lead-05', name: 'Rina Hartono', contactChannel: ContactChannel.WEBSITE, location: 'Jakarta', status: LeadStatus.CONVERTED, date: createMockDate(0, -10), notes: `Mengisi form booking online untuk acara lamaran.`, whatsapp: '084444444444'},
  { id: 'lead-06', name: 'Calon Klien Potensial', contactChannel: ContactChannel.INSTAGRAM, location: 'Bali', status: LeadStatus.FOLLOW_UP, date: createMockDate(0, -12), notes: `Menanyakan availability untuk wedding di Bali.`}
];

let clientsData: Client[] = [
  { id: 'client-01', name: 'Jasmine & Reza', email: 'jasmine.reza@email.com', phone: '081111111111', whatsapp: '081111111111', since: createMockDate(0, -20), instagram: '@jasmine.reza', status: ClientStatus.ACTIVE, clientType: ClientType.DIRECT, lastContact: createMockDate(0, -1), portalAccessId: 'portal-jasmine-123' },
  { id: 'client-02', name: 'Baskara Corp', email: 'sarah.baskara@email.com', phone: '082222222222', whatsapp: '082222222222', since: createMockDate(-2, 1), instagram: '@baskaracorp', status: ClientStatus.ACTIVE, clientType: ClientType.VENDOR, lastContact: createMockDate(0, -3), portalAccessId: 'portal-baskara-456' },
  { id: 'client-03', name: 'Dian & Farhan', email: 'dian.farhan@email.com', phone: '083333333333', whatsapp: '083333333333', since: createMockDate(-4, 5), instagram: '@dianfarhan', status: ClientStatus.INACTIVE, clientType: ClientType.DIRECT, lastContact: createMockDate(-1, 10), portalAccessId: 'portal-dian-789' },
  { id: 'client-04', name: 'Rina Hartono', email: 'rina.h@email.com', phone: '084444444444', whatsapp: '084444444444', since: createMockDate(0, -10), instagram: '@rinahartono', status: ClientStatus.ACTIVE, clientType: ClientType.DIRECT, lastContact: createMockDate(0, -2), portalAccessId: 'portal-rina-012' },
];

let projectsData: Project[] = [
    { id: 'project-01', projectName: 'Pernikahan Jasmine & Reza', clientName: 'Jasmine & Reza', clientId: 'client-01', projectType: 'Pernikahan', packageName: 'Paket Sapphire', packageId: 'pkg-02', addOns: [{...MOCK_ADDONS[1]}], date: createMockDate(2, 15), deadlineDate: createMockDate(3, 30), location: 'Hotel Mulia, Jakarta', progress: 25, status: 'Dikonfirmasi', activeSubStatuses: ['DP Lunas'], totalCost: 20500000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'freelancer-01', name: 'Budi Darmawan', role: 'Fotografer', fee: 1750000, reward: 200000 }, { memberId: 'freelancer-02', name: 'Citra Kirana', role: 'Fotografer', fee: 1750000, reward: 200000 }, { memberId: 'freelancer-03', name: 'David Setiadi', role: 'Videografer', fee: 2250000, reward: 250000 }], notes: 'Klien request tone warna yang bright & airy.' },
    { id: 'project-02', projectName: 'Acara Tahunan Baskara Corp', clientName: 'Baskara Corp', clientId: 'client-02', projectType: 'Acara Korporat', packageName: 'Paket Ruby', packageId: 'pkg-01', addOns: [], date: createMockDate(-1, 20), deadlineDate: createMockDate(0, 20), location: 'Ritz-Carlton, Surabaya', progress: 75, status: 'Editing', activeSubStatuses: ['Editing Video'], totalCost: 12000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'freelancer-01', name: 'Budi Darmawan', role: 'Fotografer', fee: 1500000, reward: 150000 }, { memberId: 'freelancer-03', name: 'David Setiadi', role: 'Videografer', fee: 2000000, reward: 200000 }, { memberId: 'freelancer-04', name: 'Eka Lestari', role: 'Editor', fee: 1000000, reward: 100000 }], finalDriveLink: 'https://example.com/final-baskara' },
    { id: 'project-03', projectName: 'Prewedding Dian & Farhan', clientName: 'Dian & Farhan', clientId: 'client-03', projectType: 'Pre-wedding', packageName: 'Paket Prewedding Classic', packageId: 'pkg-05', addOns: [], date: createMockDate(-3, 10), deadlineDate: createMockDate(-2, 10), location: 'Kawah Putih, Bandung', progress: 100, status: 'Selesai', totalCost: 7500000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'freelancer-01', name: 'Budi Darmawan', role: 'Fotografer', fee: 1500000, reward: 150000 }], finalDriveLink: 'https://example.com/final-dian', isEditingConfirmedByClient: true, isPrintingConfirmedByClient: true, isDeliveryConfirmedByClient: true },
    { id: 'project-04', projectName: 'Lamaran Rina Hartono', clientName: 'Rina Hartono', clientId: 'client-04', projectType: 'Lamaran', packageName: 'Paket Engagement Simple', packageId: 'pkg-04', addOns: [], date: createMockDate(0, 7), deadlineDate: createMockDate(1, 1), location: 'Rumah Klien, Jakarta Selatan', progress: 30, status: 'Persiapan', activeSubStatuses: ['Briefing Tim'], totalCost: 5000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'freelancer-02', name: 'Citra Kirana', role: 'Fotografer', fee: 1500000, reward: 100000 }], transportCost: 400000 },
];

const baseTransactions: (Transaction & {teamMemberId?: string})[] = [
    // --- SETUP & INTERNAL TRANSFERS ---
    { id: 'tx-001', date: createMockDate(-6, 1), description: 'Modal Awal Usaha', amount: 50000000, type: TransactionType.INCOME, category: 'Modal', method: 'Sistem', cardId: 'card-01' },
    { id: 'tx-002', date: createMockDate(-5, 5), description: 'Setor ke Dana Darurat', amount: 10000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'card-01', pocketId: 'pocket-01' },
    { id: 'tx-003', date: createMockDate(-5, 6), description: 'Setor ke Beli Kamera Baru', amount: 8000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'card-01', pocketId: 'pocket-02' },
    { id: 'tx-004', date: createMockDate(-1, 1), description: 'Anggaran Operasional Bulanan', amount: 5000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'card-01', pocketId: 'pocket-03' },

    // --- PROJECT 03 (Dian & Farhan, Completed) ---
    { id: 'tx-005', date: createMockDate(-4, 4), description: 'Pelunasan Penuh Proyek Dian & Farhan', amount: 7500000, type: TransactionType.INCOME, projectId: 'project-03', category: 'Pelunasan Proyek', method: 'Transfer Bank', cardId: 'card-01', vendorSignature: VENDOR_SIGNATURE },
    { id: 'tx-006', date: createMockDate(-3, 12), description: 'Gaji Freelancer Budi Darmawan - Proyek Dian', amount: 1500000, type: TransactionType.EXPENSE, projectId: 'project-03', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'card-01', teamMemberId: 'freelancer-01' },
    { id: 'tx-007', date: createMockDate(-3, 12), description: 'Hadiah untuk Budi Darmawan (Proyek: Prewedding Dian & Farhan)', amount: 150000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem', teamMemberId: 'freelancer-01', projectId: 'project-03' },
    { id: 'tx-008', date: createMockDate(-3, 8), description: 'Transportasi & Akomodasi Bandung', amount: 1000000, type: TransactionType.EXPENSE, projectId: 'project-03', category: 'Transportasi', method: 'Tunai', cardId: 'card-cash' },
    { id: 'tx-009', date: createMockDate(-2, 15), description: 'Cetak Kanvas Prewedding Dian', amount: 1500000, type: TransactionType.EXPENSE, projectId: 'project-03', category: 'Cetak Foto', method: 'Kartu', cardId: 'card-visa' },

    // --- PROJECT 02 (Baskara Corp, Editing) ---
    { id: 'tx-010', date: createMockDate(-2, 1), description: 'DP Proyek Baskara Corp', amount: 6000000, type: TransactionType.INCOME, projectId: 'project-02', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'card-02' },
    { id: 'tx-011', date: createMockDate(-1, 18), description: 'Pelunasan Proyek Baskara Corp', amount: 6000000, type: TransactionType.INCOME, projectId: 'project-02', category: 'Pelunasan Proyek', method: 'Transfer Bank', cardId: 'card-01' },
    { id: 'tx-012', date: createMockDate(-1, 22), description: 'Gaji Freelancer Budi Darmawan - Proyek Baskara', amount: 1500000, type: TransactionType.EXPENSE, projectId: 'project-02', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'card-01', teamMemberId: 'freelancer-01' },
    { id: 'tx-013', date: createMockDate(-1, 22), description: 'Gaji Freelancer David Setiadi - Proyek Baskara', amount: 2000000, type: TransactionType.EXPENSE, projectId: 'project-02', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'card-01', teamMemberId: 'freelancer-03' },
    { id: 'tx-014', date: createMockDate(-1, 22), description: 'Gaji Freelancer Eka Lestari - Proyek Baskara', amount: 1000000, type: TransactionType.EXPENSE, projectId: 'project-02', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'card-01', teamMemberId: 'freelancer-04' },
    { id: 'tx-015', date: createMockDate(-1, 22), description: 'Hadiah untuk Budi Darmawan (Proyek: Baskara Corp)', amount: 150000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem', teamMemberId: 'freelancer-01', projectId: 'project-02'},
    { id: 'tx-016', date: createMockDate(-1, 22), description: 'Hadiah untuk David Setiadi (Proyek: Baskara Corp)', amount: 200000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem', teamMemberId: 'freelancer-03', projectId: 'project-02'},
    { id: 'tx-017', date: createMockDate(-1, 22), description: 'Hadiah untuk Eka Lestari (Proyek: Baskara Corp)', amount: 100000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem', teamMemberId: 'freelancer-04', projectId: 'project-02'},

    // --- PROJECT 01 (Jasmine & Reza, Confirmed) ---
    { id: 'tx-018', date: createMockDate(0, -18), description: 'DP Proyek Jasmine & Reza', amount: 10250000, type: TransactionType.INCOME, projectId: 'project-01', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'card-01' },

    // --- PROJECT 04 (Rina Hartono, Preparation) ---
    { id: 'tx-019', date: createMockDate(0, -8), description: 'DP Proyek Rina Hartono', amount: 2500000, type: TransactionType.INCOME, projectId: 'project-04', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'card-02' },
    { id: 'tx-020', date: createMockDate(0, 1), description: 'Transportasi Proyek Rina Hartono', amount: 400000, type: TransactionType.EXPENSE, projectId: 'project-04', category: 'Transportasi', method: 'Sistem', pocketId: 'pocket-03'},

    // --- GENERAL & INTERNAL ---
    { id: 'tx-021', date: createMockDate(0, -15), description: 'Biaya Iklan Instagram', amount: 750000, type: TransactionType.EXPENSE, category: 'Marketing', method: 'Kartu', cardId: 'card-visa' },
    { id: 'tx-022', date: createMockDate(0, -10), description: 'Pembelian ATK Kantor', amount: 500000, type: TransactionType.EXPENSE, category: 'Operasional Kantor', method: 'Sistem', pocketId: 'pocket-03' },
    { id: 'tx-023', date: createMockDate(0, -5), description: 'Penarikan saldo hadiah oleh Budi Darmawan', amount: 300000, type: TransactionType.EXPENSE, category: 'Penarikan Hadiah Freelancer', method: 'Transfer Bank', cardId: 'card-01', teamMemberId: 'freelancer-01' },
];

// --- DERIVED DATA (Calculated from transactions for consistency) ---
projectsData = projectsData.map(p => {
    const amountPaid = baseTransactions.filter(t => t.projectId === p.id && t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    let paymentStatus = PaymentStatus.BELUM_BAYAR;
    if (amountPaid > 0) paymentStatus = amountPaid >= p.totalCost ? PaymentStatus.LUNAS : PaymentStatus.DP_TERBAYAR;
    if (p.totalCost === 0 && amountPaid === 0) paymentStatus = PaymentStatus.LUNAS; // For internal tasks with no cost
    return { ...p, amountPaid, paymentStatus };
});

export const MOCK_REWARD_LEDGER_ENTRIES: RewardLedgerEntry[] = baseTransactions
    .filter(t => (t.category === 'Hadiah Freelancer' || t.category === 'Penarikan Hadiah Freelancer') && t.teamMemberId)
    .map((t, index) => ({
        id: `rle-${index + 1}`, teamMemberId: t.teamMemberId!, date: t.date, description: t.description,
        amount: t.category === 'Penarikan Hadiah Freelancer' ? -t.amount : t.amount, projectId: t.projectId,
    })).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

teamMembersData.forEach(member => {
    member.rewardBalance = MOCK_REWARD_LEDGER_ENTRIES.filter(e => e.teamMemberId === member.id).reduce((sum, e) => sum + e.amount, 0);
});

let cardsData: Card[] = [
  { id: 'card-01', cardHolderName: 'Admin Vena', bankName: 'WBank', cardType: CardType.PRABAYAR, lastFourDigits: '3090', expiryDate: '09/24', balance: 0, colorGradient: 'from-purple-500 to-indigo-600' },
  { id: 'card-02', cardHolderName: 'Admin Vena', bankName: 'WBank', cardType: CardType.PRABAYAR, lastFourDigits: '9800', expiryDate: '04/26', balance: 0, colorGradient: 'from-blue-500 to-cyan-500' },
  { id: 'card-visa', cardHolderName: 'Admin Vena', bankName: 'VISA', cardType: CardType.KREDIT, lastFourDigits: '0032', expiryDate: '09/24', balance: 0, colorGradient: 'from-slate-100 to-slate-300' },
  { id: 'card-cash', cardHolderName: 'Uang Tunai', bankName: 'Tunai', cardType: CardType.DEBIT, lastFourDigits: 'CASH', balance: 0, colorGradient: 'from-emerald-500 to-green-600' },
];

cardsData.forEach(card => {
    card.balance = baseTransactions.reduce((sum, t) => {
        if (t.cardId === card.id) {
            if (t.type === TransactionType.INCOME) return sum + t.amount;
            if (t.type === TransactionType.EXPENSE) return sum - t.amount;
        }
        return sum;
    }, 0);
});

let pocketsData: FinancialPocket[] = [
    { id: 'pocket-01', name: 'Dana Darurat', description: 'Untuk keperluan tak terduga', icon: 'piggy-bank', type: PocketType.SAVING, amount: 0, goalAmount: 50000000, sourceCardId: 'card-01' },
    { id: 'pocket-02', name: 'Beli Kamera Baru', description: 'Upgrade ke Sony A7IV', icon: 'lock', type: PocketType.LOCKED, amount: 0, goalAmount: 35000000, lockEndDate: createMockDate(6, 1), sourceCardId: 'card-01' },
    { id: 'pocket-03', name: `Anggaran Operasional ${new Date().toLocaleString('id-ID', {month: 'long', year: 'numeric'})}`, description: 'Budget untuk pengeluaran rutin', icon: 'clipboard-list', type: PocketType.EXPENSE, amount: 0, goalAmount: 5000000, sourceCardId: 'card-01' },
    { id: 'pocket-04', name: 'Tabungan Hadiah Freelancer', description: 'Total saldo hadiah semua freelancer.', icon: 'star', type: PocketType.REWARD_POOL, amount: 0 },
];

pocketsData.forEach(pocket => {
    pocket.amount = baseTransactions.reduce((sum, t) => {
        if (t.pocketId === pocket.id) {
            if (t.description.startsWith('Setor ke')) return sum + t.amount;
            if (t.type === TransactionType.EXPENSE) return sum - t.amount;
        }
        return sum;
    }, 0);
});
pocketsData.find(p => p.type === PocketType.REWARD_POOL)!.amount = teamMembersData.reduce((sum, m) => sum + m.rewardBalance, 0);

let teamProjectPaymentsData: TeamProjectPayment[] = projectsData.flatMap(p => 
    p.team.map((t, i) => ({
        id: `tpp-${p.id}-${t.memberId}`, projectId: p.id, teamMemberName: t.name, teamMemberId: t.memberId, date: p.date,
        status: 'Unpaid', fee: t.fee, reward: t.reward || 0,
    }))
);
baseTransactions.filter(t => t.category === 'Gaji Freelancer' && t.teamMemberId).forEach(t => {
    const paymentEntry = teamProjectPaymentsData.find(p => p.projectId === t.projectId && p.teamMemberId === t.teamMemberId);
    if (paymentEntry) paymentEntry.status = 'Paid';
});

// --- Final Exports ---
export const MOCK_PROJECTS = projectsData;
export const MOCK_LEADS = leadsData;
export const MOCK_CLIENTS = clientsData;
export const MOCK_TRANSACTIONS = baseTransactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const MOCK_CARDS = cardsData;
export const MOCK_FINANCIAL_POCKETS = pocketsData;
export const MOCK_TEAM_PROJECT_PAYMENTS = teamProjectPaymentsData;
export const MOCK_TEAM_MEMBERS = teamMembersData;

export const MOCK_TEAM_PAYMENT_RECORDS: TeamPaymentRecord[] = [
    { id: 'tpr-01', recordNumber: 'PAY-FR-TM001-2208', teamMemberId: 'freelancer-01', date: createMockDate(-3, 12), projectPaymentIds: ['tpp-project-03-freelancer-01'], totalAmount: 1500000, vendorSignature: VENDOR_SIGNATURE },
    { id: 'tpr-02', recordNumber: 'PAY-FR-ALL-2209', teamMemberId: 'freelancer-01', date: createMockDate(-1, 22), projectPaymentIds: ['tpp-project-02-freelancer-01', 'tpp-project-02-freelancer-03', 'tpp-project-02-freelancer-04'], totalAmount: 4500000 },
];

export const MOCK_ASSETS: Asset[] = [
    { id: 'asset-01', name: 'Sony Alpha 7 IV', category: 'Kamera', purchaseDate: createMockDate(-12, 5), purchasePrice: 38000000, serialNumber: 'SN12345678', status: AssetStatus.AVAILABLE },
    { id: 'asset-02', name: 'Sony FE 24-70mm f/2.8 GM II', category: 'Lensa', purchaseDate: createMockDate(-12, 5), purchasePrice: 32000000, serialNumber: 'SN98765432', status: AssetStatus.IN_USE, notes: 'Digunakan oleh Budi' },
    { id: 'asset-03', name: 'DJI Mavic 3 Pro', category: 'Drone', purchaseDate: createMockDate(-6, 15), purchasePrice: 30000000, serialNumber: 'SNDRONE01', status: AssetStatus.AVAILABLE },
    { id: 'asset-04', name: 'Godox AD200 Pro', category: 'Lighting', purchaseDate: createMockDate(-24, 1), purchasePrice: 5000000, status: AssetStatus.MAINTENANCE, notes: 'Bohlam perlu diganti.' },
    { id: 'asset-05', name: 'Canon EOS R5', category: 'Kamera', purchaseDate: createMockDate(-3, 20), purchasePrice: 60000000, serialNumber: 'SNCANONR5', status: AssetStatus.IN_USE, notes: 'Digunakan oleh Citra' },
];

export const MOCK_CONTRACTS: Contract[] = [
    { id: 'contract-01', contractNumber: 'VP/CTR/2024/001', clientId: 'client-01', projectId: 'project-01', signingDate: createMockDate(0, -15), signingLocation: 'Kantor Vena Pictures', createdAt: createMockDate(0, -15), clientName1: 'Jasmine', clientAddress1: 'Hotel Mulia, Jakarta', clientPhone1: '081111111111', clientName2: 'Reza', clientAddress2: 'Hotel Mulia, Jakarta', clientPhone2: '081111111111', shootingDuration: 'Sesuai detail paket', guaranteedPhotos: '400 Foto Edit', albumDetails: '1 Album (20x30 cm, 20 halaman, Box), Cetak 4R (20 lembar + Box)', digitalFilesFormat: 'Semua File (USB)', otherItems: 'Sewa Drone', personnelCount: '2 Fotografer, 2 Videografer', deliveryTimeframe: '45 hari kerja', dpDate: createMockDate(0, -15), finalPaymentDate: createMockDate(2, 8), cancellationPolicy: 'DP yang sudah dibayarkan tidak dapat dikembalikan.\nJika pembatalan dilakukan H-7 sebelum hari pelaksanaan, PIHAK KEDUA wajib membayar 50% dari total biaya.', jurisdiction: 'Jakarta', vendorSignature: VENDOR_SIGNATURE, clientSignature: CLIENT_SIGNATURE_1 },
];

export const MOCK_CLIENT_FEEDBACK: ClientFeedback[] = [
    { id: 'feedback-01', clientName: 'Dian & Farhan', satisfaction: SatisfactionLevel.VERY_SATISFIED, rating: 5, feedback: 'Tim sangat profesional dan hasilnya luar biasa! Sangat puas dengan pelayanan Vena Pictures.', date: createMockDate(-1, 28) },
    { id: 'feedback-02', clientName: 'Baskara Corp', satisfaction: SatisfactionLevel.SATISFIED, rating: 4, feedback: 'Secara keseluruhan bagus, komunikasinya lancar. Hasilnya juga memuaskan.', date: createMockDate(0, -5) },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'notif-01', title: 'Deadline Mendekat', message: 'Proyek "Lamaran Rina Hartono" akan segera dilaksanakan dalam 7 hari.', timestamp: new Date(new Date().setDate(new Date().getDate() - 0)).toISOString(), isRead: false, icon: 'deadline', link: { view: ViewType.PROJECTS, action: { type: 'VIEW_PROJECT_DETAILS', id: 'project-04' }}},
    { id: 'notif-02', title: 'Prospek Baru Masuk', message: 'Lina Amelia dari WhatsApp, lokasi di Bandung.', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), isRead: false, icon: 'lead', link: { view: ViewType.PROSPEK, action: { type: 'VIEW_LEAD', id: 'lead-03' }}},
    { id: 'notif-03', title: 'Pembayaran Belum Lunas', message: 'Pelunasan untuk proyek "Pernikahan Jasmine & Reza" belum diterima.', timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), isRead: true, icon: 'payment', link: { view: ViewType.CLIENTS, action: { type: 'VIEW_CLIENT_DETAILS', id: 'client-01' }}},
    { id: 'notif-04', title: 'Proyek Selesai', message: 'Proyek "Prewedding Dian & Farhan" telah selesai. Minta feedback klien.', timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(), isRead: true, icon: 'completed', link: { view: ViewType.CLIENTS, action: { type: 'VIEW_CLIENT_DETAILS', id: 'client-03' }}},
];

export const MOCK_SOCIAL_MEDIA_POSTS: SocialMediaPost[] = [
    { id: 'smp-01', projectId: 'project-01', clientName: 'Jasmine & Reza', postType: PostType.INSTAGRAM_REELS, platform: 'Instagram', scheduledDate: createMockDate(0, 7), caption: 'Momen magis dari pernikahan Jasmine & Reza! ✨ #weddingreels #venapictures', mediaUrl: 'https://example.com/reels/jasmine_reza.mp4', status: PostStatus.SCHEDULED, notes: 'Gunakan lagu "Perfect - Ed Sheeran".' },
    { id: 'smp-02', projectId: 'project-03', clientName: 'Dian & Farhan', postType: PostType.INSTAGRAM_FEED, platform: 'Instagram', scheduledDate: createMockDate(-1, 0), caption: 'Menjelajahi keindahan Kawah Putih bersama Dian & Farhan. 🌄 #preweddingbandung #venapictures', mediaUrl: 'https://example.com/feed/dian_farhan.jpg', status: PostStatus.POSTED },
    { id: 'smp-03', projectId: 'project-04', clientName: 'Rina Hartono', postType: PostType.INSTAGRAM_STORY, platform: 'Instagram', scheduledDate: createMockDate(0, 1), caption: 'Behind the scenes lamaran Rina!', status: PostStatus.SCHEDULED, notes: 'Buat polling "Tim lamaran siapa nih?".' },
    { id: 'smp-04', projectId: 'project-02', clientName: 'Baskara Corp', postType: PostType.BLOG, platform: 'Website', scheduledDate: createMockDate(0, 12), caption: 'Tips Dokumentasi Event Korporat yang Profesional', status: PostStatus.DRAFT },
];