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

    // Create user accounts with proper confirmation
    const results = []
    for (const cred of touristCredentials) {
      try {
        const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
          email: cred.email,
          password: cred.password,
          email_confirm: true, // This confirms the email immediately
          user_metadata: {
            tourist_id: cred.tourist_id,
            name: cred.name,
            full_name: cred.name
          }
        })

        if (authError) {
          // Check if user already exists
          if (authError.message.includes('already been registered')) {
            // Try to get existing user and update password
            const { data: existingUser, error: getUserError } = await supabaseClient.auth.admin.getUserById(cred.tourist_id)
            
            if (!getUserError && existingUser) {
              // Update password for existing user
              const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(
                existingUser.user.id,
                { 
                  password: cred.password,
                  email_confirm: true
                }
              )
              
              results.push({
                ...cred,
                success: true,
                user_id: existingUser.user.id,
                action: 'updated'
              })
            } else {
              results.push({
                ...cred,
                success: false,
                error: authError.message
              })
            }
          } else {
            console.error(`Failed to create account for ${cred.name}:`, authError)
            results.push({
              ...cred,
              success: false,
              error: authError.message
            })
          }
        } else {
          results.push({
            ...cred,
            success: true,
            user_id: authData.user?.id,
            action: 'created'
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
        message: 'Tourist accounts processing completed',
        results,
        credentials: touristCredentials,
        summary: {
          total: results.length,
          successful: results.filter(r => r.success).length,
          failed: results.filter(r => !r.success).length
        }
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