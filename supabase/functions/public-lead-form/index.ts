import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface LeadFormData {
  name: string;
  whatsapp: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
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
      const formData: LeadFormData = await req.json();

      // Validate required fields
      if (!formData.name || !formData.whatsapp || !formData.eventType || !formData.eventDate || !formData.eventLocation) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const notes = `Jenis Acara: ${formData.eventType}\nTanggal Acara: ${new Date(formData.eventDate).toLocaleDateString('id-ID')}\nLokasi Acara: ${formData.eventLocation}`;

      // Create lead
      const { data: newLead, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          whatsapp: formData.whatsapp,
          contact_channel: 'Website',
          location: formData.eventLocation,
          status: 'Sedang Diskusi',
          notes: notes,
        })
        .select()
        .single();

      if (leadError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create lead', details: leadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Lead berhasil dibuat',
          data: newLead
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
    console.error('Error in public-lead-form function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});