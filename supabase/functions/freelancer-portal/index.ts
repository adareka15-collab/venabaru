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
      // Get freelancer data
      const { data: freelancer, error: freelancerError } = await supabase
        .from('team_members')
        .select('*')
        .eq('portal_access_id', accessId)
        .single();

      if (freelancerError || !freelancer) {
        return new Response(
          JSON.stringify({ error: 'Freelancer not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get assigned projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .contains('team', [{ memberId: freelancer.id }])
        .order('date', { ascending: false });

      if (projectsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch projects', details: projectsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get payment records
      const { data: teamProjectPayments, error: paymentsError } = await supabase
        .from('team_project_payments')
        .select('*')
        .eq('team_member_id', freelancer.id)
        .order('date', { ascending: false });

      if (paymentsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch payments', details: paymentsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get payment records
      const { data: teamPaymentRecords, error: recordsError } = await supabase
        .from('team_payment_records')
        .select('*')
        .eq('team_member_id', freelancer.id)
        .order('date', { ascending: false });

      if (recordsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch payment records', details: recordsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get SOPs
      const { data: sops, error: sopsError } = await supabase
        .from('sops')
        .select('*')
        .order('title');

      if (sopsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch SOPs', details: sopsError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          data: {
            freelancer,
            projects: projects || [],
            teamProjectPayments: teamProjectPayments || [],
            teamPaymentRecords: teamPaymentRecords || [],
            sops: sops || []
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

      if (action === 'update_revision') {
        const { projectId, revisionId, updatedData } = data;

        // Get current project
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('revisions')
          .eq('id', projectId)
          .single();

        if (projectError || !project) {
          return new Response(
            JSON.stringify({ error: 'Project not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Update revision in the revisions array
        const updatedRevisions = (project.revisions || []).map((r: any) => {
          if (r.id === revisionId) {
            return {
              ...r,
              freelancerNotes: updatedData.freelancerNotes,
              driveLink: updatedData.driveLink,
              status: updatedData.status,
              completedDate: updatedData.status === 'Revisi Selesai' ? new Date().toISOString() : r.completedDate,
            };
          }
          return r;
        });

        const { error: updateError } = await supabase
          .from('projects')
          .update({ revisions: updatedRevisions })
          .eq('id', projectId);

        if (updateError) {
          return new Response(
            JSON.stringify({ error: 'Failed to update revision', details: updateError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Revisi berhasil diperbarui' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in freelancer-portal function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});