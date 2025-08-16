import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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

    const url = new URL(req.url);
    const accessId = url.searchParams.get('accessId');

    if (!accessId) {
      return new Response(
        JSON.stringify({ error: 'Access ID required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'GET') {
      // Get client data
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('portal_access_id', accessId)
        .single();

      if (clientError || !client) {
        return new Response(
          JSON.stringify({ error: 'Client not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get client's projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          packages:package_id (*)
        `)
        .eq('client_id', client.id)
        .order('date', { ascending: false });

      if (projectsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch projects', details: projectsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get contracts for this client
      const { data: contracts, error: contractsError } = await supabase
        .from('contracts')
        .select('*')
        .eq('client_id', client.id);

      if (contractsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch contracts', details: contractsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          data: {
            client,
            projects: projects || [],
            contracts: contracts || []
          }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (req.method === 'POST') {
      const { action, data } = await req.json();

      switch (action) {
        case 'confirm_stage':
          const { projectId, stage } = data;
          const updateField = stage === 'editing' ? 'is_editing_confirmed_by_client' :
                             stage === 'printing' ? 'is_printing_confirmed_by_client' :
                             stage === 'delivery' ? 'is_delivery_confirmed_by_client' : null;

          if (!updateField) {
            return new Response(
              JSON.stringify({ error: 'Invalid stage' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const { error: confirmError } = await supabase
            .from('projects')
            .update({ [updateField]: true })
            .eq('id', projectId);

          if (confirmError) {
            return new Response(
              JSON.stringify({ error: 'Failed to confirm stage', details: confirmError.message }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ success: true, message: 'Konfirmasi berhasil' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );

        case 'confirm_sub_status':
          const { projectId: subProjectId, subStatusName, note } = data;

          // Get current project data
          const { data: project, error: projectFetchError } = await supabase
            .from('projects')
            .select('confirmed_sub_statuses, client_sub_status_notes')
            .eq('id', subProjectId)
            .single();

          if (projectFetchError || !project) {
            return new Response(
              JSON.stringify({ error: 'Project not found' }),
              { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const confirmedSubStatuses = [...(project.confirmed_sub_statuses || []), subStatusName];
          const clientSubStatusNotes = { ...(project.client_sub_status_notes || {}), [subStatusName]: note };

          const { error: subStatusError } = await supabase
            .from('projects')
            .update({
              confirmed_sub_statuses: confirmedSubStatuses,
              client_sub_status_notes: clientSubStatusNotes,
            })
            .eq('id', subProjectId);

          if (subStatusError) {
            return new Response(
              JSON.stringify({ error: 'Failed to confirm sub status', details: subStatusError.message }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ success: true, message: 'Konfirmasi sub-status berhasil' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );

        case 'sign_contract':
          const { contractId, signatureDataUrl } = data;

          const { error: signError } = await supabase
            .from('contracts')
            .update({ client_signature: signatureDataUrl })
            .eq('id', contractId);

          if (signError) {
            return new Response(
              JSON.stringify({ error: 'Failed to sign contract', details: signError.message }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ success: true, message: 'Kontrak berhasil ditandatangani' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );

        default:
          return new Response(
            JSON.stringify({ error: 'Invalid action' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in client-portal function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});