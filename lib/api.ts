import { supabase } from './supabase';

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

// Helper function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
};

// Public Booking Form API
export const submitBookingForm = async (formData: any) => {
  return apiCall('public-booking', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Public Lead Form API
export const submitLeadForm = async (formData: any) => {
  return apiCall('public-lead-form', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Public Feedback Form API
export const submitFeedbackForm = async (formData: any) => {
  return apiCall('public-feedback', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Suggestion Form API
export const submitSuggestionForm = async (formData: any) => {
  return apiCall('suggestion-form', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Client Portal API
export const getClientPortalData = async (accessId: string) => {
  return apiCall(`client-portal?accessId=${accessId}`);
};

export const clientPortalAction = async (accessId: string, action: string, data: any) => {
  return apiCall(`client-portal?accessId=${accessId}`, {
    method: 'POST',
    body: JSON.stringify({ action, data }),
  });
};

// Freelancer Portal API
export const getFreelancerPortalData = async (accessId: string) => {
  return apiCall(`freelancer-portal?accessId=${accessId}`);
};

export const freelancerPortalAction = async (accessId: string, action: string, data: any) => {
  return apiCall(`freelancer-portal?accessId=${accessId}`, {
    method: 'POST',
    body: JSON.stringify({ action, data }),
  });
};

// Revision Form API
export const getRevisionData = async (projectId: string, freelancerId: string, revisionId: string) => {
  return apiCall(`revision-form?projectId=${projectId}&freelancerId=${freelancerId}&revisionId=${revisionId}`);
};

export const updateRevision = async (updateData: any) => {
  return apiCall('revision-form', {
    method: 'POST',
    body: JSON.stringify(updateData),
  });
};

// Database operations for authenticated users
export const dbOperations = {
  // Generic CRUD operations
  async create(table: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async read(table: string, filters?: any) {
    let query = supabase.from(table).select('*');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(table: string, id: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(table: string, id: string) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Specific operations
  async getPackagesAndAddOns() {
    const [packagesResult, addOnsResult] = await Promise.all([
      supabase.from('packages').select('*'),
      supabase.from('add_ons').select('*')
    ]);

    if (packagesResult.error) throw packagesResult.error;
    if (addOnsResult.error) throw addOnsResult.error;

    return {
      packages: packagesResult.data || [],
      addOns: addOnsResult.data || []
    };
  },

  async getPromoCode(code: string) {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  },

  // CRUD Operations for Clients
  async createClient(data: any) {
    return this.create('clients', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      since: data.since || new Date().toISOString().split('T')[0],
      status: data.status || 'Aktif',
      client_type: data.clientType || 'Langsung',
      last_contact: data.lastContact || new Date().toISOString(),
    });
  },

  async updateClient(id: string, data: any) {
    return this.update('clients', id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      since: data.since,
      status: data.status,
      client_type: data.clientType,
      last_contact: data.lastContact,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Projects
  async createProject(data: any) {
    return this.create('projects', {
      project_name: data.projectName,
      client_id: data.clientId,
      project_type: data.projectType,
      package_id: data.packageId,
      add_ons: data.addOns || [],
      date: data.date,
      deadline_date: data.deadlineDate,
      location: data.location,
      progress: data.progress || 0,
      status: data.status || 'Dikonfirmasi',
      active_sub_statuses: data.activeSubStatuses || [],
      total_cost: data.totalCost || 0,
      amount_paid: data.amountPaid || 0,
      payment_status: data.paymentStatus || 'Belum Bayar',
      team: data.team || [],
      notes: data.notes,
      accommodation: data.accommodation,
      drive_link: data.driveLink,
      client_drive_link: data.clientDriveLink,
      final_drive_link: data.finalDriveLink,
      start_time: data.startTime,
      end_time: data.endTime,
      image: data.image,
      revisions: data.revisions || [],
      promo_code_id: data.promoCodeId,
      discount_amount: data.discountAmount,
      shipping_details: data.shippingDetails,
      dp_proof_url: data.dpProofUrl,
      printing_details: data.printingDetails || [],
      printing_cost: data.printingCost,
      transport_cost: data.transportCost,
      is_editing_confirmed_by_client: data.isEditingConfirmedByClient || false,
      is_printing_confirmed_by_client: data.isPrintingConfirmedByClient || false,
      is_delivery_confirmed_by_client: data.isDeliveryConfirmedByClient || false,
      confirmed_sub_statuses: data.confirmedSubStatuses || [],
      client_sub_status_notes: data.clientSubStatusNotes || {},
      sub_status_confirmation_sent_at: data.subStatusConfirmationSentAt || {},
      completed_digital_items: data.completedDigitalItems || [],
      invoice_signature: data.invoiceSignature,
      custom_sub_statuses: data.customSubStatuses || [],
    });
  },

  async updateProject(id: string, data: any) {
    return this.update('projects', id, {
      project_name: data.projectName,
      client_id: data.clientId,
      project_type: data.projectType,
      package_id: data.packageId,
      add_ons: data.addOns,
      date: data.date,
      deadline_date: data.deadlineDate,
      location: data.location,
      progress: data.progress,
      status: data.status,
      active_sub_statuses: data.activeSubStatuses,
      total_cost: data.totalCost,
      amount_paid: data.amountPaid,
      payment_status: data.paymentStatus,
      team: data.team,
      notes: data.notes,
      accommodation: data.accommodation,
      drive_link: data.driveLink,
      client_drive_link: data.clientDriveLink,
      final_drive_link: data.finalDriveLink,
      start_time: data.startTime,
      end_time: data.endTime,
      image: data.image,
      revisions: data.revisions,
      promo_code_id: data.promoCodeId,
      discount_amount: data.discountAmount,
      shipping_details: data.shippingDetails,
      dp_proof_url: data.dpProofUrl,
      printing_details: data.printingDetails,
      printing_cost: data.printingCost,
      transport_cost: data.transportCost,
      is_editing_confirmed_by_client: data.isEditingConfirmedByClient,
      is_printing_confirmed_by_client: data.isPrintingConfirmedByClient,
      is_delivery_confirmed_by_client: data.isDeliveryConfirmedByClient,
      confirmed_sub_statuses: data.confirmedSubStatuses,
      client_sub_status_notes: data.clientSubStatusNotes,
      sub_status_confirmation_sent_at: data.subStatusConfirmationSentAt,
      completed_digital_items: data.completedDigitalItems,
      invoice_signature: data.invoiceSignature,
      custom_sub_statuses: data.customSubStatuses,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Team Members
  async createTeamMember(data: any) {
    return this.create('team_members', {
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      standard_fee: data.standardFee || 0,
      no_rek: data.noRek,
      reward_balance: data.rewardBalance || 0,
      rating: data.rating || 5.0,
      performance_notes: data.performanceNotes || [],
    });
  },

  async updateTeamMember(id: string, data: any) {
    return this.update('team_members', id, {
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      standard_fee: data.standardFee,
      no_rek: data.noRek,
      reward_balance: data.rewardBalance,
      rating: data.rating,
      performance_notes: data.performanceNotes,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Transactions
  async createTransaction(data: any) {
    return this.create('transactions', {
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description,
      amount: data.amount,
      type: data.type,
      project_id: data.projectId,
      category: data.category,
      method: data.method || 'Transfer Bank',
      pocket_id: data.pocketId,
      card_id: data.cardId,
      printing_item_id: data.printingItemId,
      vendor_signature: data.vendorSignature,
    });
  },

  async updateTransaction(id: string, data: any) {
    return this.update('transactions', id, {
      date: data.date,
      description: data.description,
      amount: data.amount,
      type: data.type,
      project_id: data.projectId,
      category: data.category,
      method: data.method,
      pocket_id: data.pocketId,
      card_id: data.cardId,
      printing_item_id: data.printingItemId,
      vendor_signature: data.vendorSignature,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Packages
  async createPackage(data: any) {
    return this.create('packages', {
      name: data.name,
      price: data.price || 0,
      physical_items: data.physicalItems || [],
      digital_items: data.digitalItems || [],
      processing_time: data.processingTime || '30 hari kerja',
      photographers: data.photographers,
      videographers: data.videographers,
    });
  },

  async updatePackage(id: string, data: any) {
    return this.update('packages', id, {
      name: data.name,
      price: data.price,
      physical_items: data.physicalItems,
      digital_items: data.digitalItems,
      processing_time: data.processingTime,
      photographers: data.photographers,
      videographers: data.videographers,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Add-ons
  async createAddOn(data: any) {
    return this.create('add_ons', {
      name: data.name,
      price: data.price || 0,
    });
  },

  async updateAddOn(id: string, data: any) {
    return this.update('add_ons', id, {
      name: data.name,
      price: data.price,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Leads
  async createLead(data: any) {
    return this.create('leads', {
      name: data.name,
      whatsapp: data.whatsapp,
      contact_channel: data.contactChannel,
      location: data.location,
      status: data.status || 'Sedang Diskusi',
      date: data.date || new Date().toISOString().split('T')[0],
      notes: data.notes,
    });
  },

  async updateLead(id: string, data: any) {
    return this.update('leads', id, {
      name: data.name,
      whatsapp: data.whatsapp,
      contact_channel: data.contactChannel,
      location: data.location,
      status: data.status,
      date: data.date,
      notes: data.notes,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for Assets
  async createAsset(data: any) {
    return this.create('assets', {
      name: data.name,
      category: data.category,
      purchase_date: data.purchaseDate,
      purchase_price: data.purchasePrice || 0,
      serial_number: data.serialNumber,
      status: data.status || 'Tersedia',
      notes: data.notes,
    });
  },

  async updateAsset(id: string, data: any) {
    return this.update('assets', id, {
      name: data.name,
      category: data.category,
      purchase_date: data.purchaseDate,
      purchase_price: data.purchasePrice,
      serial_number: data.serialNumber,
      status: data.status,
      notes: data.notes,
      updated_at: new Date().toISOString(),
    });
  },

  // CRUD Operations for SOPs
  async createSOP(data: any) {
    return this.create('sops', {
      title: data.title,
      category: data.category,
      content: data.content,
      last_updated: new Date().toISOString(),
    });
  },

  async updateSOP(id: string, data: any) {
    return this.update('sops', id, {
      title: data.title,
      category: data.category,
      content: data.content,
      last_updated: new Date().toISOString(),
    });
  },

  // CRUD Operations for Profile
  async updateProfile(id: string, data: any) {
    return this.update('profiles', id, {
      company_name: data.companyName,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: data.address,
      bank_account: data.bankAccount,
      authorized_signer: data.authorizedSigner,
      bio: data.bio,
      briefing_template: data.briefingTemplate,
      terms_and_conditions: data.termsAndConditions,
      income_categories: data.incomeCategories,
      expense_categories: data.expenseCategories,
      project_types: data.projectTypes,
      event_types: data.eventTypes,
      asset_categories: data.assetCategories,
      sop_categories: data.sopCategories,
      project_status_config: data.projectStatusConfig,
      notification_settings: data.notificationSettings,
      security_settings: data.securitySettings,
      updated_at: new Date().toISOString(),
    });
  }
};