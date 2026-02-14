import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseServiceKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test connection
async function testConnection() {
  try {
    console.log('\n✅ Supabase client created');
    
    // Test database
    const { data, error } = await supabase.from('surprises').select('count');
    
    if (error) {
      console.error('❌ Database error:', error.message);
      console.log('\n📝 Action needed:');
      console.log('1. Open Supabase Dashboard');
      console.log('2. Go to SQL Editor');
      console.log('3. Run supabase-schema.sql');
      console.log('4. Run supabase-seed.sql');
      process.exit(1);
    }
    
    console.log('✅ Database connected');
    console.log('✅ Tables exist');
    console.log('\n🎉 Everything is working! Run: npm run dev');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

testConnection();
