/* 
-----------------------------------------------------------
3️⃣ **Load Balancer**
----------------------
❌ Problem:
If you have only one load balancer → it becomes SPOF itself.

User → [❌ Load Balancer Down] → ❌ App unreachable.


✅ Solutions:
- Use **multiple load balancers in active-active or active-passive mode**.  
- Use **DNS-based load balancing** (e.g., Route53, Cloudflare).  
- Use **Health checks + Failover** to switch traffic automatically.

💡 Example:
2 Nginx load balancers behind AWS Route53 with health checks.

*/

/* 
-----------------------------------------------------------
✅ SOLUTION 1: MULTIPLE LOAD BALANCERS (Active–Active)
-----------------------------------------------------------

🧠 Idea → Run 2 or more load balancers in *parallel*.
Both handle live traffic and share the load.  
If one fails → traffic automatically shifts to the other.

📊 Diagram:
              🌍  Users
                   │
                   ▼
         ┌────────────────────────┐
         │  DNS (e.g., Route53)   │
         └──────┬──────────┬──────┘
                │          │
      ┌─────────▼───┐  ┌───▼────────┐
      │ LB #1 (Nginx│  │ LB #2 (HAProxy│
      │ Active)      │  │ Active)       │
      └──────┬───────┘  └────┬─────────┘
             │               │
             ▼               ▼
        ┌────────┐       ┌────────┐
        │ App #1 │       │ App #2 │
        └────────┘       └────────┘

✅ Benefit → Traffic is balanced across multiple LBs.
Even if one LB dies, DNS sends users to the healthy one.

🧠 Real-world:
- AWS Route53 + multiple ALBs  
- Nginx or HAProxy clusters  
- Cloudflare Anycast routing


-----------------------------------------------------------
✅ SOLUTION 2: ACTIVE–PASSIVE LOAD BALANCERS
-----------------------------------------------------------

🧠 Idea → Only one LB (active) handles traffic; 
the other (passive) waits in standby mode.

📊 Diagram:
             🌍 Users
                 │
                 ▼
          ┌────────────┐
          │ Active LB  │  ← Handles all requests
          └──────┬─────┘
                 │
                 ▼
            ┌───────────┐
            │ App Layer │
            └───────────┘
                 ▲
                 │
          ┌──────┴──────┐
          │ Passive LB  │ ← Heartbeat monitor (standby)
          └──────────────┘

✅ Benefit → If Active LB fails, Passive takes over in milliseconds.

🧠 Tools:
- Keepalived (VRRP protocol)  
- AWS Elastic Load Balancer (multi-AZ failover)


-----------------------------------------------------------
✅ SOLUTION 3: DNS-BASED LOAD BALANCING
-----------------------------------------------------------

🧠 Idea → Use a smart DNS service (like Route53 / Cloudflare)
to detect which region or LB is healthy and route users automatically.

📊 Diagram:
              🌍 Users
                  │
                  ▼
           ┌──────────────┐
           │   Route53    │
           │ (Health Check│
           └──────┬───────┘
          /        │        \
         ▼         ▼         ▼
   ┌────────┐ ┌────────┐ ┌────────┐
   │ LB-Asia│ │ LB-US  │ │ LB-EU  │
   └────────┘ └────────┘ └────────┘
       │           │           │
       ▼           ▼           ▼
   🌏 App Servers in each region

✅ Benefit → Global users connect to the nearest healthy region.
✅ Improves performance + fault tolerance.


-----------------------------------------------------------
🧠 REAL-WORLD EXAMPLES
-----------------------------------------------------------
- Netflix → multi-region Route53 + health-checked Elastic LBs  
- AWS → ALB + Route53 DNS failover setup  
- Cloudflare → Anycast routing for automatic regional failover  


-----------------------------------------------------------
🏁 INTERVIEW SUMMARY
-----------------------------------------------------------
💬 “A single load balancer can itself be a SPOF.  
We prevent this by deploying multiple LBs in active-active or active-passive mode,  
using DNS-based load balancing (like Route53 or Cloudflare) and automatic health checks.”
-----------------------------------------------------------
*/
