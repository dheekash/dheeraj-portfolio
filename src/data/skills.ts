/* The toolset as the layers of a data platform, in the order data moves
   through them, plus the ML tooling alongside. Every item is from the
   skills list and case studies. */
export const layers = [
  { tag: "Ingest", line: "Moving and orchestrating data from source systems, in batches and streams.", items: ["Azure Data Factory", "Apache Airflow", "Apache Kafka"] },
  { tag: "Store", line: "Landing data in lakehouses and warehouses built to scale.", items: ["Microsoft Fabric", "Snowflake", "Databricks", "Delta Lake", "Azure"] },
  { tag: "Transform", line: "Cleaning and shaping raw data into tested models.", items: ["SQL", "dbt", "SQLMesh", "PySpark", "Python"] },
  { tag: "Model", line: "Semantic models and DAX measures that define the numbers.", items: ["DAX", "Power Query"] },
  { tag: "Visualise", line: "Reports and dashboards that answer the question asked.", items: ["Power BI", "Excel"] },
  { tag: "ML & tooling", line: "Training, tracking and versioning the models behind predictions.", items: ["MLflow", "scikit-learn", "Git"] },
];
