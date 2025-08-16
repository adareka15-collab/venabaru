import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';
import { 
  Client, Project, TeamMember, Transaction, Package, AddOn, 
  Lead, ClientFeedback, Contract, SocialMediaPost, PromoCode, 
  Asset, SOP, TeamProjectPayment, TeamPaymentRecord, 
  RewardLedgerEntry, FinancialPocket, Card, User, Profile
} from '../types';

// Type conversion helpers
const convertDbClient = (dbClient: Database['public']['Tables']['clients']['Row']): Client => ({
  id: dbClient.id,
  name: dbClient.name,
  email: dbClient.email,
  phone: dbClient.phone,
  whatsapp: dbClient.whatsapp || undefined,
  instagram: dbClient.instagram || undefined,
  since: dbClient.since,
  status: dbClient.status as any,
  clientType: dbClient.client_type as any,
  lastContact: dbClient.last_contact,
  portalAccessId: dbClient.portal_access_id,
});

const convertDbProject = (dbProject: Database['public']['Tables']['projects']['Row']): Project => ({
  id: dbProject.id,
  projectName: dbProject.project_name,
  clientName: '', // Will be populated by join
  clientId: dbProject.client_id,
  projectType: dbProject.project_type,
  packageName: '', // Will be populated by join
  packageId: dbProject.package_id || '',
  addOns: dbProject.add_ons || [],
  date: dbProject.date,
  deadlineDate: dbProject.deadline_date || undefined,
  location: dbProject.location,
  progress: dbProject.progress,
  status: dbProject.status,
  activeSubStatuses: dbProject.active_sub_statuses || [],
  totalCost: dbProject.total_cost,
  amountPaid: dbProject.amount_paid,
  paymentStatus: dbProject.payment_status as any,
  team: dbProject.team || [],
  notes: dbProject.notes || undefined,
  accommodation: dbProject.accommodation || undefined,
  driveLink: dbProject.drive_link || undefined,
  clientDriveLink: dbProject.client_drive_link || undefined,
  finalDriveLink: dbProject.final_drive_link || undefined,
  startTime: dbProject.start_time || undefined,
  endTime: dbProject.end_time || undefined,
  image: dbProject.image || undefined,
  revisions: dbProject.revisions || [],
  promoCodeId: dbProject.promo_code_id || undefined,
  discountAmount: dbProject.discount_amount || undefined,
  shippingDetails: dbProject.shipping_details || undefined,
  dpProofUrl: dbProject.dp_proof_url || undefined,
  printingDetails: dbProject.printing_details || [],
  printingCost: dbProject.printing_cost || undefined,
  transportCost: dbProject.transport_cost || undefined,
  isEditingConfirmedByClient: dbProject.is_editing_confirmed_by_client,
  isPrintingConfirmedByClient: dbProject.is_printing_confirmed_by_client,
  isDeliveryConfirmedByClient: dbProject.is_delivery_confirmed_by_client,
  confirmedSubStatuses: dbProject.confirmed_sub_statuses || [],
  clientSubStatusNotes: dbProject.client_sub_status_notes || {},
  subStatusConfirmationSentAt: dbProject.sub_status_confirmation_sent_at || {},
  completedDigitalItems: dbProject.completed_digital_items || [],
  invoiceSignature: dbProject.invoice_signature || undefined,
  customSubStatuses: dbProject.custom_sub_statuses || [],
});

const convertDbProfile = (dbProfile: Database['public']['Tables']['profiles']['Row']): Profile => ({
  id: dbProfile.id,
  userId: dbProfile.user_id || undefined,
  companyName: dbProfile.company_name,
  fullName: dbProfile.full_name,
  email: dbProfile.email,
  phone: dbProfile.phone,
  website: dbProfile.website || undefined,
  address: dbProfile.address || undefined,
  bankAccount: dbProfile.bank_account || undefined,
  authorizedSigner: dbProfile.authorized_signer || undefined,
  bio: dbProfile.bio || undefined,
  briefingTemplate: dbProfile.briefing_template || undefined,
  termsAndConditions: dbProfile.terms_and_conditions || undefined,
  incomeCategories: dbProfile.income_categories || [],
  expenseCategories: dbProfile.expense_categories || [],
  projectTypes: dbProfile.project_types || [],
  eventTypes: dbProfile.event_types || [],
  assetCategories: dbProfile.asset_categories || [],
  sopCategories: dbProfile.sop_categories || [],
  projectStatusConfig: dbProfile.project_status_config || [],
  notificationSettings: dbProfile.notification_settings || {},
  securitySettings: dbProfile.security_settings || {},
  createdAt: dbProfile.created_at,
  updatedAt: dbProfile.updated_at,
});

// Additional converters for other tables
const convertDbLead = (dbLead: Database['public']['Tables']['leads']['Row']): Lead => ({
  id: dbLead.id,
  name: dbLead.name,
  whatsapp: dbLead.whatsapp || undefined,
  contactChannel: dbLead.contact_channel as any,
  location: dbLead.location,
  status: dbLead.status as any,
  date: dbLead.date,
  notes: dbLead.notes || undefined,
});

const convertDbClientFeedback = (dbFeedback: Database['public']['Tables']['client_feedback']['Row']): ClientFeedback => ({
  id: dbFeedback.id,
  clientName: dbFeedback.client_name,
  rating: dbFeedback.rating,
  satisfaction: dbFeedback.satisfaction as any,
  feedback: dbFeedback.feedback,
  date: dbFeedback.date,
});

export const useSupabaseData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for all data
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clientFeedback, setClientFeedback] = useState<ClientFeedback[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [sops, setSops] = useState<SOP[]>([]);
  const [teamProjectPayments, setTeamProjectPayments] = useState<TeamProjectPayment[]>([]);
  const [teamPaymentRecords, setTeamPaymentRecords] = useState<TeamPaymentRecord[]>([]);
  const [rewardLedgerEntries, setRewardLedgerEntries] = useState<RewardLedgerEntry[]>([]);
  const [pockets, setPockets] = useState<FinancialPocket[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        clientsResult, projectsResult, teamMembersResult, transactionsResult,
        packagesResult, addOnsResult, leadsResult, feedbackResult,
        contractsResult, socialPostsResult, promoCodesResult, assetsResult,
        sopsResult, teamPaymentsResult, paymentRecordsResult,
        rewardEntriesResult, pocketsResult, cardsResult, usersResult,
        profilesResult
      ] = await Promise.all([
        supabase.from('clients').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select(`
          *,
          clients:client_id (name),
          packages:package_id (name)
        `).order('date', { ascending: false }),
        supabase.from('team_members').select('*').order('name'),
        supabase.from('transactions').select('*').order('date', { ascending: false }),
        supabase.from('packages').select('*').order('name'),
        supabase.from('add_ons').select('*').order('name'),
        supabase.from('leads').select('*').order('date', { ascending: false }),
        supabase.from('client_feedback').select('*').order('date', { ascending: false }),
        supabase.from('contracts').select('*').order('created_at', { ascending: false }),
        supabase.from('social_media_posts').select('*').order('scheduled_date', { ascending: false }),
        supabase.from('promo_codes').select('*').order('created_at', { ascending: false }),
        supabase.from('assets').select('*').order('name'),
        supabase.from('sops').select('*').order('title'),
        supabase.from('team_project_payments').select('*').order('date', { ascending: false }),
        supabase.from('team_payment_records').select('*').order('date', { ascending: false }),
        supabase.from('reward_ledger_entries').select('*').order('date', { ascending: false }),
        supabase.from('financial_pockets').select('*').order('name'),
        supabase.from('cards').select('*'),
        supabase.from('users').select('*').order('full_name'),
        supabase.from('profiles').select('*').limit(1),
      ]);

      // Check for errors
      const results = [
        clientsResult, projectsResult, teamMembersResult, transactionsResult,
        packagesResult, addOnsResult, leadsResult, feedbackResult,
        contractsResult, socialPostsResult, promoCodesResult, assetsResult,
        sopsResult, teamPaymentsResult, paymentRecordsResult, rewardEntriesResult,
        pocketsResult, cardsResult, usersResult, profilesResult
      ];

      const firstError = results.find(result => result.error);
      if (firstError?.error) {
        throw new Error(firstError.error.message);
      }

      // Set all data
      setClients(clientsResult.data?.map(convertDbClient) || []);
      setProjects((projectsResult.data || []).map(dbProject => ({
        ...convertDbProject(dbProject),
        clientName: (dbProject as any).clients?.name || 'Unknown Client',
        packageName: (dbProject as any).packages?.name || 'Unknown Package',
      })));

      setTeamMembers((teamMembersResult.data || []).map(tm => ({
        id: tm.id,
        name: tm.name,
        role: tm.role,
        email: tm.email,
        phone: tm.phone,
        standardFee: tm.standard_fee,
        noRek: tm.no_rek || undefined,
        rewardBalance: tm.reward_balance,
        rating: tm.rating,
        performanceNotes: tm.performance_notes || [],
        portalAccessId: tm.portal_access_id,
      })));

      setTransactions((transactionsResult.data || []).map(t => ({
        id: t.id,
        date: t.date,
        description: t.description,
        amount: t.amount,
        type: t.type as any,
        projectId: t.project_id || undefined,
        category: t.category,
        method: t.method as any,
        pocketId: t.pocket_id || undefined,
        cardId: t.card_id || undefined,
        printingItemId: t.printing_item_id || undefined,
        vendorSignature: t.vendor_signature || undefined,
      })));

      setPackages((packagesResult.data || []).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        physicalItems: p.physical_items || [],
        digitalItems: p.digital_items || [],
        processingTime: p.processing_time,
        photographers: p.photographers || undefined,
        videographers: p.videographers || undefined,
      })));

      setAddOns((addOnsResult.data || []).map(a => ({
        id: a.id,
        name: a.name,
        price: a.price,
      })));

      setLeads((leadsResult.data || []).map(convertDbLead));
      setClientFeedback((feedbackResult.data || []).map(convertDbClientFeedback));

      // Set other data arrays (simplified for brevity)
      setContracts(contractsResult.data || []);
      setSocialMediaPosts(socialPostsResult.data || []);
      setPromoCodes(promoCodesResult.data || []);
      setAssets(assetsResult.data || []);
      setSops(sopsResult.data || []);
      setTeamProjectPayments(teamPaymentsResult.data || []);
      setTeamPaymentRecords(paymentRecordsResult.data || []);
      setRewardLedgerEntries(rewardEntriesResult.data || []);
      setPockets(pocketsResult.data || []);
      setCards(cardsResult.data || []);
      setUsers(usersResult.data || []);
      setProfile(profilesResult.data && profilesResult.data.length > 0 ? convertDbProfile(profilesResult.data[0]) : null);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    loading,
    error,
    refetch: fetchAllData,
    // Data
    clients, setClients,
    projects, setProjects,
    teamMembers, setTeamMembers,
    transactions, setTransactions,
    packages, setPackages,
    addOns, setAddOns,
    leads, setLeads,
    clientFeedback, setClientFeedback,
    contracts, setContracts,
    socialMediaPosts, setSocialMediaPosts,
    promoCodes, setPromoCodes,
    assets, setAssets,
    sops, setSops,
    teamProjectPayments, setTeamProjectPayments,
    teamPaymentRecords, setTeamPaymentRecords,
    rewardLedgerEntries, setRewardLedgerEntries,
    pockets, setPockets,
    cards, setCards,
    users, setUsers,
    profile, setProfile,
  };
};