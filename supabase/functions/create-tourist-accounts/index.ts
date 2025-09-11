import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Tourist {
  tourist_id: string;
  name: string;
  citizenship: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get all tourists from the database
    const { data: tourists, error: touristsError } = await supabaseClient
      .from('tourists')
      .select('tourist_id, name, citizenship')

    if (touristsError) {
      throw touristsError
    }

    // Generate email and password for each tourist
    const touristCredentials = tourists.map((tourist: Tourist) => {
      const email = `${tourist.name.toLowerCase().replace(/\s+/g, '.')}@travelsafe.com`
      const password = `${tourist.citizenship}2024!`
      return {
        tourist_id: tourist.tourist_id,
        name: tourist.name,
        email,
        password
      }
    })

    // Create user accounts
    const results = []
    for (const cred of touristCredentials) {
      try {
        const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
          email: cred.email,
          password: cred.password,
          email_confirm: true, // Skip email confirmation
          user_metadata: {
            tourist_id: cred.tourist_id,
            name: cred.name
          }
        })

        if (authError) {
          console.error(`Failed to create account for ${cred.name}:`, authError)
          results.push({
            ...cred,
            success: false,
            error: authError.message
          })
        } else {
          results.push({
            ...cred,
            success: true,
            user_id: authData.user?.id
          })
        }
      } catch (error) {
        console.error(`Error creating account for ${cred.name}:`, error)
        results.push({
          ...cred,
          success: false,
          error: error.message
        })
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Tourist accounts creation completed',
        results,
        credentials: touristCredentials
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})