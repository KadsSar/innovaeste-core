import time
from supabase import create_client, Client

# --- YOUR KEYS GO HERE ---
url: str = "https://ccfzvfnwfkunudranptl.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZnp2Zm53Zmt1bnVkcmFucHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTY3NTUsImV4cCI6MjA5MDA3Mjc1NX0.hmh7jBZU8PKRk5cJt0mHABoYeeLZPWo0faMvJKgmkfU" 
# -------------------------

print("🔌 Connecting to Innovaeste Database...")
supabase: Client = create_client(url, key)

def route_task(text):
    text = text.lower()
    
    if any(word in text for word in ["wi-fi", "internet", "router", "laptop", "tv"]):
        return "IT / Network", "In Progress"
    elif any(word in text for word in ["towel", "coffee", "water", "room service", "sheets", "clean"]):
        return "Robotics Unit 01", "Resolved"
    else:
        return "Housekeeping", "Resolved"

print("🧠 Innovaeste AI Brain is online. Listening for tasks...")
print("-" * 50)

while True:
    try:
        response = supabase.table("service_requests").select("*").eq("status", "pending").execute()
        tasks = response.data

        for task in tasks:
            print(f"🔔 NEW TASK DETECTED: '{task['guest_text']}'")
            
            # --- STEP 1: TELL THE DASHBOARD WE ARE THINKING ---
            supabase.table("service_requests").update({
                "assigned_to": "AI Thinking...",
                "status": "Assigning..."
            }).eq("id", task["id"]).execute()
            
            # --- DRAMATIC PAUSE (2 SECONDS) ---
            print("🧠 AI is analyzing request...")
            time.sleep(2)

            # --- STEP 2: MAKE THE FINAL DECISION ---
            assigned_to, new_status = route_task(task['guest_text'])
            print(f"🤖 Routing to: {assigned_to}...")

            supabase.table("service_requests").update({
                "assigned_to": assigned_to,
                "status": new_status,
                "intent_category": "Auto-Routed"
            }).eq("id", task["id"]).execute()

            print("✅ Database updated successfully!\n")

    except Exception as e:
        print(f"Error checking database: {e}")

    time.sleep(2)