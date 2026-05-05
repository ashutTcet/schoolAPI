const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.supabaseUrl,
  process.env.SUPABASKEY
);

module.exports = supabase;