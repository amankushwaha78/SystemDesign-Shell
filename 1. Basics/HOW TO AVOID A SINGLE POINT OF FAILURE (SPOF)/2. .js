/* 
===========================================================
💡 HOW TO AVOID A SINGLE POINT OF FAILURE (SPOF)
===========================================================

🧠 What is a Single Point of Failure (SPOF)?
-------------------------------------------
A **Single Point of Failure** is any **component in a system whose failure 
will stop the entire system from working**.

If that one part fails → the whole service goes down 🚨

💡 Example:
If your app has **only one database**, and it crashes → your whole site fails.  
That database is a *single point of failure.*

-----------------------------------------------------------
⚙️ GOAL
-----------------------------------------------------------
➡️ Design the system so that **failure of one part doesn’t stop everything**.  
➡️ Achieve **high availability, reliability, and fault tolerance.**

-----------------------------------------------------------
🧩 COMMON SPOF AREAS & HOW TO FIX THEM
-----------------------------------------------------------

1️⃣ **Database Layer**
----------------------
❌ Problem:
Single database instance = SPOF.

✅ Solutions:
- **Replication** → Add a standby replica (Master–Slave / Primary–Replica).  
  - If primary fails, replica takes over (automatic failover).  
- **Sharding** → Split data across multiple DBs to reduce load.  
- **Backups & snapshots** → Recover fast from data loss.

💡 Example:
MongoDB Replica Set → 1 Primary + 2 Secondary nodes.

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

-----------------------------------------------------------
3️⃣ **Load Balancer**
----------------------
❌ Problem:
If you have only one load balancer → it becomes SPOF itself.

✅ Solutions:
- Use **multiple load balancers in active-active or active-passive mode**.  
- Use **DNS-based load balancing** (e.g., Route53, Cloudflare).  
- Use **Health checks + Failover** to switch traffic automatically.

💡 Example:
2 Nginx load balancers behind AWS Route53 with health checks.

-----------------------------------------------------------
4️⃣ **Cache Layer**
-------------------
❌ Problem:
Single Redis or Memcached node = SPOF → cached data lost if node fails.

✅ Solutions:
- Use **Redis Cluster** with replication and failover.  
- Use **Consistent Hashing** to distribute cache keys evenly.  
- Keep fallback to DB if cache is unavailable.

-----------------------------------------------------------
5️⃣ **Message Queue or Broker**
-------------------------------
❌ Problem:
Single RabbitMQ / Kafka broker fails → messages lost or delayed.

✅ Solutions:
- Use **clustered brokers** with replication.  
- Use **acknowledgments + persistent queues** for durability.  
- Keep **DLQ (Dead Letter Queue)** for failed messages.

💡 Example:
Kafka cluster → multiple brokers + ZooKeeper for coordination.

-----------------------------------------------------------
6️⃣ **Storage / File System**
-----------------------------
❌ Problem:
Single storage node → data loss or service failure.

✅ Solutions:
- Use **distributed storage systems** like Amazon S3, HDFS, Ceph.  
- Enable **data replication across availability zones**.  
- Use **RAID arrays** for disk-level redundancy.

-----------------------------------------------------------
7️⃣ **Network & DNS**
---------------------
❌ Problem:
Single router or DNS record → all traffic fails if it goes down.

✅ Solutions:
- Use **redundant network paths & routers**.  
- Use **multi-region DNS providers** with automatic failover.  
- Deploy in **multiple availability zones (AZs)**.

-----------------------------------------------------------
🧭 REAL-WORLD EXAMPLES
-----------------------------------------------------------
🌐 Netflix → multi-region failover using AWS Route53 + Chaos Engineering  
☁️ Amazon → replicas in 3 AZs per region for every critical service  
💬 WhatsApp → multiple message servers across data centers  

-----------------------------------------------------------
⚖️ SUMMARY TABLE
-----------------------------------------------------------

| Layer | SPOF Example | Fix / Solution |
|--------|---------------|----------------|
| Database | One DB instance | Replication, Failover |
| Application | One app server | Load balancer + Auto-scaling |
| Load Balancer | One load balancer | DNS-level failover, multiple LB nodes |
| Cache | Single Redis node | Redis Cluster, Replication |
| Message Queue | One Kafka broker | Clustered brokers, persistence |
| Storage | One disk/server | Replicated distributed storage |
| Network | One router/DNS | Multi-region redundancy |

-----------------------------------------------------------
🧠 GENERAL STRATEGIES TO AVOID SPOF
-----------------------------------------------------------

✅ 1. **Redundancy** → Duplicate critical components (servers, DBs).  
✅ 2. **Failover Mechanisms** → Detect failure & switch automatically.  
✅ 3. **Health Checks** → Monitor services continuously.  
✅ 4. **Stateless Design** → So any node can replace another.  
✅ 5. **Distributed Clusters** → Use multiple nodes per layer.  
✅ 6. **Geo-Replication** → Deploy across regions & zones.  
✅ 7. **Chaos Testing** → (Netflix “Chaos Monkey”) test failures regularly.

-----------------------------------------------------------
🏁 TL;DR (INTERVIEW SUMMARY)
-----------------------------------------------------------
💬 “To avoid a Single Point of Failure, make every layer redundant —
use replication, clustering, and failover.  
Each component (DB, server, cache, network) should have a backup instance
so that if one fails, another takes over automatically.”
*/