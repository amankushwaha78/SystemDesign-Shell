/* 
7️⃣ **Network & DNS**
---------------------
❌ Problem:
Single router or DNS record → all traffic fails if it goes down.

User → DNS down ❌ → can’t even find your app’s IP address.

✅ Solutions:
- Use **redundant network paths & routers**.  
- Use **multi-region DNS providers** with automatic failover.  
- Deploy in **multiple availability zones (AZs)**.
*/

/* 
-----------------------------------------------------------
✅ SOLUTION 1: REDUNDANT NETWORK PATHS & ROUTERS
-----------------------------------------------------------

🧠 Idea:
Use **multiple routers/switches** so traffic can flow 
through another path if one network device fails.

📊 Diagram:
                 🌍  Internet
                      │
      ┌────────────────┴────────────────┐
      ▼                                 ▼
┌───────────────┐               ┌───────────────┐
│ Router #1 🟢  │◀────────────▶ │ Router #2 🟢  │   ← (redundant pair)
└──────┬────────┘               └──────┬────────┘
       │                                 │
       ▼                                 ▼
┌───────────────┐               ┌───────────────┐
│  Switch #1 🟢 │               │  Switch #2 🟢 │
└──────┬────────┘               └──────┬────────┘
       ▼                                 ▼
   ┌────────┐                      ┌────────┐
   │ App #1 │                      │ App #2 │
   └────────┘                      └────────┘

✅ If Router #1 or a link fails → traffic automatically reroutes via Router #2.  
✅ Achieved using BGP or dynamic routing protocols.

🧠 Real-world:
- Dual routers and switches in data centers  
- BGP failover between ISPs  
- AWS multi-AZ VPC networks

✨ Benefit → No single cable, switch, or router can isolate the system.


-----------------------------------------------------------
✅ SOLUTION 2: MULTI-REGION DNS FAILOVER
-----------------------------------------------------------

🧠 Idea:
Host DNS across **multiple regions/providers** so users are 
automatically redirected to a healthy endpoint if one region fails.

📊 Diagram:
              🌍 Users worldwide
                    │
                    ▼
         ┌──────────────────────────────┐
         │     DNS Provider (Route53)   │
         │  Health checks every region  │
         └──────────┬──────────┬────────┘
                    │          │
          ┌─────────▼───┐  ┌───▼────────┐
          │ Region A 🟢 │  │ Region B 🟢 │
          │ (us-east)  │  │ (ap-south)  │
          └────────────┘  └─────────────┘

✅ If Region A goes down, DNS routes traffic to Region B automatically.  
✅ Uses TTL + health check–based routing.  

🧠 Real-world:
- AWS Route53 Latency & Failover Routing  
- Cloudflare GeoDNS  
- Google Cloud DNS with global load balancing  

✨ Benefit → Users always reach the closest healthy region.


-----------------------------------------------------------
✅ SOLUTION 3: MULTI-AZ / MULTI-REGION DEPLOYMENT
-----------------------------------------------------------

🧠 Idea:
Deploy applications across **multiple availability zones** 
within a region to survive a data center outage.

📊 Diagram:
                🌍  Global Users
                      │
                      ▼
            ┌─────────────────────┐
            │   Load Balancer     │
            └─────────┬───────────┘
                 ┌─────┴──────┬──────┐
                 ▼            ▼       ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │  Zone A 🟢  │ │  Zone B 🟢  │ │  Zone C 🟢  │
        │  (App+DB)   │ │  (App+DB)   │ │  (App+DB)   │
        └─────────────┘ └─────────────┘ └─────────────┘

✅ Even if one availability zone (data center) goes down → others stay online.  
✅ Achieved using load balancers + replicated databases.

🧠 Real-world:
- AWS multi-AZ RDS + EC2 deployments  
- GCP multi-zone clusters  
- Kubernetes multi-region federation  

✨ Benefit → Survives regional outages; true high availability.


-----------------------------------------------------------
🧠 REAL-WORLD EXAMPLES
-----------------------------------------------------------
- Netflix → multi-region DNS failover (Route53 + global routing)
- Amazon → redundant routers, multi-AZ networking
- Cloudflare → Anycast routing for low latency and redundancy


-----------------------------------------------------------
🏁 INTERVIEW SUMMARY
-----------------------------------------------------------
💬 “At the Network & DNS layer, avoid SPOF by:
1️⃣ Using redundant routers and network paths,
2️⃣ Using multi-region DNS with health-based failover,
3️⃣ Deploying across multiple availability zones for resilience.”
-----------------------------------------------------------
*/
