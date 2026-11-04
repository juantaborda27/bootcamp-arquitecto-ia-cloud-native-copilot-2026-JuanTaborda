import json
import uuid
import datetime
from typing import Dict, Any, List, Optional

# Modelo de Evento de Dominio para Kafka (orders.created)
class OrderCreatedEvent:
    def __init__(self, order_id: str, customer_email: str, amount: float, correlation_id: Optional[str] = None):
        self.event_id = str(uuid.uuid4())
        self.correlation_id = correlation_id or str(uuid.uuid4())
        self.order_id = order_id
        self.customer_email = customer_email
        self.amount = amount
        self.timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "eventId": self.event_id,
            "correlationId": self.correlation_id,
            "orderId": self.order_id,
            "customerEmail": self.customer_email,
            "amount": self.amount,
            "timestamp": self.timestamp,
            "eventType": "orders.created"
        }

    def to_json(self) -> str:
        return json.dumps(self.to_dict())

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "OrderCreatedEvent":
        event = cls(
            order_id=data["orderId"],
            customer_email=data["customerEmail"],
            amount=data["amount"],
            correlation_id=data.get("correlationId")
        )
        event.event_id = data.get("eventId", str(uuid.uuid4()))
        event.timestamp = data.get("timestamp", datetime.datetime.now(datetime.timezone.utc).isoformat())
        return event


# Simulador / Productor de Eventos Kafka
class KafkaOrderProducer:
    def __init__(self, bootstrap_servers: str = "localhost:9092", topic: str = "orders.created"):
        self.bootstrap_servers = bootstrap_servers
        self.topic = topic
        self.produced_messages: List[Dict[str, Any]] = []

    def produce(self, event: OrderCreatedEvent, partition_key: Optional[str] = None) -> Dict[str, Any]:
        key = partition_key or event.customer_email
        # Asignación determinista de partición simulada por clave (3 particiones: 0, 1, 2)
        partition = abs(hash(key)) % 3
        record = {
            "topic": self.topic,
            "partition": partition,
            "key": key,
            "value": event.to_dict(),
            "offset": len(self.produced_messages)
        }
        self.produced_messages.append(record)
        return record


# Consumidor de Grupo Kafka (orders-workers)
class KafkaOrderConsumer:
    def __init__(self, group_id: str = "orders-workers", topic: str = "orders.created"):
        self.group_id = group_id
        self.topic = topic
        self.consumed_events: List[Dict[str, Any]] = []

    def consume(self, record: Dict[str, Any]) -> Dict[str, Any]:
        consumed_entry = {
            "groupId": self.group_id,
            "topic": record["topic"],
            "partition": record["partition"],
            "offset": record["offset"],
            "key": record["key"],
            "payload": record["value"],
            "processedAt": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        self.consumed_events.append(consumed_entry)
        return consumed_entry
