// Supabase client
const supabaseUrl = "https://gfddpniuwiibvxupoyec.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZGRwbml1d2lpYnZ4dXBveWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk4MTksImV4cCI6MjA3NjI4NTgxOX0.og4lv_pISMIHllvQL6hRT635XKbA69m5Iq2TwTEU-DU";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Функция за запис на име
async function registerUser(name) {
  const { error } = await supabase
    .from("registrations")
    .insert([{ name }]);
  
  if (error) {
    console.error(error);
    alert("❌ Failed to register");
  } else {
    alert("✅ Successfully registered!");
  }
}

// Свързване с формата
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    if (!nameInput) return;

    const name = nameInput.value.trim();
    if (name) {
      await registerUser(name);
      nameInput.value = "";
    }
  });
});
