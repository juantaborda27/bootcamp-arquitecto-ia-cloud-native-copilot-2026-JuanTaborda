import pytest
from src.kafka_service import OrderCreatedEvent, KafkaOrderProducer, KafkaOrderConsumer

def test_event_schema_and_serialization():
    event = OrderCreatedEvent(order_id="ORD-1001", customer_email="diego@globaledb.com", amount=250.50)
    data = event.to_dict()
    
    assert data["orderId"] == "ORD-1001"
    assert data["customerEmail"] == "diego@globaledb.com"
    assert data["amount"] == 250.50
    assert "eventId" in data
    assert "correlationId" in data
    assert data["eventType"] == "orders.created"

def test_kafka_producer_partitioning_by_key():
    producer = KafkaOrderProducer(topic="orders.created")
    
    event1 = OrderCreatedEvent(order_id="ORD-1001", customer_email="user1@globaledb.com", amount=100.0)
    event2 = OrderCreatedEvent(order_id="ORD-1002", customer_email="user1@globaledb.com", amount=200.0)
    
    rec1 = producer.produce(event1, partition_key="user1@globaledb.com")
    rec2 = producer.produce(event2, partition_key="user1@globaledb.com")
    
    # Mensajes con la misma clave deben ir a la misma partición para garantizar ordenamiento
    assert rec1["partition"] == rec2["partition"]
    assert rec1["key"] == rec2["key"]
    assert len(producer.produced_messages) == 2

def test_kafka_consumer_group_processing():
    producer = KafkaOrderProducer(topic="orders.created")
    consumer_w1 = KafkaOrderConsumer(group_id="orders-workers")
    
    event = OrderCreatedEvent(order_id="ORD-1003", customer_email="admin@globaledb.com", amount=500.0)
    record = producer.produce(event)
    
    consumed = consumer_w1.consume(record)
    assert consumed["groupId"] == "orders-workers"
    assert consumed["payload"]["orderId"] == "ORD-1003"
    assert len(consumer_w1.consumed_events) == 1
