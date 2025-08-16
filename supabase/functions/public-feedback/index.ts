import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface FeedbackFormData {
  clientName: string;
  rating: number;
  feedback: string;
}

const getSatisfactionFromRating = (rating: number): string => {
  if (rating >= 5) return 'Sangat Puas';
  if (rating >= 4) return 'Puas';
  if (rating >= 3) return 'Biasa Saja';
  return 'Tidak Puas';
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

    if (req.method === 'POST') {
      const formData: FeedbackFormData = await req.json();

      // Validate required fields
      if (!formData.clientName || !formData.rating || !formData.feedback) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Validate rating range
      if (formData.rating < 1 || formData.rating > 5) {
        return new Response(
          JSON.stringify({ error: 'Rating must be between 1 and 5' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create feedback
      const { data: newFeedback, error: feedbackError } = await supabase
        .from('client_feedback')
        .insert({
          client_name: formData.clientName,
          rating: formData.rating,
          satisfaction: getSatisfactionFromRating(formData.rating),
          feedback: formData.feedback,
        })
        .select()
        .single();

      if (feedbackError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create feedback', details: feedbackError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Feedback berhasil disimpan',
          data: newFeedback
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
    console.error('Error in public-feedback function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});