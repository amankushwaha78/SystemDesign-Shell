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
*/

/* 

1️⃣ REPLICATION (Primary–Replica / Master–Slave)
------------------------------------------------
💡 Purpose → Keep one main database for writes (Primary) and one or more backups (Replicas) for reads or failover.

✅ Use Case:
If the main DB fails, one replica automatically becomes the new Primary.

📊 Diagram:
                 ┌───────────────┐
                 │   Application │
                 └──────┬────────┘
                        │
             ┌──────────▼──────────┐
             │   PRIMARY (Write)   │
             └─────────┬───────────┘
                       │
            Replicates │ Data in real time
                       ▼
             ┌─────────┴──────────┐
             │   REPLICA (Read)   │
             └────────────────────┘

🧠 Example:
- MySQL Master–Slave setup
- MongoDB Replica Set
- PostgreSQL Streaming Replication

✨ Benefit → No downtime on DB crash; replicas take over automatically.


2️⃣ SHARDING (Horizontal Scaling)
---------------------------------
💡 Purpose → Split large database into smaller parts (called shards) to reduce load.

✅ Use Case:
When a single DB grows too big — divide data across multiple DBs.

📊 Diagram:
         ┌──────────────┐
         │ Application  │
         └──────┬───────┘
                │ (router decides)
     ┌──────────┼──────────┬──────────┐
     ▼          ▼          ▼          ▼
 ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
 │Shard 1 │ │Shard 2 │ │Shard 3 │ │Shard 4 │
 │users 1-100│users101-200│users201-300│users301-400│
 └────────┘ └────────┘ └────────┘ └────────┘

🧠 Example:
- MongoDB Sharding
- Cassandra Partition Keys
- MySQL ProxySQL Sharding

✨ Benefit → Faster queries + balanced traffic.


3️⃣ BACKUPS & SNAPSHOTS
------------------------
💡 Purpose → Recover data if DB gets corrupted, deleted, or ransomware hits.

✅ Use Case:
Create regular copies (snapshots) and transaction logs to restore data anytime.

📊 Diagram:
           ┌───────────────┐
           │   PRIMARY DB  │
           └──────┬────────┘
                  │
                  │ 1️⃣ Daily Snapshot
                  ▼
        ┌────────────────────┐
        │  Backup Storage 🗄️ │  ← (e.g., AWS S3)
        └────────────────────┘
                  ▲
                  │ 2️⃣ Restore when crash
                  │
           ┌──────┴────────┐
           │  New DB Ready │
           └───────────────┘

🧠 Example:
- AWS RDS Snapshots
- PostgreSQL PITR (Point-In-Time Recovery)
- MongoDB Ops Manager Backups

✨ Benefit → Recover even if all DB nodes fail.


-----------------------------------------------------------
✅ INTERVIEW SUMMARY
-----------------------------------------------------------
💬 “In database layer, we avoid SPOF by:
1. Using replication for high availability.
2. Using sharding to spread load.
3. Using backups to recover from data loss.”  
-----------------------------------------------------------
*/
