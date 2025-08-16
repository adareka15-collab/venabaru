import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface RevisionUpdateData {
  projectId: string;
  revisionId: string;
  freelancerNotes: string;
  driveLink: string;
  status: string;
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

    const url = new URL(req.url);

    if (req.method === 'GET') {
      const projectId = url.searchParams.get('projectId');
      const freelancerId = url.searchParams.get('freelancerId');
      const revisionId = url.searchParams.get('revisionId');

      if (!projectId || !freelancerId || !revisionId) {
        return new Response(
          JSON.stringify({ error: 'Missing required parameters' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get project with revision details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return new Response(
          JSON.stringify({ error: 'Project not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get freelancer details
      const { data: freelancer, error: freelancerError } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', freelancerId)
        .single();

      if (freelancerError || !freelancer) {
        return new Response(
          JSON.stringify({ error: 'Freelancer not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Find the specific revision
      const revision = (project.revisions || []).find((r: any) => r.id === revisionId && r.freelancerId === freelancerId);

      if (!revision) {
        return new Response(
          JSON.stringify({ error: 'Revision not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          data: {
            project,
            freelancer,
            revision
          }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (req.method === 'POST') {
      const updateData: RevisionUpdateData = await req.json();

      // Validate required fields
      if (!updateData.projectId || !updateData.revisionId || !updateData.driveLink) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get current project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('revisions')
        .eq('id', updateData.projectId)
        .single();

      if (projectError || !project) {
        return new Response(
          JSON.stringify({ error: 'Project not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update revision in the revisions array
      const updatedRevisions = (project.revisions || []).map((r: any) => {
        if (r.id === updateData.revisionId) {
          return {
            ...r,
            freelancerNotes: updateData.freelancerNotes,
            driveLink: updateData.driveLink,
            status: updateData.status,
            completedDate: updateData.status === 'Revisi Selesai' ? new Date().toISOString() : r.completedDate,
          };
        }
        return r;
      });

      const { error: updateError } = await supabase
        .from('projects')
        .update({ revisions: updatedRevisions })
        .eq('id', updateData.projectId);

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
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in revision-form function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});