# Evidencia Lab 25 - Event Streaming con Apache Kafka

**Fecha:** 2026-09-01  
**Rama:** `Diego-Tique`  
**Objetivo:** Implementación de un flujo de eventos de dominio con Apache Kafka (KRaft mode), topic con múltiples particiones, serialización JSON con `eventId` y `correlationId`, y balanceo de carga con Consumer Groups.

---

## 1. Arquitectura del Clúster Kafka (`infra/docker-compose.kafka.yml`)

- **Modo:** Apache Kafka KRaft (v4.1.1) sin necesidad de ZooKeeper.
- **Topología de Puertos:** `9092` (Acceso Host), `19092` (Red Docker interna), `19093` (Controller Quorum).
- **Comandos de Administración:**
  ```bash
  # Levantar servicio Kafka
  docker compose -f infra/docker-compose.kafka.yml up -d

  # Crear Topic 'orders.created' con 3 particiones y factor de replicación 1
  docker compose -f infra/docker-compose.kafka.yml exec kafka /opt/kafka/bin/kafka-topics.sh \
    --create --if-not-exists \
    --topic orders.created \
    --bootstrap-server localhost:9092 \
    --partitions 3 \
    --replication-factor 1
  ```

---

## 2. Productor y Consumidor (`templates/fastapi/src/kafka_service.py`)

- **Esquema de Evento (`OrderCreatedEvent`):**
  - Contrato: `eventId`, `correlationId`, `orderId`, `customerEmail`, `amount`, `timestamp`, `eventType`.
- **Garantía de Ordenamiento:** Asignación determinista de partición mediante hashing de clave (`customerEmail`). Todos los eventos de un mismo cliente se enrutan a la misma partición.
- **Escalado por Grupos de Consumo (`orders-workers`):**
  - Múltiples consumidores en el grupo `orders-workers` distribuyen el consumo de las 3 particiones sin duplicar procesamiento.

---

## 3. Pruebas Automatizadas en Pytest (`tests/test_kafka.py`)

```text
tests/test_kafka.py::test_event_schema_and_serialization PASSED
tests/test_kafka.py::test_kafka_producer_partitioning_by_key PASSED
tests/test_kafka.py::test_kafka_consumer_group_processing PASSED

21 passed in 0.54s
```

---

## 4. Conclusión
El flujo de procesamiento de eventos en streaming queda implementado y verificado, asegurando trazabilidad por `correlationId`, paralelismo mediante 3 particiones y tolerancia a fallos.
