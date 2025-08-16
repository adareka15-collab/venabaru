import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  instagram?: string;
  projectType: string;
  location: string;
  date: string;
  packageId: string;
  selectedAddOnIds: string[];
  promoCode?: string;
  dp: number;
  dpPaymentRef: string;
  dpProofUrl?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method === 'POST') {
      const formData: BookingFormData = await req.json();

      // Validate required fields
      if (!formData.clientName || !formData.email || !formData.phone || !formData.packageId) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get package details
      const { data: packageData, error: packageError } = await supabase
        .from('packages')
        .select('*')
        .eq('id', formData.packageId)
        .single();

      if (packageError || !packageData) {
        return new Response(
          JSON.stringify({ error: 'Package not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get add-ons if any
      let addOnsData = [];
      if (formData.selectedAddOnIds.length > 0) {
        const { data: addOns, error: addOnsError } = await supabase
          .from('add_ons')
          .select('*')
          .in('id', formData.selectedAddOnIds);

        if (!addOnsError && addOns) {
          addOnsData = addOns;
        }
      }

      // Calculate total cost
      let totalCost = packageData.price;
      addOnsData.forEach(addon => {
        totalCost += addon.price;
      });

      // Apply promo code if provided
      let discountAmount = 0;
      let promoCodeId = null;
      if (formData.promoCode) {
        const { data: promoCode, error: promoError } = await supabase
          .from('promo_codes')
          .select('*')
          .eq('code', formData.promoCode.toUpperCase())
          .eq('is_active', true)
          .single();

        if (!promoError && promoCode) {
          // Check if promo code is still valid
          const isExpired = promoCode.expiry_date && new Date(promoCode.expiry_date) < new Date();
          const isMaxedOut = promoCode.max_usage && promoCode.usage_count >= promoCode.max_usage;

          if (!isExpired && !isMaxedOut) {
            if (promoCode.discount_type === 'percentage') {
              discountAmount = (totalCost * promoCode.discount_value) / 100;
            } else {
              discountAmount = promoCode.discount_value;
            }
            promoCodeId = promoCode.id;

            // Update usage count
            await supabase
              .from('promo_codes')
              .update({ usage_count: promoCode.usage_count + 1 })
              .eq('id', promoCode.id);
          }
        }
      }

      totalCost -= discountAmount;

      // Create client
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({
          name: formData.clientName,
          email: formData.email,
          phone: formData.phone,
          instagram: formData.instagram,
          status: 'Aktif',
          client_type: 'Langsung',
          last_contact: new Date().toISOString(),
        })
        .select()
        .single();

      if (clientError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create client', details: clientError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create project
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({
          project_name: `Acara ${formData.clientName}`,
          client_id: newClient.id,
          project_type: formData.projectType,
          package_id: formData.packageId,
          add_ons: addOnsData,
          date: formData.date,
          location: formData.location,
          progress: 0,
          status: 'Dikonfirmasi',
          total_cost: totalCost,
          amount_paid: formData.dp,
          payment_status: formData.dp > 0 ? (formData.dp >= totalCost ? 'Lunas' : 'DP Terbayar') : 'Belum Bayar',
          team: [],
          notes: `Referensi Pembayaran DP: ${formData.dpPaymentRef}`,
          promo_code_id: promoCodeId,
          discount_amount: discountAmount > 0 ? discountAmount : null,
          dp_proof_url: formData.dpProofUrl,
        })
        .select()
        .single();

      if (projectError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create project', details: projectError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create lead record
      await supabase
        .from('leads')
        .insert({
          name: formData.clientName,
          contact_channel: 'Website',
          location: formData.location,
          status: 'Dikonversi',
          notes: `Dikonversi secara otomatis dari formulir pemesanan publik. Proyek: ${newProject.project_name}. Klien ID: ${newClient.id}`,
        });

      // Create transaction if DP is paid
      if (formData.dp > 0) {
        await supabase
          .from('transactions')
          .insert({
            date: new Date().toISOString().split('T')[0],
            description: `DP Proyek ${newProject.project_name}`,
            amount: formData.dp,
            type: 'Pemasukan',
            project_id: newProject.id,
            category: 'DP Proyek',
            method: 'Transfer Bank',
          });
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Booking berhasil dibuat',
          data: { client: newClient, project: newProject }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in public-booking function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});