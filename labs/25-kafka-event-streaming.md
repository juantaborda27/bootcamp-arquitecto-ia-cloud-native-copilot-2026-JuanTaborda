# Lab 25 - Event Streaming con Apache Kafka

## Objetivo
Implementar un flujo de eventos con Apache Kafka usando topic, productor y consumidor
en consumer group para simular un escenario real de integración entre servicios.

## Resultado esperado
- Publicación de eventos de dominio en Kafka.
- Consumo escalable por grupos.
- Trazabilidad por `eventId` y `correlationId`.

## Prerrequisitos
- Docker y Docker Compose.
- Lab 24 completado.
- API .NET, FastAPI o NestJS disponible para integrar productor.

## Paso a paso

### 1. Levantar Kafka local
Usa `infra/docker-compose.kafka.yml`, basado en Kafka KRaft y sin dependencia de ZooKeeper:

```bash
docker compose -f infra/docker-compose.kafka.yml config --quiet
docker compose -f infra/docker-compose.kafka.yml up -d
docker compose -f infra/docker-compose.kafka.yml ps
```

### 2. Crear topic
```bash
docker compose -f infra/docker-compose.kafka.yml exec kafka /opt/kafka/bin/kafka-topics.sh --create --if-not-exists \
  --topic orders.created --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

### 3. Implementar productor (ejemplo .NET)
```bash
dotnet add package Confluent.Kafka
```
```csharp
var config = new ProducerConfig { BootstrapServers = "localhost:9092" };
using var producer = new ProducerBuilder<Null, string>(config).Build();
await producer.ProduceAsync("orders.created", new Message<Null, string> { Value = eventJson });
```

### 4. Implementar consumidor con group
```csharp
var config = new ConsumerConfig
{
    BootstrapServers = "localhost:9092",
    GroupId = "orders-workers",
    AutoOffsetReset = AutoOffsetReset.Earliest
};
using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
consumer.Subscribe("orders.created");
```

### 5. Probar escalado de consumo
- Ejecutar dos instancias del consumidor con mismo `GroupId`.
- Verificar reparto de particiones.

### 6. Validar orden por clave
Publicar mensajes con la misma key y verificar orden dentro de una partición.

## Comandos sugeridos
```bash
git checkout -b lab-25
git commit -m "lab25: Event Streaming con Apache Kafka"
git push origin lab-25
```


## Validación
- Topic creado con 3 particiones.
- Productor publica eventos sin errores.
- Consumidores en grupo procesan eventos repartidos.
- Se evidencia al menos un caso de relectura desde offset.

## Rubrica
- 40% productor/consumidor funcional con topic real.
- 30% uso correcto de particiones, keys y consumer groups.
- 30% evidencia de pruebas y trazabilidad.

## Entregables
- Registra los resultados obtenidos en la carpeta labs/evidencias.
- Crea la evidencia por laboratorio siguiendo la nomenclatura lab-XX-tema. Si tu evidencia requiere mas de un archivo, crea una carpeta con esa misma nomenclatura y guarda alli todos los archivos (por ejemplo: .md, .pdf, .docx, imagenes o capturas).

- Rama `lab-25`.
- EVIDENCIAS.md con:
  - comandos de topic,
  - logs de productor/consumidor,
  - captura de reparto de particiones.
