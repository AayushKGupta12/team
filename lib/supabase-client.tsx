import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://ttmokypbvoquoonaiizb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bW9reXBidm9xdW9vbmFpaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTI0ODgsImV4cCI6MjA4MDUyODQ4OH0.BqhvkamylNnOCqPZsvYz2iT-AJtMxzTKHXdj7oNJrlM"
);
