/* 
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

*/