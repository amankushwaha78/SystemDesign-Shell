/* 
-----------------------------------------------------------
4️⃣ **Cache Layer**
-------------------
❌ Problem:
Single Redis or Memcached node = SPOF → cached data lost if node fails.
App → Redis (Down ❌) → suddenly 100% DB load 😵‍💫

❌ Problem:
If your cache (like Redis or Memcached) runs on a single node and it fails —
➡️ All cached data is lost
➡️ All traffic suddenly hits the database = 🚨 performance bottleneck.

✅ Solutions:
- Use **Redis Cluster** with replication and failover.  
- Use **Consistent Hashing** to distribute cache keys evenly.  
- Keep fallback to DB if cache is unavailable.

*/

/* 
-----------------------------------------------------------
✅ SOLUTION 1: REDIS CLUSTER (Replication + Failover)
-----------------------------------------------------------

🧠 Idea:
Use multiple Redis nodes where each **Master** has a **Replica** (backup).
If a master fails, replica automatically becomes the new master.

📊 Diagram:

             ┌──────────────────────┐
             │     Application      │
             └──────────┬───────────┘
                        │
           ┌────────────┴─────────────┐
           │   Redis Cluster Manager  │
           └──────────┬───────────────┘
                      │
   ┌──────────────────┼────────────────────┐
   ▼                  ▼                    ▼
┌────────┐       ┌────────┐          ┌────────┐
│ Master │       │ Master │          │ Master │
│ Node 1 │       │ Node 2 │          │ Node 3 │
└───┬────┘       └───┬────┘          └───┬────┘
    │                │                   │
    ▼                ▼                   ▼
┌────────┐       ┌────────┐          ┌────────┐
│Replica │       │Replica │          │Replica │
│ Node 1'│       │ Node 2'│          │ Node 3'│
└────────┘       └────────┘          └────────┘

✅ If any master fails → replica takes over automatically (failover).  
✅ Data is replicated across nodes → high availability.  
✅ Cluster distributes keys automatically across shards.

🧠 Real-world:
- Redis Sentinel (handles automatic failover)
- AWS ElastiCache for Redis (multi-AZ replicas)
- Kubernetes StatefulSets with Redis Cluster

✨ Benefit:
No single Redis node can take the entire system down.


-----------------------------------------------------------
✅ SOLUTION 2: CONSISTENT HASHING (Even Key Distribution)
-----------------------------------------------------------

🧠 Idea:
Spread cache keys evenly across multiple cache servers using a hash ring.
If one node fails → only a small portion of keys move to other nodes.

📊 Diagram (Hash Ring):

           (Hash Range 0 → 2³²)
             ┌───────────────🔵───────────────┐
             │                                │
             │   🔴 Cache Node A (0–25%)      │
             │          🔵 Cache Node B (25–50%) │
             │               🔴 Cache Node C (50–75%) │
             │                     🔵 Cache Node D (75–100%) │
             └──────────────────────────────────────────────┘

  Key → hash(userID) % ring_size  
  🔹 hash(“Aman”) → Node B  
  🔹 hash(“Neha”) → Node D  
  🔹 hash(“Raj”)  → Node A  

✅ When a node fails → only affected keys get reassigned (no total cache rebuild).  
✅ Helps in load balancing and scaling cache clusters smoothly.

🧠 Real-world:
- Memcached with Ketama Consistent Hashing  
- Redis Cluster internally uses similar logic for key slots (0–16383)  

✨ Benefit:
Even key distribution + minimal data movement when adding/removing nodes.


-----------------------------------------------------------
✅ SOLUTION 3: FALLBACK MECHANISM
-----------------------------------------------------------

🧠 Idea:
If cache is unavailable → system should gracefully fall back to the database.

📊 Flow Diagram:

         ┌──────────────┐
         │ Application  │
         └──────┬───────┘
                │
         ┌──────▼──────┐
         │   Cache?    │
         └──────┬──────┘
        Yes ✔️  │   │  ❌ No
                │   ▼
          Return Data  ┌──────────────┐
                       │   Database   │
                       └──────┬───────┘
                              ▼
                          Fetch Data
                              │
                              ▼
                          Update Cache 🧠

✅ Ensures continuity of service even when cache layer fails.


-----------------------------------------------------------
🧠 REAL-WORLD EXAMPLES
-----------------------------------------------------------
- Netflix → uses EVCache (multi-node replicated cache)
- Instagram → Redis + Memcached hybrid caching
- Amazon → Elasticache + RDS fallback pattern


-----------------------------------------------------------
🏁 INTERVIEW SUMMARY
-----------------------------------------------------------
💬 “To avoid a cache layer SPOF:
We use Redis clusters with replicas for failover, 
apply consistent hashing for balanced key distribution, 
and design a fallback to DB so the system doesn’t crash if cache goes down.”
-----------------------------------------------------------
*/
