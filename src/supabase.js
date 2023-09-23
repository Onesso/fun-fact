import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qmhxysqhbwyvsmxterfy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaHh5c3FoYnd5dnNteHRlcmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNzY4MDEsImV4cCI6MjAwNzc1MjgwMX0.yohFNbZD3Wj2HqvY_iZLEMYPv3NGdJDJQUSJN0yfRxg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
