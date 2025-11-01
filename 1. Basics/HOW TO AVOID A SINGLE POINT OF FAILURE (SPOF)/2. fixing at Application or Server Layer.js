/* 
-----------------------------------------------------------
2️⃣ **Application / Server Layer**
----------------------------------
❌ Problem:
One app server → if it crashes, users can’t access app.

✅ Solutions:
- Deploy **multiple servers (stateless architecture)**.  
- Use **Load Balancer** to route requests between servers.  
- Use **Auto-Scaling Groups** (AWS EC2, Kubernetes pods).

💡 Example:
AWS EC2 Auto Scaling launches a new instance if one dies.

*/

/* 
-----------------------------------------------------------
✅ SOLUTION 1: MULTIPLE SERVERS + LOAD BALANCER
-----------------------------------------------------------

🧠 Idea → Run multiple app servers behind a Load Balancer (LB).
If one fails, LB sends traffic to the healthy ones automatically.

📊 Diagram:

           🌍  Users
                │
                ▼
       ┌────────────────┐
       │ Load Balancer  │  ← routes requests
       └──────┬─────────┘
          ┌───┴─────┬────┴───┐
          ▼          ▼        ▼
     ┌────────┐ ┌────────┐ ┌────────┐
     │ App-1  │ │ App-2  │ │ App-3  │   ← identical instances
     └────────┘ └────────┘ └────────┘
          ▲          ▲        ▲
          └──────────┴────────┘
                 (shared DB / cache)

✨ Benefit → If App-2 crashes, traffic auto-redirects to App-1 & App-3.


-----------------------------------------------------------
✅ SOLUTION 2: AUTO-SCALING GROUPS
-----------------------------------------------------------

🧠 Idea → Automatically add or remove servers based on load.

📊 Diagram:

                     ┌─────────────────────────┐
                     │     AWS Auto Scaling    │
                     └───────────┬─────────────┘
                                 │
                     +-----------▼-----------+
                     |    Load Balancer      |
                     +-----------┬-----------+
                                 │
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
        ┌────────┐        ┌────────┐         ┌────────┐
        │ App-1  │        │ App-2  │         │ App-3  │
        └────────┘        └────────┘         └────────┘
                ▲              ▲                   ▲
                │              │                   │
       (CPU/Memory usage monitored by AWS CloudWatch)

🧩 Example: 
- AWS EC2 Auto Scaling Groups  
- Kubernetes ReplicaSets / Deployments  
- Google Cloud Instance Groups  

✨ Benefit → App scales automatically under heavy load.


-----------------------------------------------------------
✅ SOLUTION 3: STATELESS DESIGN
-----------------------------------------------------------

🧠 Idea → Each app instance should handle any request independently.

📊 Diagram:

  ┌──────────────┐      ┌──────────────┐
  │  User Login  │ ───▶ │  App Server  │ →  ✅ Stores session in Redis
  └──────────────┘      └──────────────┘
          │
          ▼
  (Request can go to *any* server next time)

✨ Benefit → No user is “stuck” to one server; easy scaling + failover.


-----------------------------------------------------------
🧠 REAL-WORLD EXAMPLES
-----------------------------------------------------------
🌐 Netflix — uses thousands of microservice containers behind Elastic Load Balancers  
☁️ AWS — uses EC2 Auto Scaling + Elastic Load Balancer (ELB)  
🏢 Google Cloud — Kubernetes Deployments with horizontal pod autoscaling  
*/
